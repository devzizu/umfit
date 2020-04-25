using MySql.Data.MySqlClient;
using System;
using System.Text;

namespace UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoAlimentar
{
    public class Refeiçao
    {
        public string nome { get; set; }
        public string descriçao { get; set; }

        public Refeiçao(string nome, string descriçao)
        {
            this.nome = nome;
            this.descriçao = descriçao;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("\n\tNome: " + this.nome);
            r.Append("\n\tDescriçao: " + this.descriçao);

            return r.ToString();
        }

        public string ToSql()
        {
            StringBuilder r = new StringBuilder();

            r.Append("@NOME, ");
            r.Append("@DESCRIÇAO ");

            return r.ToString();
        }

        public void InitParam(MySqlCommand command)
        {
            command.Parameters.Add("@NOME", MySqlDbType.VarChar);
            command.Parameters["@NOME"].Value = this.nome;

            command.Parameters.Add("@DESCRIÇAO", MySqlDbType.VarChar);
            command.Parameters["@DESCRIÇAO"].Value = this.descriçao;
        }

    }
}
