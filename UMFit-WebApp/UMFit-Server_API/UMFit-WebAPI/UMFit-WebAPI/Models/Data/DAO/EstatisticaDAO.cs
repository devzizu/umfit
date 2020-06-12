using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using UMFit_WebAPI.Models.UMFit_LN.Aulas;

namespace UMFit_WebAPI.Models.Data.DAO
{
    class EstatisticaDAO
    {
        /*
         *  Instância que permite a conexão à Base de Dados da aplicação
         *  Usa a classe DataBaseConnector para buscar os dados relativos à conexão
         *  Neste caso, utiliza (como primeira fase) Localhost
         */
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());

        public Dictionary<string, int> GetEstatisticaCli(string cliente_email)
        {
            Dictionary<string, int> stats = new Dictionary<string, int>();

            try
            {
                connection.Open();

                string sqlCommand = "select * from Estatistica where Cliente_email = @CLIENTE_EMAIL " +
                    "order by num_vezes_feita desc";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add(new MySqlParameter("@CLIENTE_EMAIL", MySqlDbType.VarChar));
                command.Parameters["@CLIENTE_EMAIL"].Value = cliente_email;

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read() && reader.HasRows)
                {
                    Estatistica estatistica = new Estatistica(reader.GetInt16(0), reader.GetString(1), reader.GetInt16(2), cliente_email);

                    int freq;

                    if (stats.ContainsKey(estatistica.nome_Aula))
                    {
                        freq = stats[estatistica.nome_Aula] + estatistica.num_vezes_feitas;

                        stats.Remove(estatistica.nome_Aula);
                    }
                    else
                    {
                        freq = estatistica.num_vezes_feitas;
                    }

                    stats.Add(estatistica.nome_Aula, freq);
                }

                reader.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            finally
            {
                connection.Close();
            }

            return stats;
        }
    }
}
