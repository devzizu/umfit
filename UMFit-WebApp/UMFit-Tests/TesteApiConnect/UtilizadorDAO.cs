using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;


namespace TesteApiConnect
{
    class UtilizadorDAO
    {
        public Dictionary<string, InterfaceUtilizador> utilizadores;

        private static MySqlBaseConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            Server = "localhost",
            UserID = "UMFit",
            Password = "umfitli4",
            Database = "UMFit_DB"
        };

        public static InterfaceUtilizador LogIn(string email, string passInserida)
        {
            string nome, data_nascimento, localidade, categoria;
            int genero, nif;

            MySqlConnection connection = new MySqlConnection(builder.ToString());

            try
            {
                connection.Open();

                string hashPass = CalculateHash.GetHashString(passInserida);

                // É Cliente?
                string sqlCommand = "select c.hashPass from Cliente c where c.email = " + "'" + email + "'";
                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                object result = command.ExecuteScalar();

                if (result != null)
                {
                    string hashUser = Convert.ToString(result);

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

                        connection.Close();

                        return user;
                    }
                }
                else
                {
                    // É Instrutor?
                    sqlCommand = "select i.hashPass from Instrutor i where i.email = " + "'" + email + "'";
                    command = new MySqlCommand(sqlCommand, connection);

                    result = command.ExecuteScalar();

                    if (result != null)
                    {
                        string hashUser = Convert.ToString(result);

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

                            connection.Close();

                            return user;
                        }
                    }
                    else
                    {
                        // É Rececionista?
                        sqlCommand = "select r.hashPass from Rececionista r where r.email = " + "'" + email + "'";
                        command = new MySqlCommand(sqlCommand, connection);

                        result = command.ExecuteScalar();

                        if (result != null)
                        {
                            string hashUser = Convert.ToString(result);

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

                                connection.Close();

                                return user;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return null;
        }

    }
}
