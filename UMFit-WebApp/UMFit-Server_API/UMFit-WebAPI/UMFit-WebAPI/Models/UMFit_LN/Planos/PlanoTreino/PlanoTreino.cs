using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoTreino
{
    public class PlanoTreino
    {
        public string nome { get; set; }
        public DateTime data_Fim { get; set; }
        public string grupo_muscular { get; set; }
        public string frequencia { get; set; }
        public string cliente_email { get; set; }
        public List<Exercicio> exercicios { get; set; }

        public PlanoTreino(string nome, DateTime data_Fim, string grupo_muscular, string frequencia,
            string cliente_email, List<Exercicio> exercicios)
        {
            this.nome = nome;
            this.data_Fim = data_Fim;
            this.grupo_muscular = grupo_muscular;
            this.frequencia = frequencia;
            this.cliente_email = cliente_email;
            this.exercicios = exercicios;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Nome = " + this.nome);
            r.Append("\nData_Fim = " + this.data_Fim);
            r.Append("\nGrupo Muscular = " + this.grupo_muscular);
            r.Append("\nFreq = " + this.frequencia);
            r.Append("\nCliente email = " + this.cliente_email);
            r.Append("\nExercicios = ");

            for (int i = 0; i < this.exercicios.Count; i++)
            {
                r.Append("\t" + exercicios[i].ToString() + "\n");
            }

            return r.ToString();
        }

        public string ToSql()
        {
            StringBuilder r = new StringBuilder();

            r.Append("@NOME, ");
            r.Append("@DATA_FIM, ");
            r.Append("@GRUPO_MUSCULAR, ");
            r.Append("@FREQUENCIA ");

            return r.ToString();
        }

        public void InitParam(MySqlCommand command)
        {
            command.Parameters.Add("@NOME", MySqlDbType.VarChar);
            command.Parameters["@NOME"].Value = this.nome;

            command.Parameters.Add("@DATA_FIM", MySqlDbType.Date);
            command.Parameters["@DATA_FIM"].Value = this.data_Fim;

            command.Parameters.Add("@GRUPO_MUSCULAR", MySqlDbType.VarChar);
            command.Parameters["@GRUPO_MUSCULAR"].Value = this.grupo_muscular;

            command.Parameters.Add("@FREQUENCIA", MySqlDbType.VarChar);
            command.Parameters["@FREQUENCIA"].Value = this.frequencia;
        }

    }
}
