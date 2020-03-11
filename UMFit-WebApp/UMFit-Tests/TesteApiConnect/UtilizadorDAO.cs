using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;


namespace TesteApiConnect
{
    class UtilizadorDAO
    {
        private static MySqlBaseConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            Server = "localhost",
            UserID = "UMFit",
            Password = "umfitli4",
            Database = "UMFit_DB"
        };

        public static int TypeUser(string email)
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

        public static InterfaceUtilizador LogIn(string email, string passInserida)
        {
            string nome, data_nascimento, localidade, categoria;
            int genero, nif;

            int typeUser = -1; // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            string time_to_expire = "2020-03-11 20:00:00";

            MySqlConnection connection = new MySqlConnection(builder.ToString());

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

        public static void LogOut(string email)
        {
            MySqlConnection connection = new MySqlConnection(builder.ToString());

            connection.Open();

            string sqlCommand = "delete from UtilizadoresOnline u where u.email = '" + email + "'";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.ExecuteScalar();
            connection.Close();
        }

        public static bool isUserOnline(string email)
        {
            MySqlConnection connection = new MySqlConnection(builder.ToString());

            connection.Open();

            bool isOn = false;

            string sqlCommand = "select * from UtilizadoresOnline u where u.email = " + "'" + email + "'";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            object result = command.ExecuteScalar();

            if(result != null)
            {
                isOn = true; 
            }

            connection.Close();

            return isOn;
        }

    }
}
