using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
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
public  bool MarcarAula(ClienteAula ca)
        {
            bool r = false;
            try
            {
                connection.Open();

                string sqlCommand = "insert into Clientes_na_AulaGrupo (idAula_Grupo,hora, dia,Cliente_email,  Instrutor_email, Espaço_Ginasio)" +
                                    " values(" + ca.ToSql() + ")";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                ca.InitParam(command);

                if (command.ExecuteNonQuery() > 0)
                {
                    sqlCommand = "update Aula_Grupo set lotaçao_Atual = lotaçao_Atual+1 where idAula_Grupo =" + ca.id;
                    command = new MySqlCommand(sqlCommand, connection);

                    if (command.ExecuteNonQuery() > 0) 
                    { 
                        r = true;

                        sqlCommand = "select nome from Aula_Grupo where idAula_Grupo = @ID_AULA";
                        command = new MySqlCommand(sqlCommand, connection);

                        command.Parameters.Add(new MySqlParameter("@ID_AULA", MySqlDbType.Int32));
                        command.Parameters["@ID_AULA"].Value = ca.id;

                        string nomeAula = Convert.ToString(command.ExecuteScalar());

                        sqlCommand = "update Estatistica set num_vezes_feita = num_vezes_feita + 1 where Cliente_email = @CLIENTE_EMAIL " +
                            " and nome = @NOME_AULA";
                        command = new MySqlCommand(sqlCommand, connection);

                        command.Parameters.Add(new MySqlParameter("@CLIENTE_EMAIL", MySqlDbType.VarChar));
                        command.Parameters["@CLIENTE_EMAIL"].Value = ca.cliente_email;

                        command.Parameters.Add(new MySqlParameter("@NOME_AULA", MySqlDbType.VarChar));
                        command.Parameters["@NOME_AULA"].Value = nomeAula;

                        if (command.ExecuteNonQuery() == 0)
                        {
                            sqlCommand = "insert into Estatistica (nome, num_vezes_feita, Cliente_email) values " +
                                "(@NOME_AULA, @NUM_VEZES_FEITA, @CLIENTE_EMAIL)";
                            command = new MySqlCommand(sqlCommand, connection);

                            command.Parameters.Add(new MySqlParameter("@CLIENTE_EMAIL", MySqlDbType.VarChar));
                            command.Parameters["@CLIENTE_EMAIL"].Value = ca.cliente_email;

                            command.Parameters.Add(new MySqlParameter("@NOME_AULA", MySqlDbType.VarChar));
                            command.Parameters["@NOME_AULA"].Value = nomeAula;

                            command.Parameters.Add(new MySqlParameter("@NUM_VEZES_FEITA", MySqlDbType.Int16));
                        
                            command.Parameters["@NUM_VEZES_FEITA"].Value = 1;
                            command.ExecuteNonQuery(); 
                        }
                        
                    }
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
    
        public List<AulaGrupo> GetAulas(MySqlCommand command)
        {
            List<AulaGrupo> list = new List<AulaGrupo>();
            MySqlDataReader reader = null;
            try
            
            {
                if(connection.State == ConnectionState.Closed) connection.Open();

                reader = command.ExecuteReader();

                while (reader.Read() && reader.HasRows)
                {
                    AulaGrupo aula = new AulaGrupo(reader.GetInt32(0), reader.GetTimeSpan(1), reader.GetString(2),
                        reader.GetString(3), reader.GetInt16(4), reader.GetInt16(5), reader.GetString(6),
                        reader.GetString(7), reader.GetString(8), reader.GetString(9));

                    list.Add(aula);
                }

                
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            finally
            {
                reader.Close();
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
                if(connection.State == ConnectionState.Closed) connection.Open();

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
            return ret.Count < 1 ? null : ret[0];
        }

      public bool DesmarcarAula(int id, string mail)
        {
            bool r = false;
            try
            {
                connection.Open();

                string sqlCommand = "delete from Clientes_na_AulaGrupo where Cliente_email = @EMAIL and idAula_Grupo=@ID";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);
                command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
                command.Parameters["@EMAIL"].Value = mail;
                command.Parameters.Add(new MySqlParameter("@ID", MySqlDbType.Int16));
                command.Parameters["@ID"].Value = id;

                if (command.ExecuteNonQuery() > 0) { r = true; }

                sqlCommand = "update Aula_Grupo set lotaçao_Atual=lotaçao_Atual-1 where idAula_Grupo =" + id;
                command = new MySqlCommand(sqlCommand, connection);

                if (command.ExecuteNonQuery() > 0)
                {
                    r = true;

                    sqlCommand = "select nome from Aula_Grupo where idAula_Grupo = @ID_AULA";
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@ID_AULA", MySqlDbType.Int32));
                    command.Parameters["@ID_AULA"].Value = id;

                    string nomeAula = Convert.ToString(command.ExecuteScalar());

                    sqlCommand = "update Estatistica set num_vezes_feita = num_vezes_feita - 1 where Cliente_email = @CLIENTE_EMAIL " +
                        " and nome = @NOME_AULA";
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add(new MySqlParameter("@CLIENTE_EMAIL", MySqlDbType.VarChar));
                    command.Parameters["@CLIENTE_EMAIL"].Value = mail;

                    command.Parameters.Add(new MySqlParameter("@NOME_AULA", MySqlDbType.VarChar));
                    command.Parameters["@NOME_AULA"].Value = nomeAula;
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception e) { Console.WriteLine(e.ToString()); }
            finally { connection.Close(); }

            return r;
        }
        public List<int> GetAulasCliente(string mail)
        {

            string sqlCommand = "select idAula_Grupo from Clientes_na_AulaGrupo where Cliente_email =@EMAIL";
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);
            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
            command.Parameters["@EMAIL"].Value = mail;

            
            List<int> ret = new List<int>();
            MySqlDataReader reader= null;
            try
            {
                if(connection.State == ConnectionState.Closed) connection.Open();
                reader = command.ExecuteReader();

                while (reader.Read() && reader.HasRows)
                {
                    ret.Add(reader.GetInt32(0));
                }
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            finally
            {
                reader.Close();
                connection.Close();
            }

            return ret;
        }









        public bool UpdateAulaGrupo(AulaGrupo aula, int id)
        {
            if (aula.dia.Equals("Sábado") || aula.dia.Equals("Domingo"))
                return false;

            bool r = false;

            string sqlCommand = "update Aula_Grupo set " + aula.ToSqlUpdate() + " where " +
                                "idAula_Grupo = @IDAULA_GRUPO";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@IDAULA_GRUPO", MySqlDbType.Int32));
            command.Parameters["@IDAULA_GRUPO"].Value = id;

            aula.InitParam(command);

            string sqlCommandClienteAula =
                "update Clientes_na_AulaGrupo set hora = @HORA, dia = @DIA, Instrutor_email = @INSTRUTOR_EMAIL, " +
                "Espaço_Ginasio = @ESPAÇO_GINASIO " +
                "where idAula_Grupo = @IDAULA_GRUPO";

            MySqlCommand commandClienteAula = new MySqlCommand(sqlCommandClienteAula, connection);

            commandClienteAula.Parameters.Add(new MySqlParameter("@IDAULA_GRUPO", MySqlDbType.Int32));
            commandClienteAula.Parameters["@IDAULA_GRUPO"].Value = id;

            commandClienteAula.Parameters.Add(new MySqlParameter("@INSTRUTOR_EMAIL", MySqlDbType.VarChar));
            commandClienteAula.Parameters["@INSTRUTOR_EMAIL"].Value = aula.instrutor_email;

            commandClienteAula.Parameters.Add(new MySqlParameter("@ESPAÇO_GINASIO", MySqlDbType.VarChar));
            commandClienteAula.Parameters["@ESPAÇO_GINASIO"].Value = aula.espaço_ginasio;

            commandClienteAula.Parameters.Add(new MySqlParameter("@HORA", MySqlDbType.Time));
            commandClienteAula.Parameters["@HORA"].Value = aula.hora;

            commandClienteAula.Parameters.Add(new MySqlParameter("@DIA", MySqlDbType.VarChar));
            commandClienteAula.Parameters["@DIA"].Value = aula.dia;

            try
            {
                // Abre a conexão à Base de Dados
                if(connection.State == ConnectionState.Closed) connection.Open();

                if (command.ExecuteNonQuery() > 0 && commandClienteAula.ExecuteNonQuery() > 0)
                    r = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            finally
            {
                // Fecha a conexão à Base de Dados
                connection.Close();
            }

            return r;
        }
        
        
        public List<string> GetAlunos(string idAula)
        {
            string sqlCommand = "select Cliente_email from Clientes_na_AulaGrupo where (idAula_Grupo = " +
                                "@IDAULA_GRUPO)";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@IDAULA_GRUPO", MySqlDbType.Int32));
            command.Parameters["@IDAULA_GRUPO"].Value = Convert.ToInt32(idAula);

            List<string> listClientes = new List<string>();
            MySqlDataReader reader = null;
            
            try
            {
                // Abre a conexão à Base de Dados
                if(connection.State == ConnectionState.Closed) connection.Open();

               reader = command.ExecuteReader();

                // Inicia a leitura do resultado do comando SQL
                while (reader.Read())
                {
                    if (!reader.IsDBNull(0))
                    {
                        listClientes.Add(reader.GetString(0));
                    }
                }

  
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            finally
            {
                reader.Close();
                // Fecha a conexão à Base de Dados
                connection.Close();
            }

            return listClientes;
        }
    }
}
