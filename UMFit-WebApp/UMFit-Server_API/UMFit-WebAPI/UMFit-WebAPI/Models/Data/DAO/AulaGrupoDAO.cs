using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
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
                    AulaGrupo aula = new AulaGrupo(reader.GetInt32(0),reader.GetTimeSpan(1), reader.GetString(2),
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

                string sqlCommand = "insert into Aula_Grupo (hora, dia, nome, lotaçao_Atual," +
                                    " lotaçao_Max, duraçao, dificuldade, Instrutor_email, Espaço_Ginasio)" +
                                    " values(" + aula.ToSql() + ")";

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

        public AulaGrupo GetAulaID(int id)
        {
                    string sqlCommand = "select * from Aula_Grupo where idAula_Grupo =@ID";
                    MySqlCommand command = new MySqlCommand(sqlCommand, connection);
                    command.Parameters.Add(new MySqlParameter("@ID", MySqlDbType.Int16));
                    command.Parameters["@ID"].Value = id;
                    
                    
                    var ret = GetAulas(command);
                    return ret.Count < 1 ? null : ret[0] ;
                }
        public bool DesmarcárAula(int id, string mail)
        {
            bool r = false;
            try
            { connection.Open();
          
                string sqlCommand = "delete from Clientes_na_AulaGrupo where Cliente_email = @EMAIL and idAula_Grupo=@ID";
            
                MySqlCommand command = new MySqlCommand(sqlCommand, connection);
                command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                command.Parameters["@EMAIL"].Value = mail;
                command.Parameters.Add(new MySqlParameter("@ID", MySqlDbType.Int16));
                command.Parameters["@ID"].Value = id;

                if (command.ExecuteNonQuery() > 0){r = true;}
                
                sqlCommand = "update Aula_Grupo set lotaçao_Atual=lotaçao_Atual-1 where idAula_Grupo ="+id;
                command = new MySqlCommand(sqlCommand, connection);
        
                if (command.ExecuteNonQuery() > 0){r = true;}

        } catch (Exception e){Console.WriteLine(e.ToString());}finally{connection.Close();}

            return r;
        }
        public bool MarcarAula(ClienteAula ca)
        {
           bool r = false;
           try
           { connection.Open();
          
               string sqlCommand = "insert into Clientes_na_AulaGrupo (idAula_Grupo,hora, dia,Cliente_email,  Instrutor_email, Espaço_Ginasio)" +
                                   " values(" + ca.ToSql() + ")";

               MySqlCommand command = new MySqlCommand(sqlCommand, connection);

               ca.InitParam(command);             
      
        if (command.ExecuteNonQuery() > 0){

        sqlCommand = "update Aula_Grupo set lotaçao_Atual=lotaçao_Atual+1 where idAula_Grupo ="+ca.id;
        command = new MySqlCommand(sqlCommand, connection);
        
        if (command.ExecuteNonQuery() > 0){r = true;}}

           } catch (Exception e){Console.WriteLine(e.ToString());}finally{connection.Close();}

           return r;
        }

        public List<int> GetAulasCliente(string mail)
        {
            
            string sqlCommand = "select idAula_Grupo from Clientes_na_AulaGrupo where Cliente_email =@EMAIL";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);
            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
            command.Parameters["@EMAIL"].Value = mail;
            
            
            List<int> ret = new List<int>();

            try
            {
                connection.Open();

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read() && reader.HasRows)
                {
                    ret.Add(reader.GetInt32(0));
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
            return ret;
        }
    }
}
