using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace TesteApiConnect
{
    class AulaGrupoDAO
    {
        /*
         *  Instância que permite a conexão à Base de Dados da aplicação
         *  Usa a classe DataBaseConnector para buscar os dados relativos à conexão
         *  Neste caso, utiliza (como primeira fase) Localhost
         */
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());

        /*public static List<AulaGrupo> GetAulas(MySqlCommand command)
        {
            List<AulaGrupo> list = new List<AulaGrupo>();

            try
            {
                connection.Open();

                string sqlCommand = "select * from Aula_Grupo";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read() && reader.HasRows)
                {
                    AulaGrupo aula = new AulaGrupo(reader.GetInt16(0), reader.GetTimeSpan(1), reader.GetString(2),
                        reader.GetString(3), reader.GetInt16(4), reader.GetInt16(5), reader.GetString(6),
                        reader.GetString(7), reader.GetString(8), reader.GetString(9));

                    list.Add(aula);
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

            return list;
        }*/


        public static List<AulaGrupo> GetTodasAulas()
        {
            List<AulaGrupo> list = new List<AulaGrupo>();

            try
            {
                connection.Open();

                string sqlCommand = "select * from Aula_Grupo";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read() && reader.HasRows)
                {
                    AulaGrupo aula = new AulaGrupo(reader.GetInt16(0), reader.GetTimeSpan(1), reader.GetString(2),
                        reader.GetString(3), reader.GetInt16(4), reader.GetInt16(5), reader.GetString(6),
                        reader.GetString(7), reader.GetString(8), reader.GetString(9));

                    list.Add(aula);
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

            return list;
        }

        public static List<AulaGrupo> GetAulasDia(string dia)
        {
            List<AulaGrupo> list = new List<AulaGrupo>();

            try
            {
                connection.Open();

                string sqlCommand = "select * from Aula_Grupo where dia = @DIA";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add(new MySqlParameter("@DIA", MySqlDbType.VarChar));
                command.Parameters["@DIA"].Value = dia;

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read() && reader.HasRows)
                {
                    AulaGrupo aula = new AulaGrupo(reader.GetInt16(0), reader.GetTimeSpan(1), reader.GetString(2),
                        reader.GetString(3), reader.GetInt16(4), reader.GetInt16(5), reader.GetString(6),
                        reader.GetString(7), reader.GetString(8), reader.GetString(9));

                    list.Add(aula);
                }

                reader.Close();

                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return list;
        }


    }
}
