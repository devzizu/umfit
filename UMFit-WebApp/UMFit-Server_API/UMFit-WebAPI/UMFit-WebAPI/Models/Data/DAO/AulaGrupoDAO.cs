using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using UMFit_WebAPI.Models.UMFit_LN.Aulas;

namespace UMFit_WebAPI.Models.Data.DAO
{
    public class AulaGrupoDAO
    {
        /*
         *  Instância que permite a conexão à Base de Dados da aplicação
         *  Usa a classe DataBaseConnector para buscar os dados relativos à conexão
         *  Neste caso, utiliza (como primeira fase) Localhost
         */
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());

        public  List<AulaGrupo> GetAulas(MySqlCommand command)
        {
            List<AulaGrupo> list = new List<AulaGrupo>();

            try
            {
                connection.Open();

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

        public List<AulaGrupo> GetTodasAulas()
        {
            string sqlCommand = "select * from Aula_Grupo";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            return GetAulas(command);
        }

        public List<AulaGrupo> GetAulasDia(string dia)
        {
            string sqlCommand = "select * from Aula_Grupo where dia = @DIA order by hora";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@DIA", MySqlDbType.VarChar));
            command.Parameters["@DIA"].Value = dia;

            return GetAulas(command);
        }

        public List<AulaGrupo> GetAulasInstr(string instr)
        {
            string sqlCommand = "select * from Aula_Grupo where Instrutor_email = @EMAIL order by hora";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);
            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));

            command.Parameters["@EMAIL"].Value = instr;

            return GetAulas(command);
        }

        public bool InsertAula(AulaGrupo aula)
        {
            bool r = false;

            try
            {
                connection.Open();

                string sqlCommand = "insert into Aula_Grupo values(" + aula.ToSql() + ")";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                aula.InitParam(command);

                if (command.ExecuteNonQuery() > 0)
                {
                    r = true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            finally
            {
                connection.Close();
            }

            return r;
        }
    }
}
