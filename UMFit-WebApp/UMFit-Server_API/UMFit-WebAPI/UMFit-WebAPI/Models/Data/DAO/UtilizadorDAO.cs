
using MySql.Data.MySqlClient;
using System;

using UMFit_WebAPI.Models.Security;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores.Interfaces;

namespace UMFit_WebAPI.Models.Data.DAO
{
    public class UtilizadorDAO
    {
        private static MySqlBaseConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            Server = "localhost",
            UserID = "UMFit",
            Password = "umfitli4",
            Database = "UMFit_DB"
        };

        public int TypeUser(string email)
        {
            int typeUser = -1; // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            MySqlConnection connection = new MySqlConnection(builder.ToString());

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

        public InterfaceUtilizador LogIn(string email, string passInserida)
        {
            string nome, data_nascimento, localidade, categoria;
            int genero, nif;

            int typeUser = -1; // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            string time_to_expire = "2020-03-11 20:00:00";
            
            MySqlConnection connection = new MySqlConnection(builder.ToString());
            
            try
            {
                connection.Open();

                typeUser = TypeUser(email);

                string hashPass = CalculateHash.GetHashString(passInserida);

                string hashUser, sqlCommand;
                MySqlCommand command;
                object result;

                switch (typeUser)
                {
                    // Cliente
                    case 0: 
                        {
                            sqlCommand = "select c.hashPass from Cliente c where c.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);
                            result = command.ExecuteScalar();

                            hashUser = Convert.ToString(result);

                            if (hashUser.Equals(hashPass))
                            {
                                // Get Nome
                                sqlCommand = "select c.nome from Cliente c where c.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                nome = Convert.ToString(result);

                                // Get Nif
                                sqlCommand = "select c.nif from Cliente c where c.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                nif = Convert.ToInt32(result);

                                // Get Genero
                                sqlCommand = "select c.genero from Cliente c where c.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                genero = Convert.ToInt16(result);

                                // Get Data_nascimento
                                sqlCommand = "select c.data_nascimento from Cliente c where c.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                data_nascimento = Convert.ToString(result);

                                // Get Localidade
                                sqlCommand = "select c.localidade from Cliente c where c.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                localidade = Convert.ToString(result);

                                // Get Categoria
                                sqlCommand = "select c.categoria from Cliente c where c.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                categoria = Convert.ToString(result);

                                Cliente user = new Cliente(email, nif, nome, genero, data_nascimento, localidade, categoria);

                                // Adicionar o Cliente à tabela de utilizadores online...
                                //sqlCommand = "insert into UtilizadoresOnline values ('" + email + "', '" + time_to_expire + "')";
                                //command = new MySqlCommand(sqlCommand, connection);
                                //result = command.ExecuteScalar();

                                connection.Close();

                                return user;
                            }
                            break;
                        }

                    // Instrutor
                    case 1:
                        {
                            sqlCommand = "select i.hashPass from Instrutor i where i.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);
                            result = command.ExecuteScalar();

                            hashUser = Convert.ToString(result);

                            if (hashUser.Equals(hashPass))
                            {
                                // Get Nome
                                sqlCommand = "select i.nome from Instrutor i where i.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                nome = Convert.ToString(result);

                                // Get Nif
                                sqlCommand = "select i.nif from Instrutor i where i.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                nif = Convert.ToInt32(result);

                                // Get Genero
                                sqlCommand = "select i.genero from Instrutor i where i.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                genero = Convert.ToInt16(result);

                                // Get Data_nascimento
                                sqlCommand = "select i.data_nascimento from Instrutor i where i.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                data_nascimento = Convert.ToString(result);

                                // Get Localidade
                                sqlCommand = "select i.localidade from Instrutor i where i.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                localidade = Convert.ToString(result);

                                Instrutor user = new Instrutor(email, nif, nome, genero, data_nascimento, localidade);

                                // Adicionar o Instrutor à tabela de utilizadores online...
                                //sqlCommand = "insert into UtilizadoresOnline values ('" + email + "', '" + time_to_expire + "')";
                                //command = new MySqlCommand(sqlCommand, connection);
                                //result = command.ExecuteScalar();

                                connection.Close();

                                return user;
                            }
                            break;
                        }

                    // Rececionista
                    case 2:
                        {
                            sqlCommand = "select r.hashPass from Rececionista r where r.email = " + "'" + email + "'";
                            command = new MySqlCommand(sqlCommand, connection);
                            result = command.ExecuteScalar();

                            hashUser = Convert.ToString(result);

                            if (hashUser.Equals(hashPass))
                            {
                                // Get Nome
                                sqlCommand = "select r.nome from Rececionista r where r.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                nome = Convert.ToString(result);

                                // Get Nif
                                sqlCommand = "select r.nif from Rececionista r where r.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                nif = Convert.ToInt32(result);

                                // Get Genero
                                sqlCommand = "select r.genero from Rececionista r where r.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                genero = Convert.ToInt16(result);

                                // Get Data_nascimento
                                sqlCommand = "select r.data_nascimento from Rececionista r where r.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                data_nascimento = Convert.ToString(result);

                                // Get Localidade
                                sqlCommand = "select r.localidade from Rececionista r where r.email = " + "'" + email + "'";
                                command = new MySqlCommand(sqlCommand, connection);
                                result = command.ExecuteScalar();

                                localidade = Convert.ToString(result);

                                Rececionista user = new Rececionista(email, nif, nome, genero, data_nascimento, localidade);

                                // Adicionar o Rececionista à tabela de utilizadores online...
                                //sqlCommand = "insert into UtilizadoresOnline values ('" + email + "', '" + time_to_expire + "')";
                                //command = new MySqlCommand(sqlCommand, connection);
                                //result = command.ExecuteScalar();

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
            MySqlConnection connection = new MySqlConnection(builder.ToString());

            connection.Open();

            string sqlCommand = "delete from UtilizadoresOnline u where u.email = '" + email + "'";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.ExecuteScalar();
            connection.Close();
        }

        public string GetUtilizadoresOnline()
        {
            MySqlConnection connection = new MySqlConnection(builder.ToString());

            connection.Open();

            string sqlCommand = "select u.email from UtilizadoresOnline u";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            object result = command.ExecuteScalar();
            connection.Close();

            string usersOn = null;

            if(result != null)
            {
                usersOn = Convert.ToString(result);
            }

            return usersOn;
        }

    }
}
