using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoAlimentar
{
    public class PlanoAlimentar
    {
        public string cliente_email { get; set; }
        public string nome { get; set; }
        public string frequencia { get; set; }
        public int nRefeiçoes_livres { get; set; }
        public DateTime data_Fim { get; set; }
        public List<Refeiçao> refeiçoes { get; set; }

        public PlanoAlimentar(string cliente_email, string nome, string frequencia, int nRefeiçoes_livres, 
            DateTime data_Fim, List<Refeiçao> refeiçoes)
        {
            this.cliente_email = cliente_email;
            this.nome = nome;
            this.frequencia = frequencia;
            this.nRefeiçoes_livres = nRefeiçoes_livres;
            this.data_Fim = data_Fim;
            this.refeiçoes = refeiçoes;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Cliente_email: " + this.cliente_email);
            r.Append("\nNome: " + this.nome);
            r.Append("\nFrequencia: " + this.frequencia);
            r.Append("\nnº Refeiçoes livres: " + this.nRefeiçoes_livres);
            r.Append("\ndata fim: " + this.data_Fim);
            r.Append("\nrefeiçoes: ");

            for (int i = 0; i < this.refeiçoes.Count; i++)
            {
                r.Append(refeiçoes[i].ToString() + "\n");
            }

            return r.ToString();
        }

        public string ToSql()
        {
            StringBuilder r = new StringBuilder();

            r.Append("@NOME, ");
            r.Append("@FREQ, ");
            r.Append("@NREFEIÇOES_LIVRES, ");
            r.Append("@DATA_FIM, ");

            return r.ToString();
        }

        public void InitParam(MySqlCommand command)
        {
            command.Parameters.Add("@NOME", MySqlDbType.VarChar);
            command.Parameters["@NOME"].Value = this.nome;

            command.Parameters.Add("@FREQ", MySqlDbType.VarChar);
            command.Parameters["@FREQ"].Value = this.frequencia;

            command.Parameters.Add("@NREFEIÇOES_LIVRES", MySqlDbType.Int16);
            command.Parameters["@NREFEIÇOES_LIVRES"].Value = this.nRefeiçoes_livres;

            command.Parameters.Add("@DATA_FIM", MySqlDbType.Date);
            command.Parameters["@DATA_FIM"].Value = this.data_Fim;
        }

    }
}
