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

                int altura = 0, peso = 0, idade_metabolica = 0;
                float massa_gorda = 0, massa_magra = 0, imc = 0;
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
                        altura = reader.GetInt32(1);
                        peso = reader.GetInt32(2);
                        massa_gorda = reader.GetFloat(3);
                        massa_magra = reader.GetFloat(4);
                        imc = reader.GetFloat(5);
                        idade_metabolica = reader.GetInt32(6);

                        data = reader.GetString(7);
                        instrutor = reader.GetString(8);
                        cliente = reader.GetString(9);

                        Avaliaçao ava = new Avaliaçao(id, data, instrutor, cliente, altura, peso, massa_gorda,
                            massa_magra, imc, idade_metabolica);

                        r.Add(ava);
                    }

                    altura = peso = idade_metabolica = 0;
                    massa_gorda = massa_magra = imc = 0;
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

                int altura = 0, peso = 0, idade_metabolica = 0;
                float massa_gorda = 0, massa_magra = 0, imc = 0;
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
                        altura = reader.GetInt32(1);
                        peso = reader.GetInt32(2);
                        massa_gorda = reader.GetFloat(3);
                        massa_magra = reader.GetFloat(4);
                        imc = reader.GetFloat(5);
                        idade_metabolica = reader.GetInt32(6);
                    }

                    data = reader.GetString(7);
                    instrutor = reader.GetString(8);
                    cliente = reader.GetString(9);

                    Avaliaçao ava = new Avaliaçao(id, data, instrutor, cliente, altura, peso, massa_gorda,
                        massa_magra, imc, idade_metabolica);

                    r.Add(ava);

                    altura = peso = idade_metabolica = 0;
                    massa_gorda = massa_magra = imc = 0;
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
    }
}
