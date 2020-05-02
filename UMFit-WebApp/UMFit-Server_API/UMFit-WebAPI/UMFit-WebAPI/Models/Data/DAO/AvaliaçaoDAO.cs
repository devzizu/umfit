/* 
 *  Esta classe implementa o acesso à Base de Dados para o acesso à tabela de Avaliações 
 * 
*/


using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using UMFit_WebAPI.Models.UMFit_LN.Avaliacao;

namespace UMFit_WebAPI.Models.Data.DAO
{
    public class AvaliaçaoDAO
    {
        /*
         *  Instância que permite a conexão à Base de Dados da aplicação
         *  Usa a classe DataBaseConnector para buscar os dados relativos à conexão
         *  Neste caso, utiliza (como primeira fase) Localhost
         */
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());


        // Vai buscar todas as Avaliações (realizadas ou não)
        // Vai buscar todas as Avaliações (realizadas ou não)
        public List<Avaliaçao> GetTodasAvaliaçoes()
        {
            List<Avaliaçao> r = new List<Avaliaçao>();

            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                // Comando SQL para aceder aos atributos permitindo a criação da classe Avaliaçao
                string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                    "where ar.idAvaliaçao = aa.idAvaliaçao";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    if (!reader.IsDBNull(1))
                    {
                        cc = new Composiçao_Corporal(reader.GetInt32(1), reader.GetFloat(2), reader.GetFloat(3),
                        reader.GetFloat(4), reader.GetFloat(5), reader.GetInt32(6));

                        p = new Perimetros(reader.GetFloat(7), reader.GetFloat(8), reader.GetFloat(9), reader.GetFloat(10),
                        reader.GetFloat(11), reader.GetFloat(12), reader.GetFloat(13), reader.GetFloat(14), reader.GetFloat(15),
                        reader.GetFloat(16), reader.GetFloat(17), reader.GetFloat(18));
                    }
                    else
                    {
                        /*
                         * Como queremos todas avaliações, adicionamos os valores que estão a null na BD
                         * a 0 na classe Avaliaçao (ou seja, quando a avaliação ainda não foi realizada)
                         */
                        cc = new Composiçao_Corporal();
                        p = new Perimetros();
                    }

                    Avaliaçao ava = new Avaliaçao(reader.GetDateTime(19), reader.GetString(20), reader.GetString(21), cc, p);

                    r.Add(ava);
                }

