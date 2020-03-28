/* 
 *  Esta classe implementa o acesso à Base de Dados para o acesso à tabela de Avaliações 
 * 
*/


using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace TesteApiConnect
{
    class AvaliaçaoDAO
    {
        /*
         *  Instância que permite a conexão à Base de Dados da aplicação
         *  Usa a classe DataBaseConnector para buscar os dados relativos à conexão
         *  Neste caso, utiliza (como primeira fase) Localhost
         */
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());


        // Vai buscar todas as Avaliações (realizadas ou não)
        public static List<Avaliaçao> GetTodasAvaliaçoes()
        {
            List<Avaliaçao> r = new List<Avaliaçao>();

            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                string data, instrutor, cliente;

                // Comando SQL para aceder aos atributos permitindo a criação da classe Avaliaçao
                string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                    "where ar.idAvaliaçao = aa.idAvaliaçao";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    int id = reader.GetInt32(0);

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

                    data = reader.GetString(19);
                    instrutor = reader.GetString(20);
                    cliente = reader.GetString(21);

                    Avaliaçao ava = new Avaliaçao(id, data, instrutor, cliente, cc, p);

                    r.Add(ava);
                }

                reader.Close();

                // Fecha a conexão à Base de Dados
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
                sqlCommand = "insert into Avaliaçao_Realizada values (" + av.id + ", " + av.composiçao_Corporal.ToSql(isNull)
                        + ", " + av.perimetros.ToSql(isNull) + ")";

                command = new MySqlCommand(sqlCommand, connection);
                command.ExecuteScalar();

                /*
                 * Comando SQL para inserir uma Avaliação à tabela de avaliações agendadas
                 */
                sqlCommand = "insert into Avaliaçao_Agendada values ('" + av.data + "', '" + av.instrutor_email + "', '" + av.cliente_email
                    + "', " + av.id + ")";

                command = new MySqlCommand(sqlCommand, connection);
                command.ExecuteScalar();

                // Fecha a conexão à Base de Dados
                connection.Close();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }

        /*
         * Função que dá return à lista de Avaliações do cliente pretendido
         */
        public static List<Avaliaçao> GetAvaliaçoes(string emailCliente)
        {
            List<Avaliaçao> r = new List<Avaliaçao>();

            try
            {
                /*
                 * Vamos buscar todas as Avaliações sem referir o cliente
                 */
                List<Avaliaçao> listA = GetTodasAvaliaçoes();
                int i = 0;

                while(i < listA.Count)
                {
                    /*
                     * Caso a avaliação pretença ao cliente, adicionamo-la à lista r
                     */
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


        // -----------------------------------------------------------------------------------------------

        /*
         * Função geral que recebe um comando SQL e, a partir deste, retorna
         * uma lista de Avaliações pretendidas
         */
        public static List<Avaliaçao> GetListaAvR(string sqlCommand)
        {
            List<Avaliaçao> listAv = new List<Avaliaçao>();

            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                string data, instrutor, cliente;

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);
                MySqlDataReader reader = command.ExecuteReader();

                Avaliaçao ava;

                // Inicia a leitura do resultado do comando SQL
                while (reader.Read())
                {
                    // Acede à posição(coluna) 0 do resultado SQL
                    int id = reader.GetInt32(0);

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

                        data = reader.GetString(19);
                        instrutor = reader.GetString(20);
                        cliente = reader.GetString(21);

                        ava = new Avaliaçao(id, data, instrutor, cliente, cc, p);

                        listAv.Add(ava);
                    }
                }

                reader.Close();

                // Fecha a conexão à Base de Dados
                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return listAv;
        }

        /* 
         * Função geral que recebe um comando SQL e, a partir deste, retorna
         * a Avaliação pretendida
         */
        public static Avaliaçao GetAvaliaçaoR(string sqlCommand)
        {
            try
            {
                // Abre a conexão à Base de Dados
                connection.Open();

                Perimetros p;
                Composiçao_Corporal cc;

                string data, instrutor, cliente;

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);
                MySqlDataReader reader = command.ExecuteReader();

                // Inicia a leitura do resultado do comando SQL
                while (reader.Read() && reader.HasRows)
                {
                    // Acede à posição(coluna) 0 do resultado SQL
                    int id = reader.GetInt32(0);

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

                        data = reader.GetString(19);
                        instrutor = reader.GetString(20);
                        cliente = reader.GetString(21);

                        Avaliaçao ava = new Avaliaçao(id, data, instrutor, cliente, cc, p);

                        reader.Close();

                        // Fecha a conexão à Base de Dados
                        connection.Close();

                        // Podemos sair do ciclo while, visto que queremos a ultima realizada
                        return ava;
                    }
                }

                reader.Close();

                // Fecha a conexão à Base de Dados
                connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return null;
        }


        // -----------------------------------------------------------------------------------------------

        /*
         *  Vai buscar todas as Avaliações Realizadas na base de dados
         */
        public static List<Avaliaçao> GetAvaliaçoesRealizadas()
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao";

            return GetListaAvR(sqlCommand);
        }

        /*
        * Função que retorna a ultima Avaliação realizada por parte de um cliente
        */
        public static Avaliaçao GetUltAvaliaçaoR(string emailCliente)
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao and aa.Cliente_email = '" + emailCliente + "'"
                + "order by aa.data desc";

            return GetAvaliaçaoR(sqlCommand);
        }

        /*
         * Função que retorna uma Avaliação dado o email de um Cliente e a data 
         * em que foi realizada
         */
        public static Avaliaçao GetAvalRData(string emailCliente, string date)
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao and aa.Cliente_email = '" + emailCliente + "'"
                + "and aa.data = '" + date + "'";

            return GetAvaliaçaoR(sqlCommand);
        }

        /*
         * Função que retorna a lista de Avaliaçõe realizadas do instrutor
         */
        public static List<Avaliaçao> GetAvalRInstr(string emailInstr)
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao and aa.Instrutor_email = '" + emailInstr + "'"
                + "order by aa.data desc";

            return GetListaAvR(sqlCommand);
        }

        /*
         * Função que dá return de uma lista com todas as Avaliações realizadas pelo cliente em causa
         */
        public static List<Avaliaçao> GetAvalRCliente(string emailCliente)
        {
            // Comando SQL utilizado para criar a classe Avaliaçao
            string sqlCommand = "select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa " +
                "where ar.idAvaliaçao = aa.idAvaliaçao and aa.Cliente_email = '" + emailCliente + "'"
                + "order by aa.data desc";

            return GetListaAvR(sqlCommand);
        }
    }
}

