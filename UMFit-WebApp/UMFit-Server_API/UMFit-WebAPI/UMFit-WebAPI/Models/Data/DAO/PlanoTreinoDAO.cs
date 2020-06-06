
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoTreino;

namespace UMFit_WebAPI.Models.Data.DAO
{
    public class PlanoTreinoDAO
    {
        /*
         *  Instância que permite a conexão à Base de Dados da aplicação
         *  Usa a classe DataBaseConnector para buscar os dados relativos à conexão
         *  Neste caso, utiliza (como primeira fase) Localhost
         */
        private static MySqlConnection connection = new MySqlConnection(DataBaseConnector.builderLocalhost.ToString());

        public bool InsertPlanoTreino(PlanoTreino pt)
        {
            bool r = false;

            try
            {
                if(connection.State == ConnectionState.Closed) connection.Open();

                string sqlCommand = "insert into Plano_Treino (nome, data_Fim, grupo_muscular, frequencia) " +
                    "values(" + pt.ToSql() +")";
                MySqlCommand command = new MySqlCommand(sqlCommand, connection);

                pt.InitParam(command);

                if (command.ExecuteNonQuery() > 0)
                    r = true;

                command = new MySqlCommand("select LAST_INSERT_ID()", connection);
                int idPlano_Treino = Convert.ToInt32(command.ExecuteScalar()); 

                for(int i = 0; i < pt.exercicios.Count; i++)
                {
                    sqlCommand = "insert into Exercicio (nome, repetiçoes, series) values(" + pt.exercicios[i].ToSql() +")";
                    command = new MySqlCommand(sqlCommand, connection);

                    pt.exercicios[i].InitParam(command);

                    command.ExecuteScalar();

                    command = new MySqlCommand("select LAST_INSERT_ID()", connection);
                    int idExercicio = Convert.ToInt32(command.ExecuteScalar());

                    sqlCommand = "insert into Exercicio_do_Plano_Treino values(@IDEX, @IDPLANO_TREINO)";
                    command = new MySqlCommand(sqlCommand, connection);

                    command.Parameters.Add("@IDEX", MySqlDbType.Int16);
                    command.Parameters["@IDEX"].Value = idExercicio;

                    command.Parameters.Add("@IDPLANO_TREINO", MySqlDbType.Int16);
                    command.Parameters["@IDPLANO_TREINO"].Value = idPlano_Treino;

                    command.ExecuteScalar();
                }

                sqlCommand = "insert into PlanoTreino_do_Cliente values(@ID, @CLIENTE_EMAIL)";
                command = new MySqlCommand(sqlCommand, connection);

                command.Parameters.Add("@ID", MySqlDbType.Int16);
                command.Parameters["@ID"].Value = idPlano_Treino;

                command.Parameters.Add("@CLIENTE_EMAIL", MySqlDbType.VarChar);
                command.Parameters["@CLIENTE_EMAIL"].Value = pt.cliente_email;

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

        public List<PlanoTreino> GetPlanoTreino(string cliente_email)
        {
            List<PlanoTreino> planos = new List<PlanoTreino>();

            try
            {
                if(connection.State == ConnectionState.Closed) connection.Open();

                string sqlCommand = "select idPlano_Treino from PlanoTreino_do_Cliente where Cliente_email = @CLIENTE_EMAIL";

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
                    string sqlCommandPlanoTreino = "select * from Plano_Treino where idPlano_Treino = @ID and " +
                    "data_Fim > @DATA";
                    MySqlCommand commandPlanoTreino = new MySqlCommand(sqlCommandPlanoTreino, connection);

                    string sqlCommandExercicio = "select * from Exercicio e left join Exercicio_do_Plano_Treino ept " +
                        "on e.idExercicio = ept.idExercicio where ept.idPlano_Treino = @ID";
                    MySqlCommand commandExercicio = new MySqlCommand(sqlCommandExercicio, connection);

                    commandPlanoTreino.Parameters.Add("@ID", MySqlDbType.Int16);
                    commandPlanoTreino.Parameters["@ID"].Value = listaIdPlanos[i];

                    commandPlanoTreino.Parameters.Add("@DATA", MySqlDbType.Date);
                    commandPlanoTreino.Parameters["@DATA"].Value = now;

                    reader = commandPlanoTreino.ExecuteReader();

                    reader.Read();

                    PlanoTreino pt = null;

                    if (reader.HasRows)
                    {
                        pt = new PlanoTreino(reader.GetString(1), reader.GetDateTime(2), reader.GetString(3),
                           reader.GetString(4), cliente_email, new List<Exercicio>());

                        commandExercicio.Parameters.Add("@ID", MySqlDbType.Int16);
                        commandExercicio.Parameters["@ID"].Value = listaIdPlanos[i];

                        reader.Close();

                        reader = commandExercicio.ExecuteReader();

                        while (reader.HasRows && reader.Read())
                        {
                            Exercicio e = new Exercicio(reader.GetString(1), reader.GetInt16(2),
                                reader.GetInt16(3));

                            pt.exercicios.Add(e);
                        }

                        reader.Close();
                    }

                    reader.Close();

                    planos.Add(pt);
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