                reader.Close();
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
        public bool UpdateAvaliaçaoRealizada(Avaliaçao av)
        {
            bool r = false;
            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                MySqlCommand command;
                string sqlCommand;

                sqlCommand = "select idAvaliaçao from Avaliaçao_Agendada where Cliente_email = @CLIENTE_EMAIL and "
                    + "Instrutor_email = @INSTRUTOR_EMAIL and data = @DATA";
                command = new MySqlCommand(sqlCommand, connection);

                command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add(new MySqlParameter("@CLIENTE_EMAIL", MySqlDbType.VarChar));
                command.Parameters["@CLIENTE_EMAIL"].Value = av.cliente_email;

                command.Parameters.Add(new MySqlParameter("@INSTRUTOR_EMAIL", MySqlDbType.VarChar));
                command.Parameters["@INSTRUTOR_EMAIL"].Value = av.instrutor_email;

                command.Parameters.Add(new MySqlParameter("@DATA", MySqlDbType.DateTime));
                command.Parameters["@DATA"].Value = av.data;
                
                
                int id = Convert.ToInt32(command.ExecuteScalar());

                sqlCommand = "update Avaliaçao_Realizada " +
                             "set altura = @ALTURA, peso = @PESO, massa_Gorda = @MASSA_GORDA, " +
                             "massa_Magra = @MASSA_MAGRA, imc = @IMC, idade_Metabolica = @IDADE_METABOLICA, " +
                             "cintura = @CINTURA, abdomen = @ABDOMEN, ombro = @OMBRO, torax = @TORAX, " +
                             " braço_direito = @BRAÇO_DIR, braço_esquerdo = @BRAÇO_ESQ, coxa_direita = @COXA_DIR, " +
                             "coxa_esquerda = @COXA_ESQ, gemeo_direito = @GEMEO_DIR, " +
                             "gemeo_esquerdo = @GEMEO_ESQ, antebraço_direito = @ANTEBRAÇO_DIR, antebraço_esquerdo = @ANTEBRAÇO_ESQ " +
                             "where idAvaliaçao = @ID";

                command = new MySqlCommand(sqlCommand, connection);

                av.composicao_corporal.IniParamSql(command);
                av.perimetros.IniParamSql(command);

                command.Parameters.Add(new MySqlParameter("@ID", MySqlDbType.Int32));
                command.Parameters["@ID"].Value = id;
                
                if (command.ExecuteNonQuery() > 0)
                    r = true;

            }
            catch(Exception e)
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
        public bool InsertAvaliaçao(Avaliaçao av)
        {
            var ret = true;
            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                MySqlCommand command;
                string sqlCommand;
                bool isNull = true;

                if (av.realizada)
                {
                    // Foi realizado, logo não preenchemos os valores da tabela "Avaliaçao_Realizada" a null
                    isNull = false;
                }

                /*
                 * Comando SQL para inserir uma Avaliação à tabela de avaliações realizadas
                 */
                sqlCommand = "insert into Avaliaçao_Realizada (altura, peso, massa_Gorda, " +
                    "massa_Magra, imc, idade_Metabolica, cintura, abdomen, ombro, torax," +
                    " braço_direito, braço_esquerdo, coxa_direita, coxa_esquerda, gemeo_direito, " +
                    "gemeo_esquerdo, antebraço_direito, antebraço_esquerdo) " +
                    "values(" + av.composicao_corporal.ToSql(isNull)
                        + ", " + av.perimetros.ToSql(isNull) + ")";

                command = new MySqlCommand(sqlCommand, connection);

                av.composicao_corporal.IniParamSql(command);
                av.perimetros.IniParamSql(command);

                command.ExecuteScalar();

                command = new MySqlCommand("select LAST_INSERT_ID()", connection);
                int idAva = Convert.ToInt32(command.ExecuteScalar());

                /*
                 * Comando SQL para inserir uma Avaliação à tabela de avaliações agendadas
                 */
                sqlCommand = "insert into Avaliaçao_Agendada values(@DATA, @INSTRUTOR_EMAIL, " +
                    "@CLIENTE_EMAIL, @ID)";

                command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add(new MySqlParameter("@DATA", MySqlDbType.DateTime));
                command.Parameters["@DATA"].Value = av.data.ToString("yyyy-MM-dd HH:mm:ss");

                command.Parameters.Add(new MySqlParameter("@INSTRUTOR_EMAIL", MySqlDbType.VarChar));
                command.Parameters["@INSTRUTOR_EMAIL"].Value = av.instrutor_email;

                command.Parameters.Add(new MySqlParameter("@CLIENTE_EMAIL", MySqlDbType.VarChar));
                command.Parameters["@CLIENTE_EMAIL"].Value = av.cliente_email;

                command.Parameters.Add(new MySqlParameter("@ID", MySqlDbType.Int32));
                command.Parameters["@ID"].Value = idAva;

                command.ExecuteScalar();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
                ret = false;
                return ret;
            }
            finally
            {
                // Fecha a conexão à Base de Dados
                connection.Close();
                
            }

