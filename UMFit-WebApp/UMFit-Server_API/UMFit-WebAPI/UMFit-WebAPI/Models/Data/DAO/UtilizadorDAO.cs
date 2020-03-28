
using MySql.Data.MySqlClient;
using System;
using Microsoft.Extensions.FileSystemGlobbing.Internal.PathSegments;
using UMFit_WebAPI.Models.Security;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores.Interfaces;

namespace UMFit_WebAPI.Models.Data.DAO
{
    public class UtilizadorDAO
    {
        private MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());        

        public int TypeUser(string email)
        {
            int typeUser = -1; // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            try
            {
                connection.Open();

                // Utilizador é Cliente, Instrutor ou Rececionista? --------------------------------------------

                string sqlCommand = "select c.hashPass from Cliente c where c.email = " + "'" + email + "'";
                MySqlCommand command = new MySqlCommand(sqlCommand, connection);
                object result = command.ExecuteScalar();

                if (result != null)
                {
                    typeUser = 0;
                }
                else
                {
                    sqlCommand = "select i.hashPass from Instrutor i where i.email = " + "'" + email + "'";
                    command = new MySqlCommand(sqlCommand, connection);
                    result = command.ExecuteScalar();

                    if (result != null)
                    {
                        typeUser = 1;
                    }
                    else
                    {
                        sqlCommand = "select r.hashPass from Rececionista r where r.email = " + "'" + email + "'";
                        command = new MySqlCommand(sqlCommand, connection);
                        result = command.ExecuteScalar();

                        if (result != null)
                        {
                            typeUser = 2;
                        }
                    }
                }

                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return typeUser;
        }

        public InterfaceUtilizador GetUser(string email)
        {
            string nome, data_nascimento, localidade, categoria;
            int genero, nif;

            int typeUser = -1; // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            typeUser = TypeUser(email);

            if(typeUser == -1)
            {
                return null;
            }

            try
            {
                connection.Open();

                MySqlCommand command;
                string sqlCommand;

                switch (typeUser)
                {
                    // Cliente
                    case 0: 
                        {
                            sqlCommand = "select * from Cliente c where c.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);

                            // Get Nome
                            nome = reader.GetString(2);

                            // Get Nif
                            nif = reader.GetInt32(1);

                            // Get Genero
                            genero = reader.GetInt16(5);

                            // Get Data_nascimento
                            data_nascimento = reader.GetString(4);

                            // Get Localidade
                            localidade = reader.GetString(7);

                            // Get Categoria
                            categoria = reader.GetString(6);

                            reader.Close();

                            Cliente user = new Cliente(email, nif, nome, genero, data_nascimento, localidade, categoria);

                            connection.Close();

                            return user;
                        }


                    // Instrutor
                    case 1:
                        {
                            sqlCommand = "select * from Instrutor i where i.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);
                                
                            // Get Nome
                            nome = reader.GetString(2);

                            // Get Nif
                            nif = reader.GetInt32(1);

                            // Get Genero
                            genero = reader.GetInt16(5);

                            // Get Data_nascimento
                            data_nascimento = reader.GetString(4);

                            // Get Localidade
                            localidade = reader.GetString(6);

                            reader.Close();

                            Instrutor user = new Instrutor(email, nif, nome, genero, data_nascimento, localidade);

                            connection.Close();

                            return user;
                            }

                    // Rececionista
                    case 2:
                        {
                            sqlCommand = "select * from Rececionista r where r.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);

                            // Get Nome
                            nome = reader.GetString(2);

                            // Get Nif
                            nif = reader.GetInt32(1);

                            // Get Genero
                            genero = reader.GetInt16(5);

                            // Get Data_nascimento
                            data_nascimento = reader.GetString(4);

                            // Get Localidade
                            localidade = reader.GetString(6);

                            reader.Close();

                            Rececionista user = new Rececionista(email, nif, nome, genero, data_nascimento, localidade);

                            connection.Close();

                            return user;

                        }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return null;
        }
        
        public InterfaceUtilizador LogIn(string email, string passInserida)
        {
            string nome, data_nascimento, localidade, categoria;
            int genero, nif;

            int typeUser = -1; // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            string time_to_expire = "2022-03-11 20:00:00";

            typeUser = TypeUser(email);

            if(typeUser == -1)
            {
                return null;
            }

            try
            {
                connection.Open();

                string hashPass = CalculateHash.GetHashString(passInserida);

                MySqlCommand command;
                string sqlCommand;

                switch (typeUser)
                {
                    // Cliente
                    case 0: 
                        {
                            sqlCommand = "select * from Cliente c where c.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);

                            if (hashUser.Equals(hashPass))
                            {
                                // Get Nome
                                nome = reader.GetString(2);

                                // Get Nif
                                nif = reader.GetInt32(1);

                                // Get Genero
                                genero = reader.GetInt16(5);

                                // Get Data_nascimento
                                data_nascimento = reader.GetString(4);

                                // Get Localidade
                                localidade = reader.GetString(7);

                                // Get Categoria
                                categoria = reader.GetString(6);

                                reader.Close();

                                Cliente user = new Cliente(email, nif, nome, genero, data_nascimento, localidade, categoria);

                                // Adicionar o Cliente à tabela de utilizadores online...
                                sqlCommand = "insert into UtilizadoresOnline values ('" + email + "', '" + time_to_expire + "')";
                                command = new MySqlCommand(sqlCommand, connection);
                                command.ExecuteScalar();

                                connection.Close();

                                return user;
                            }
                            break;
                        }

                    // Instrutor
                    case 1:
                        {
                            sqlCommand = "select * from Instrutor i where i.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);

                            if (hashUser.Equals(hashPass))
                            {
                                // Get Nome
                                nome = reader.GetString(2);

                                // Get Nif
                                nif = reader.GetInt32(1);

                                // Get Genero
                                genero = reader.GetInt16(5);

                                // Get Data_nascimento
                                data_nascimento = reader.GetString(4);

                                // Get Localidade
                                localidade = reader.GetString(6);

                                reader.Close();

                                Instrutor user = new Instrutor(email, nif, nome, genero, data_nascimento, localidade);

                                // Adicionar o Cliente à tabela de utilizadores online...
                                sqlCommand = "insert into UtilizadoresOnline values ('" + email + "', '" + time_to_expire + "')";
                                command = new MySqlCommand(sqlCommand, connection);
                                command.ExecuteScalar();

                                connection.Close();

                                return user;
                            }
                            break;
                        }
                        
                    // Rececionista
                    case 2:
                        {
                            sqlCommand = "select * from Rececionista r where r.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);

                            if (hashUser.Equals(hashPass))
                            {
                                // Get Nome
                                nome = reader.GetString(2);

                                // Get Nif
                                nif = reader.GetInt32(1);

                                // Get Genero
                                genero = reader.GetInt16(5);

                                // Get Data_nascimento
                                data_nascimento = reader.GetString(4);

                                // Get Localidade
                                localidade = reader.GetString(6);

                                reader.Close();

                                Rececionista user = new Rececionista(email, nif, nome, genero, data_nascimento, localidade);

                                // Adicionar o Cliente à tabela de utilizadores online...
                                sqlCommand = "insert into UtilizadoresOnline values ('" + email + "', '" + time_to_expire + "')";
                                command = new MySqlCommand(sqlCommand, connection);
                                command.ExecuteScalar();

                                connection.Close();

                                return user;
                            }
                            break;
                        }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return null;
        }

        public void LogOut(string email)
        {
            connection.Open();

            string sqlCommand = "delete from UtilizadoresOnline where email = " + "'" + email + "'";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.ExecuteScalar();
            connection.Close();
        }

        public bool isUserOnline(string token)
        {
            connection.Open();
            
            string sqlCommand = "select data_expirar from UtilizadoresOnline where token = " + "'" + token + "'";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            object result = command.ExecuteScalar();

            if(result != null)
            {
                DateTime dataExp = DateTime.Parse(Convert.ToString(result));
                DateTime atual = DateTime.Now;

                if (dataExp.CompareTo(atual) > 0)
                { 
                    connection.Close();
                    return true;
                }
                else
                { 
                    connection.Close();
                    return false;
                }
            }

            connection.Close();

            return false;
        }

        public string getUserGivenToken(string token)
        {

            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                MySqlCommand command;
                string sqlCommand;

                /*
                 * Comando SQL para inserir uma Avaliação à tabela de avaliações realizadas
                 */ 
                sqlCommand = "select email from UtilizadoresOnline where token = " + "'" + token + "'";

                command = new MySqlCommand(sqlCommand, connection);

                string res_email = Convert.ToString(command.ExecuteScalar());

                // Fecha a conexão à Base de Dados
                connection.Close();

                return res_email;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return null;
        }
    }
}
