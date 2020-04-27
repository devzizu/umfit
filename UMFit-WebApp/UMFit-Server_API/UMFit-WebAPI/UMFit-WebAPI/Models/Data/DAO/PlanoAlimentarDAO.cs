using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoAlimentar;

namespace UMFit_WebAPI.Models.Data.DAO
{
    public class PlanoAlimentarDAO
    {
        /*
         *  Instância que permite a conexão à Base de Dados da aplicação
         *  Usa a classe DataBaseConnector para buscar os dados relativos à conexão
         *  Neste caso, utiliza (como primeira fase) Localhost
         */
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());

        public bool InsertPlanoAlimentar(PlanoAlimentar pa)
        {
            bool r = false;

            try
            {
                connection.Open();

                string sqlCommand = "insert into Plano_Alimentar (nome, frequencia, refeicoes_livres, data_Fim) " +
                    "values(" + pa.ToSql() + ")";
                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                pa.InitParam(command);

                if (command.ExecuteNonQuery() > 0)
                    r = true;

                command = new MySqlCommand("select LAST_INSERT_ID()", connection);
                int idPlano_Alimentar = Convert.ToInt32(command.ExecuteScalar());

                for (int i = 0; i < pa.refeiçoes.Count; i++)
                {
                    sqlCommand = "insert into Refeiçao (nome, descriçao) values(" + pa.refeiçoes[i].ToSql() + ")";
                    command = new MySqlCommand(sqlCommand, connection);

                    pa.refeiçoes[i].InitParam(command);

                    command.ExecuteScalar();

                    command = new MySqlCommand("select LAST_INSERT_ID()", connection);
                    int idRefeiçao = Convert.ToInt32(command.ExecuteScalar());

                    sqlCommand = "insert into Plano_Alimentar_Refeiçoes values(@ID_PLANOALIMENTAR, @ID_REFEIÇAO)";
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add("@ID_PLANOALIMENTAR", MySqlDbType.Int16);
                    command.Parameters["@ID_PLANOALIMENTAR"].Value = idPlano_Alimentar;

                    command.Parameters.Add("@ID_REFEIÇAO", MySqlDbType.Int16);
                    command.Parameters["@ID_REFEIÇAO"].Value = idRefeiçao;

                    command.ExecuteScalar();
                }

                sqlCommand = "insert into PlanoAlimentar_do_Cliente values(@ID, @CLIENTE_EMAIL)";
                command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add("@ID", MySqlDbType.Int16);
                command.Parameters["@ID"].Value = idPlano_Alimentar;

                command.Parameters.Add("@CLIENTE_EMAIL", MySqlDbType.VarChar);
                command.Parameters["@CLIENTE_EMAIL"].Value = pa.cliente_email;

                // Verifica se foi atribuido o plano ao cliente
                if (command.ExecuteNonQuery() > 0)
                    r = true;
                else
                    r = false;
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

        public List<PlanoAlimentar> GetPlanoAlimentar(string cliente_email)
        {
            List<PlanoAlimentar> planos = new List<PlanoAlimentar>();

            try
            {
                connection.Open();

                string sqlCommand = "select idPlano_Alimentar from PlanoAlimentar_do_Cliente where Cliente_email = @CLIENTE_EMAIL";

                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add("@CLIENTE_EMAIL", MySqlDbType.VarChar);
                command.Parameters["@CLIENTE_EMAIL"].Value = cliente_email;

                MySqlDataReader reader = command.ExecuteReader();

                List<int> listaIdPlanos = new List<int>();

                while (reader.Read())
                {
                    listaIdPlanos.Add(reader.GetInt16(0));
                }

                reader.Close();

                DateTime now = DateTime.Now.Date;

                for (int i = 0; i < listaIdPlanos.Count; i++)
                {
                    string sqlCommandPlanoAlimentar = "select * from Plano_Alimentar where idPlano_Alimentar = @ID and " +
                    "data_Fim > @DATA";
                    MySqlCommand commandPlanoAlimentar = new MySqlCommand(sqlCommandPlanoAlimentar, connection);

                    string sqlCommandRefeiçao = "select * from Refeiçao e left join Plano_Alimentar_Refeiçoes ept " +
                        "on e.idRefeiçao = ept.idRefeiçao where ept.idPlano_Alimentar = @ID";
                    MySqlCommand commandRefeiçao = new MySqlCommand(sqlCommandRefeiçao, connection);

                    commandPlanoAlimentar.Parameters.Add("@ID", MySqlDbType.Int16);
                    commandPlanoAlimentar.Parameters["@ID"].Value = listaIdPlanos[i];

                    commandPlanoAlimentar.Parameters.Add("@DATA", MySqlDbType.Date);
                    commandPlanoAlimentar.Parameters["@DATA"].Value = now;

                    reader = commandPlanoAlimentar.ExecuteReader();

                    reader.Read();

                    PlanoAlimentar pa = null;

                    if (reader.HasRows)
                    {
                        pa = new PlanoAlimentar(cliente_email, reader.GetString(1), reader.GetString(2),
                           reader.GetInt16(3), reader.GetDateTime(4), new List<Refeiçao>());

                        commandRefeiçao.Parameters.Add("@ID", MySqlDbType.Int16);
                        commandRefeiçao.Parameters["@ID"].Value = listaIdPlanos[i];

                        reader.Close();

                        reader = commandRefeiçao.ExecuteReader();

                        while (reader.HasRows && reader.Read())
                        {
                            Refeiçao r = new Refeiçao(reader.GetString(1), reader.GetString(2));

                            pa.refeiçoes.Add(r);
                        }

                        reader.Close();
                    }

                    reader.Close();

                    planos.Add(pa);
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

            return planos;
        }

         
    }
}
