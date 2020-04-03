using MySql.Data.MySqlClient;
using System;

namespace TesteApiConnect
{
    class UtilizadorDAO
    {
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());

        public static int TypeUser(string email)
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

        public static InterfaceUtilizador GetUser(string email)
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

        public static InterfaceUtilizador LogIn(string email, string passInserida, string token)
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
                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return null;
        }


        public static void LogOut(string token)
        {
            connection.Open();

            string sqlCommand = "delete from UtilizadoresOnline where token = @TOKEN";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@TOKEN", MySqlDbType.VarChar));
            command.Parameters["@TOKEN"].Value = token;

            command.ExecuteScalar();
            connection.Close();
        }


        public static bool IsUserOnline(string token)
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
        public static void InsertUser(InterfaceUtilizador user, int type, string hashPass)
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

        /*
         * Função que remove um utilizador e devolve um bool, true caso tenha sido removido 
         * ou false em caso contrario (não existe,...)
         */
        public static bool RemoveUser(string email, int type)
        {
            string sqlCommand;
            MySqlCommand command;

            bool r = false;

            try
            {
                connection.Open();

                if (type == 0)
                {
                    sqlCommand = "delete from Cliente where email = @EMAIL";
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                    command.Parameters["@EMAIL"].Value = email;

                    command.ExecuteScalar();

                    r = true;
                }
                if (type == 1)
                {
                    sqlCommand = "delete from Instrutor where email = @EMAIL";
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                    command.Parameters["@EMAIL"].Value = email;

                    command.ExecuteScalar();

                    r = true;
                }
                if (type == 2)
                {
                    sqlCommand = "delete from Rececionista where email = @EMAIL";
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                    command.Parameters["@EMAIL"].Value = email;

                    command.ExecuteScalar();

                    r = true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return r;
        }


        /*
         * Caso a localidade não exista na base de dados, é necessário
         * inserir na tabela do codigo postal
         * Adicionamos como valor default para codigo posta o "0000",
         * pois não temos maneira de saber qual o vervadeiro valor
         */
        public static void ExisteLocal(string local)
        {
            try
            {
                connection.Open();

                string sqlCommand = "insert into Codigo_Postal (localidade, codigo_postal) " +
                      "select * from (select @LOCALIDADE, @CODIGO_POSTAL) as tmp " +
                      "where not exists ( select localidade from Codigo_Postal " +
                      "where localidade = @LOCALIDADE) limit 1";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add("@LOCALIDADE", MySqlDbType.VarChar);
                command.Parameters["@LOCALIDADE"].Value = local;

                command.Parameters.Add("@CODIGO_POSTAL", MySqlDbType.VarChar);
                command.Parameters["@CODIGO_POSTAL"].Value = "0000";

                command.ExecuteScalar();

                connection.Close();
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e.ToString());
            }
        }

        public static void UpdateUser(InterfaceUtilizador user, int type, string hashPass)
        {
            try
            {
                MySqlCommand command;
                string sqlCommand;

                if (type == 0)
                {
                    Cliente u = (Cliente)user;
                    sqlCommand = "update Cliente set hashPass = @HASHPASS, data_nascimento = @DATA_NASCIMENTO, " +
                        "categoria = @CATEGORIA, localidade = @LOCALIDADE " +
                        "where email = @EMAIL";

                    /*
                     * Verfica se a Localidade inserida existe.
                     * Senão existir, adiciona à Base de Dados
                     */ 
                    ExisteLocal(user.GetLocalidade());

                    connection.Open();
                    
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add("@HASHPASS", MySqlDbType.VarChar);
                    command.Parameters["@HASHPASS"].Value = hashPass;

                    command.Parameters.Add("@DATA_NASCIMENTO", MySqlDbType.DateTime);
                    command.Parameters["@DATA_NASCIMENTO"].Value = u.data_nascimento.ToString("yyyy-MM-dd HH:mm:ss");

                    command.Parameters.Add("@CATEGORIA", MySqlDbType.VarChar);
                    command.Parameters["@CATEGORIA"].Value = u.categoria;

                    command.Parameters.Add("@LOCALIDADE", MySqlDbType.VarChar);
                    command.Parameters["@LOCALIDADE"].Value = u.localidade;

                    command.Parameters.Add("@EMAIL", MySqlDbType.VarChar);
                    command.Parameters["@EMAIL"].Value = u.email;

                    command.ExecuteScalar();
                }
                else if (type == 1)
                {
                    Instrutor u = (Instrutor)user;
                    sqlCommand = "update Instrutor set hashPass = @HASHPASS, data_nascimento = @DATA_NASCIMENTO, " +
                        "localidade = @LOCALIDADE " +
                        "where email = @EMAIL";

                    /*
                     * Verfica se a Localidade inserida existe.
                     * Senão existir, adiciona à Base de Dados
                     */
                    ExisteLocal(user.GetLocalidade());

                    connection.Open();

                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add("@HASHPASS", MySqlDbType.VarChar);
                    command.Parameters["@HASHPASS"].Value = hashPass;

                    command.Parameters.Add("@DATA_NASCIMENTO", MySqlDbType.DateTime);
                    command.Parameters["@DATA_NASCIMENTO"].Value = u.data_nascimento.ToString("yyyy-MM-dd HH:mm:ss");

                    command.Parameters.Add("@LOCALIDADE", MySqlDbType.VarChar);
                    command.Parameters["@LOCALIDADE"].Value = u.localidade;

                    command.Parameters.Add("@EMAIL", MySqlDbType.VarChar);
                    command.Parameters["@EMAIL"].Value = u.email;

                    command.ExecuteScalar();
                }
                else if (type == 2)
                {
                    Rececionista u = (Rececionista)user;
                    sqlCommand = "update Rececionista set hashPass = @HASHPASS, data_nascimento = @DATA_NASCIMENTO, " +
                        "localidade = @LOCALIDADE " +
                        "where email = @EMAIL";

                    /*
                     * Verfica se a Localidade inserida existe.
                     * Senão existir, adiciona à Base de Dados
                     */
                    ExisteLocal(user.GetLocalidade());

                    connection.Open();

                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add("@HASHPASS", MySqlDbType.VarChar);
                    command.Parameters["@HASHPASS"].Value = hashPass;

                    command.Parameters.Add("@DATA_NASCIMENTO", MySqlDbType.DateTime);
                    command.Parameters["@DATA_NASCIMENTO"].Value = u.data_nascimento.ToString("yyyy-MM-dd HH:mm:ss");

                    command.Parameters.Add("@LOCALIDADE", MySqlDbType.VarChar);
                    command.Parameters["@LOCALIDADE"].Value = u.localidade;

                    command.Parameters.Add("@EMAIL", MySqlDbType.VarChar);
                    command.Parameters["@EMAIL"].Value = u.email;

                    command.ExecuteScalar();
                }
                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }

    }
}
