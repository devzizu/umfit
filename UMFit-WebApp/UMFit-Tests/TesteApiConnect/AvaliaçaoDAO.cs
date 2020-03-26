using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;


namespace TesteApiConnect
{
    class AvaliaçaoDAO
    {
        public static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builder.ToString());

        // Vai buscar todas as Avaliações Realizadas
        public static List<Avaliaçao> GetAvaliaçoesRealizada()
        {
            List<Avaliaçao> r = new List<Avaliaçao>();

            try
            {
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                string data, instrutor, cliente;

                string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                    "where ar.idAvaliaçao = aa.idAvaliaçao";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                MySqlDataReader reader = command.ExecuteReader();

                while(reader.Read())
                {
                    int id = reader.GetInt32(0);

                    if (!reader.IsDBNull(1))
                    {
                        cc = new Composiçao_Corporal(reader.GetInt32(1), reader.GetInt32(2), reader.GetFloat(3), 
                        reader.GetFloat(4), reader.GetFloat(5), reader.GetInt32(6));

                        p = new Perimetros(reader.GetFloat(7), reader.GetFloat(8), reader.GetFloat(9), reader.GetFloat(10),
                        reader.GetFloat(11), reader.GetFloat(12), reader.GetFloat(13), reader.GetFloat(14), reader.GetFloat(15),
                        reader.GetFloat(16), reader.GetFloat(17), reader.GetFloat(18));

                        data = reader.GetString(19);
                        instrutor = reader.GetString(20);
                        cliente = reader.GetString(21);

                        Avaliaçao ava = new Avaliaçao(id, data, instrutor, cliente, cc, p);

                        r.Add(ava);
                    }
                }

                reader.Close();

                connection.Close();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return r;
        }

        // Vai buscar todas as Avaliações (realizadas ou não)
        public static List<Avaliaçao> GetAvaliaçoes()
        {
            List<Avaliaçao> r = new List<Avaliaçao>();

            try
            {
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                string data, instrutor, cliente;

                string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                    "where ar.idAvaliaçao = aa.idAvaliaçao";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    int id = reader.GetInt32(0);

                    if (!reader.IsDBNull(1))
                    {
                        cc = new Composiçao_Corporal(reader.GetInt32(1), reader.GetInt32(2), reader.GetFloat(3),
                        reader.GetFloat(4), reader.GetFloat(5), reader.GetInt32(6));

                        p = new Perimetros(reader.GetFloat(7), reader.GetFloat(8), reader.GetFloat(9), reader.GetFloat(10),
                        reader.GetFloat(11), reader.GetFloat(12), reader.GetFloat(13), reader.GetFloat(14), reader.GetFloat(15),
                        reader.GetFloat(16), reader.GetFloat(17), reader.GetFloat(18));
                    }
                    else
                    {
                        cc = new Composiçao_Corporal();
                        p = new Perimetros();
                    }

                    data = reader.GetString(19);
                    instrutor = reader.GetString(20);
                    cliente = reader.GetString(21);

                    Avaliaçao ava = new Avaliaçao(id, data, instrutor, cliente, cc, p);

                    r.Add(ava);
                }

                reader.Close();

                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return r;
        }

        public static void insertAvaliaçao(Avaliaçao av)
        {
            try
            {
                connection.Open();

                MySqlCommand command;
                string sqlCommand;
                bool isNull = true;

                if (av.realizada)
                {
                    // foi realizado, logo não preenchemos os valores da tabela "Avaliaçao_Realizada" a null
                    isNull = false;
                }

                sqlCommand = "insert into Avaliaçao_Realizada values (" + av.id + ", " + av.composiçao_Corporal.ToSql(isNull)
                        + ", " + av.perimetros.ToSql(isNull) + ")";

                command = new MySqlCommand(sqlCommand, connection);
                command.ExecuteScalar();

                sqlCommand = "insert into Avaliaçao_Agendada values ('" + av.data + "', '" + av.instrutor_email + "', '" + av.cliente_email
                    + "', " + av.id + ")";

                command = new MySqlCommand(sqlCommand, connection);
                command.ExecuteScalar();

                connection.Close();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }

        public static List<Avaliaçao> GetAvaliaçao(string emailCliente)
        {
            List<Avaliaçao> r = new List<Avaliaçao>();

            try
            {
                List<Avaliaçao> listA = GetAvaliaçoes();
                int i = 0;

                while(i < listA.Count)
                {
                    if (listA[i].cliente_email.Equals(emailCliente))
                        r.Add(listA[i]);
                    i++;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return r;
        }
    }
}