            return ret;
        }

        /*
         * Função que dá return à lista de Avaliações do cliente pretendido
         */
        public List<Avaliaçao> GetAvaliaçoes(string emailCliente)
        {
            List<Avaliaçao> r = new List<Avaliaçao>();

            try
            {
                /*
                 * Vamos buscar todas as Avaliações sem referir o cliente
                 */
                List<Avaliaçao> listA = GetTodasAvaliaçoes();

                for(int i = 0;  i < listA.Count; i++)
                {
                    /*
                     * Caso a avaliação pretença ao cliente, adicionamo-la à lista r
                     */
                    if (listA[i].cliente_email.Equals(emailCliente))
                        r.Add(listA[i]);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return r;
        }


        // -----------------------------------------------------------------------------------------------
        
        /*
         * Funções gerais que recebem um comando SQL e retornam uma Lista ou um elemento de Avaliações
         * Estas funções são usadas noutras queries mais expecíficas
         */


        /*
         * Função geral que recebe um comando SQL e, a partir deste, retorna
         * uma lista de Avaliações pretendidas
         */
        public List<Avaliaçao> GenericListaAvR(MySqlCommand command) 
        {
            List<Avaliaçao> listAv = new List<Avaliaçao>();

            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                MySqlDataReader reader = command.ExecuteReader();

                Avaliaçao ava;

                // Inicia a leitura do resultado do comando SQL
                while (reader.Read())
                {
                    /* 
                     * Caso o atributo "altura" (está na posição 1 do resultado do SQL) da Base de Dados seja null
                     * é porque a Avaliação não foi realizada.
                     */
                    if (!reader.IsDBNull(1))
                    {
                        cc = new Composiçao_Corporal(reader.GetInt32(1), reader.GetFloat(2), reader.GetFloat(3),
                        reader.GetFloat(4), reader.GetFloat(5), reader.GetInt32(6));

                        p = new Perimetros(reader.GetFloat(7), reader.GetFloat(8), reader.GetFloat(9), reader.GetFloat(10),
                        reader.GetFloat(11), reader.GetFloat(12), reader.GetFloat(13), reader.GetFloat(14), reader.GetFloat(15),
                        reader.GetFloat(16), reader.GetFloat(17), reader.GetFloat(18));

                        ava = new Avaliaçao(reader.GetDateTime(19), reader.GetString(20), reader.GetString(21), cc, p);

                        listAv.Add(ava);
                    }
                }

                reader.Close();
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

            return listAv;
        }

        /* 
         * Função geral que recebe um comando SQL e, a partir deste, retorna
         * a Avaliação pretendida
         */
        public Avaliaçao GenericAvaliaçaoR(MySqlCommand command)
        {
            Avaliaçao ava = null;

            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                MySqlDataReader reader = command.ExecuteReader();

                // Inicia a leitura do resultado do comando SQL
                while (reader.Read() && reader.HasRows)
                {
                    /* 
                     * Caso o atributo "altura" (está na posição 1 do resultado do SQL) da Base de Dados seja null
                     * é porque a Avaliação não foi realizada.
                     */
                    if (!reader.IsDBNull(1))
                    {
                        cc = new Composiçao_Corporal(reader.GetInt32(1), reader.GetFloat(2), reader.GetFloat(3),
                        reader.GetFloat(4), reader.GetFloat(5), reader.GetInt32(6));

                        p = new Perimetros(reader.GetFloat(7), reader.GetFloat(8), reader.GetFloat(9), reader.GetFloat(10),
                        reader.GetFloat(11), reader.GetFloat(12), reader.GetFloat(13), reader.GetFloat(14), reader.GetFloat(15),
                        reader.GetFloat(16), reader.GetFloat(17), reader.GetFloat(18));

                        ava = new Avaliaçao(reader.GetDateTime(19), reader.GetString(20), reader.GetString(21), cc, p);

                        reader.Close();
                        break;
                    }
                }

                reader.Close();
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

            return ava;
        }

        public List<Avaliaçao> GenericListAvAgend(MySqlCommand command)
        {
            List<Avaliaçao> listAv = new List<Avaliaçao>();

            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                MySqlDataReader reader = command.ExecuteReader();

                Avaliaçao ava;

                // Inicia a leitura do resultado do comando SQL
                while (reader.Read())
                {
                    /* 
                     * Caso o atributo "altura" (está na posição 1 do resultado do SQL) da Base de Dados seja null
                     * é porque a Avaliação não foi realizada.
                     */
                    if (reader.IsDBNull(1))
                    {
                        cc = new Composiçao_Corporal();
                        p = new Perimetros();

                        ava = new Avaliaçao(reader.GetDateTime(19), reader.GetString(20), reader.GetString(21), cc, p);

                        listAv.Add(ava);
                    }
                }

                reader.Close();
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

            return listAv;
        }


        // -----------------------------------------------------------------------------------------------

        public List<Avaliaçao> GetAvaAgendCli(string emailCliente)
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao and aa.Cliente_email = @EMAILCLIENTE ";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);
            
            command.Parameters.Add(new MySqlParameter("@EMAILCLIENTE", MySqlDbType.VarChar));
            command.Parameters["@EMAILCLIENTE"].Value = emailCliente;
            
            return GenericListAvAgend(command);
        }


        /*
         *  Vai buscar todas as Avaliações Realizadas na base de dados
         */
        public List<Avaliaçao> GetAvaliaçoesRealizadas()
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            return GenericListaAvR(command);
        }

        /*
        * Função que retorna a ultima Avaliação realizada por parte de um cliente
        */
        public Avaliaçao GetUltAvaliaçaoR(string emailCliente)
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao and aa.Cliente_email = @EMAILCLIENTE "
                + "order by aa.data desc";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@EMAILCLIENTE", MySqlDbType.VarChar));
            command.Parameters["@EMAILCLIENTE"].Value = emailCliente;

            return GenericAvaliaçaoR(command);
        }

        /*
         * Função que retorna a lista de Avaliaçõe realizadas do instrutor
         */
        public List<Avaliaçao> GetAvalInstr(string emailInstr, char tipo)
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                                "where ar.idAvaliaçao = aa.idAvaliaçao and aa.Instrutor_email = @EMAILINSTRUTOR "
                                + "order by aa.data desc";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@EMAILINSTRUTOR", MySqlDbType.VarChar));
            command.Parameters["@EMAILINSTRUTOR"].Value = emailInstr;

            return tipo=='R'? GenericListaAvR(command) : GenericListAvAgend(command);
        }

        /*
         * Função que dá return de uma lista com todas as Avaliações realizadas pelo cliente em causa
         */
        public List<Avaliaçao> GetAvalRCliente(string emailCliente)
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao and aa.Cliente_email = @EMAILCLIENTE "
                + "order by aa.data desc";

            MySqlCommand command = new MySqlCommand(sqlCommand, connection);

            command.Parameters.Add(new MySqlParameter("@EMAILCLIENTE", MySqlDbType.VarChar));
            command.Parameters["@EMAILCLIENTE"].Value = emailCliente;

            return GenericListaAvR(command);
        }
    }
}
