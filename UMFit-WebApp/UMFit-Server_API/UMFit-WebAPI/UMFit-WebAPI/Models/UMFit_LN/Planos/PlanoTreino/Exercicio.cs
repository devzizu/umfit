
using MySql.Data.MySqlClient;
using System.Text;

namespace UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoTreino
{
    public class Exercicio
    {
        public string nome { get; set; }
        public int repetiçoes { get; set; }
        public int series { get; set; }

        public Exercicio(string nome, int repetiçoes, int series)
        {
            this.nome = nome;
            this.repetiçoes = repetiçoes;
            this.series = series;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("\tNome = " + this.nome);
            r.Append("\n\tRepetiçoes = " + this.repetiçoes);
            r.Append("\n\tSeries = " + this.series);

            return r.ToString();
        }

        public string ToSql()
        {
            StringBuilder r = new StringBuilder();

            r.Append("@NOME, ");
            r.Append("@REPETIÇOES, ");
            r.Append("@SERIES");

            return r.ToString();
        }

        public void InitParam(MySqlCommand command)
        {
            command.Parameters.Add("@NOME", MySqlDbType.VarChar);
            command.Parameters["@NOME"].Value = this.nome;

            command.Parameters.Add("@REPETIÇOES", MySqlDbType.Int32);
            command.Parameters["@REPETIÇOES"].Value = this.repetiçoes;

            command.Parameters.Add("@SERIES", MySqlDbType.Int32);
            command.Parameters["@SERIES"].Value = this.series;
        }
    }
}
