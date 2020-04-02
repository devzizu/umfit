
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
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());

        public int TypeUser(string email)
        {
            int typeUser = -1; // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            try
            {
                connection.Open();

                // Utilizador é Cliente, Instrutor ou Rececionista? --------------------------------------------

                string sqlCommand = "select hashPass from Cliente where email = @EMAIL";
                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                command.Parameters["@EMAIL"].Value = email;

                object result = command.ExecuteScalar();

                if (result != null)
                {
                    typeUser = 0;
                }
                else
                {
                    sqlCommand = "select hashPass from Instrutor where email = @EMAIL";
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                    command.Parameters["@EMAIL"].Value = email;
                    
                    result = command.ExecuteScalar();

                    if (result != null)
                    {
                        typeUser = 1;
                    }
                    else
                    {
                        sqlCommand = "select hashPass from Rececionista where email = @EMAIL";
                        command = new MySqlCommand(sqlCommand, connection);

                        command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                        command.Parameters["@EMAIL"].Value = email;

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
            int typeUser = TypeUser(email); // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            if (typeUser == -1)
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
                            sqlCommand = "select * from Cliente where email = @EMAIL";
                            command = new MySqlCommand(sqlCommand, connection);

                            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                            command.Parameters["@EMAIL"].Value = email;

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();

                            Cliente user = new Cliente(email, reader.GetInt32(1), reader.GetString(2), reader.GetInt16(5),
                                reader.GetDateTime(4), reader.GetString(7), reader.GetString(6));

                            reader.Close();

                            connection.Close();

                            return user;
                        }


                    // Instrutor
                    case 1:
                        {
                            sqlCommand = "select * from Instrutor where email = @EMAIL";
                            command = new MySqlCommand(sqlCommand, connection);

                            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                            command.Parameters["@EMAIL"].Value = email;

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();

                            Instrutor user = new Instrutor(email, reader.GetInt32(1), reader.GetString(2),
                                reader.GetInt16(5), reader.GetDateTime(4), reader.GetString(6));

                            reader.Close();

                            connection.Close();

                            return user;
                        }

                    // Rececionista
                    case 2:
                        {
                            sqlCommand = "select * from Rececionista where email = @EMAIL";
                            command = new MySqlCommand(sqlCommand, connection);

                            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                            command.Parameters["@EMAIL"].Value = email;

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();

                            Rececionista user = new Rececionista(email, reader.GetInt32(1), reader.GetString(2), 
                                reader.GetInt16(5), reader.GetDateTime(4), reader.GetString(6));

                            reader.Close();

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

        public InterfaceUtilizador LogIn(string email, string passInserida, string token)
        {
            DateTime today = DateTime.Now;
            DateTime time_to_expire = today.AddDays(5);

            int typeUser = TypeUser(email);  // 0 - Cliente, 1 - Instrutor, 2 - Rececionista

            if (typeUser == -1)
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
                            sqlCommand = "select * from Cliente where email = @EMAIL";
                            command = new MySqlCommand(sqlCommand, connection);

                            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                            command.Parameters["@EMAIL"].Value = email;

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);

                            if (hashUser.Equals(hashPass))
                            {
                                Cliente user = new Cliente(email, reader.GetInt32(1), reader.GetString(2), reader.GetInt16(5),
                                reader.GetDateTime(4), reader.GetString(7), reader.GetString(6));

                                // Adicionar o Cliente à tabela de utilizadores online...

                                reader.Close();
                                
                                sqlCommand = "insert into UtilizadoresOnline values (@EMAIL, @TIME_TO_EXPIRE, @TOKEN)";
                                command = new MySqlCommand(sqlCommand, connection);

                                command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                                command.Parameters["@EMAIL"].Value = email;

                                command.Parameters.Add(new MySqlParameter("@TIME_TO_EXPIRE", MySqlDbType.DateTime));
                                command.Parameters["@TIME_TO_EXPIRE"].Value = time_to_expire;

                                command.Parameters.Add(new MySqlParameter("@TOKEN", MySqlDbType.VarChar));
                                command.Parameters["@TOKEN"].Value = token;

                                command.ExecuteScalar();

                                connection.Close();

                                return user;
                            }
                            reader.Close();
                            break;
                        }

                    // Instrutor
                    case 1:
                        {
                            sqlCommand = "select * from Instrutor where email = @EMAIL";
                            command = new MySqlCommand(sqlCommand, connection);

                            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                            command.Parameters["@EMAIL"].Value = email;

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);

                            if (hashUser.Equals(hashPass))
                            {
                                Instrutor user = new Instrutor(email, reader.GetInt32(1), reader.GetString(2),
                                reader.GetInt16(5), reader.GetDateTime(4), reader.GetString(6));

                                reader.Close();

                                // Adicionar o Cliente à tabela de utilizadores online...
                                sqlCommand = "insert into UtilizadoresOnline values (@EMAIL, @TIME_TO_EXPIRE, @TOKEN)";
                                command = new MySqlCommand(sqlCommand, connection);

                                command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                                command.Parameters["@EMAIL"].Value = email;

                                command.Parameters.Add(new MySqlParameter("@TIME_TO_EXPIRE", MySqlDbType.DateTime));
                                command.Parameters["@TIME_TO_EXPIRE"].Value = time_to_expire;

                                command.Parameters.Add(new MySqlParameter("@TOKEN", MySqlDbType.VarChar));
                                command.Parameters["@TOKEN"].Value = token;

                                command.ExecuteScalar();

                                connection.Close();

                                return user;
                            }
                            reader.Close();
                            break;
                        }

                    // Rececionista
                    case 2:
                        {
                            sqlCommand = "select * from Rececionista where email = @EMAIL";
                            command = new MySqlCommand(sqlCommand, connection);

                            MySqlDataReader reader = command.ExecuteReader();

                            reader.Read();
                            string hashUser = reader.GetString(3);

                            if (hashUser.Equals(hashPass))
                            {
                                Rececionista user = new Rececionista(email, reader.GetInt32(1), reader.GetString(2),
                                reader.GetInt16(5), reader.GetDateTime(4), reader.GetString(6));

                                reader.Close();

                                // Adicionar o Cliente à tabela de utilizadores online...
                                sqlCommand = "insert into UtilizadoresOnline values (@EMAIL, @TIME_TO_EXPIRE, @TOKEN)";
                                command = new MySqlCommand(sqlCommand, connection);

                                command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                                command.Parameters["@EMAIL"].Value = email;

                                command.Parameters.Add(new MySqlParameter("@TIME_TO_EXPIRE", MySqlDbType.DateTime));
                                command.Parameters["@TIME_TO_EXPIRE"].Value = time_to_expire;

                                command.Parameters.Add(new MySqlParameter("@TOKEN", MySqlDbType.VarChar));
                                command.Parameters["@TOKEN"].Value = token;

                                command.ExecuteScalar();

                                connection.Close();

                                return user;
                            }
                            reader.Close();
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


        public void LogOut(string token)
        {
            connection.Open();

            string sqlCommand = "delete from UtilizadoresOnline where token = @TOKEN";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@TOKEN", MySqlDbType.VarChar));
            command.Parameters["@TOKEN"].Value = token;

            command.ExecuteScalar();
            connection.Close();
        }


        public bool IsUserOnline(string token)
        {
            connection.Open();

            string sqlCommand = "select data_expirar from UtilizadoresOnline where token = @TOKEN";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@TOKEN", MySqlDbType.VarChar));
            command.Parameters["@TOKEN"].Value = token;

            object result = command.ExecuteScalar();

            if (result != null)
            {
                DateTime dataExp = Convert.ToDateTime(result);
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

        public string GetUserGivenToken(string token)
        {
            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                string sqlCommand = "select email from UtilizadoresOnline where token = @TOKEN";
                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add(new MySqlParameter("@TOKEN", MySqlDbType.VarChar));
                command.Parameters["@TOKEN"].Value = token;

                string res_email = Convert.ToString(command.ExecuteScalar());

                // Fecha a conexão à Base de Dados
                connection.Close();

                return res_email;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return null;
        }

        /*
         * Recebe a interface do utilizador, o tipo de utilizador(0, 1 ou 2), ou seja, 
         * Cliente, Instrutor ou Rececionista
         * e recebe a hash da password
         */
        public void InsertUser(InterfaceUtilizador user, int type, string hashPass)
        {
            try
            {
                string sqlCommand;

                connection.Open();

                MySqlCommand command;

                // 0 - Cliente, 1 - Instrutor, 2 - Rececionista
                if (type == 0)
                {
                    Cliente u = (Cliente)user;

                    sqlCommand = "insert into Cliente values(@EMAIL, @NIF, @NOME, @HASHPASS," +
                        "@DATA_NASCIMENTO, @GENERO, @CATEGORIA, @LOCALIDADE)";

                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@HASHPASS", MySqlDbType.VarChar));
                    command.Parameters["@HASHPASS"].Value = hashPass;

                    u.IniParamSql(command);
                }
                else if (type == 1)
                {
                    Instrutor u = (Instrutor)user;

                    sqlCommand = "insert into Instrutor values(@EMAIL, @NIF, @NOME, @HASHPASS," +
                        "@DATA_NASCIMENTO, @GENERO, @LOCALIDADE)";

                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@HASHPASS", MySqlDbType.VarChar));
                    command.Parameters["@HASHPASS"].Value = hashPass;

                    u.IniParamSql(command);
                }
                else if (type == 2)
                {
                    Rececionista u = (Rececionista)user;

                    sqlCommand = "insert into Rececionista values(@EMAIL, @NIF, @NOME, @HASHPASS," +
                        "@DATA_NASCIMENTO, @GENERO, @LOCALIDADE)";

                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@HASHPASS", MySqlDbType.VarChar));
                    command.Parameters["@HASHPASS"].Value = hashPass;

                    u.IniParamSql(command);
                }
                else
                {
                    connection.Close();
                    return;
                }

                command.ExecuteScalar();

                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }

        public void RenovaToken(string token)
        {

            try
            {
                //Renovar token date
                DateTime newDate = DateTime.Now.AddDays(5);
               
                connection.Open();

                string sqlCommand = "update UtilizadoresOnline set data_expirar = @DATA where token = @TOKEN";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add(new MySqlParameter("@TOKEN", MySqlDbType.VarChar));
                command.Parameters["@TOKEN"].Value = token;

                command.Parameters.Add(new MySqlParameter("@DATA", MySqlDbType.DateTime));
                command.Parameters["@DATA"].Value = newDate;

                command.ExecuteScalar();
                
                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            
        }
    }
}
