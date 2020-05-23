using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace UMFit_WebAPI.Models.UMFit_LN.Aulas
{
    public class AulaGrupo
    {               
        public int id {get; set;}
        public TimeSpan hora { get; set; }
        public string dia { get; set; }
        public string nome { get; set; }
        public int lotaçao_Atual {get; set;}
        public int lotaçao_Max { get; set; }
        public string duraçao { get; set; }
        public string dificuldade { get; set; }
        public string instrutor_email { get; set; }
        public string espaço_ginasio { get; set; }

        public AulaGrupo(int id,TimeSpan hora, string dia, string nome, int lotaçao_Atual, int lotaçao_Max,
            string duraçao, string dificuldade, string instrutor_email, string espaço_ginasio)
        {
            this.id = id;
            this.hora = hora;
            this.dia = dia;
            this.nome = nome;
            this.lotaçao_Atual = lotaçao_Atual;
            this.lotaçao_Max = lotaçao_Max;
            this.duraçao = duraçao;
            this.dificuldade = dificuldade;
            this.instrutor_email = instrutor_email;
            this.espaço_ginasio = espaço_ginasio;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Hora: " + this.hora.ToString() + "\n");
            r.Append("Dia: " + this.dia + "\n");
            r.Append("Nome: " + this.nome + "\n");
            r.Append("Lotaçao Atual: " + this.lotaçao_Atual + "\n");
            r.Append("Lotação Max: " + this.lotaçao_Max + "\n");
            r.Append("Duraçao: " + this.duraçao + "\n");
            r.Append("Dificuldade: " + this.dificuldade + "\n");
            r.Append("Email do Instrutor: " + this.instrutor_email + "\n");
            r.Append("Espaço do Ginásio: " + this.espaço_ginasio + "\n");

            return r.ToString();
        }

        public string ToSql()
        {
            StringBuilder r = new StringBuilder();

            r.Append("@HORA, ");
            r.Append("@DIA, ");
            r.Append("@NOME, ");
            r.Append("@LOTAÇAO_ATUAL, ");
            r.Append("@LOTAÇAO_MAX, ");
            r.Append("@DURAÇAO, ");
            r.Append("@DIFICULDADE, ");
            r.Append("@EMAIL_INSTR, ");
            r.Append("@ESPAÇO_GINASIO");

            return r.ToString();
        }

        public void InitParam(MySqlCommand command)
        {
            command.Parameters.Add("@HORA", MySqlDbType.Time);
            command.Parameters["@HORA"].Value = this.hora;

            command.Parameters.Add("@DIA", MySqlDbType.VarChar);
            command.Parameters["@DIA"].Value = this.dia;

            command.Parameters.Add("@NOME", MySqlDbType.VarChar);
            command.Parameters["@NOME"].Value = this.nome;

            command.Parameters.Add("@LOTAÇAO_ATUAL", MySqlDbType.Int16);
            command.Parameters["@LOTAÇAO_ATUAL"].Value = this.lotaçao_Atual;

            command.Parameters.Add("@LOTAÇAO_MAX", MySqlDbType.Int16);
            command.Parameters["@LOTAÇAO_MAX"].Value = this.lotaçao_Max;

            command.Parameters.Add("@DURAÇAO", MySqlDbType.VarChar);
            command.Parameters["@DURAÇAO"].Value = this.duraçao;

            command.Parameters.Add("@DIFICULDADE", MySqlDbType.VarChar);
            command.Parameters["@DIFICULDADE"].Value = this.dificuldade;

            command.Parameters.Add("@INSTRUTOR_EMAIL", MySqlDbType.VarChar);
            command.Parameters["@INSTRUTOR_EMAIL"].Value = this.instrutor_email;

            command.Parameters.Add("@ESPAÇO_GINASIO", MySqlDbType.VarChar);
            command.Parameters["@ESPAÇO_GINASIO"].Value = this.espaço_ginasio;
        }
        
        
        
        
        public string ToSqlUpdate()
        {
            StringBuilder r = new StringBuilder();

            r.Append("hora = @HORA, ");
            r.Append("dia = @DIA, ");
            r.Append("nome = @NOME, ");
            r.Append("lotaçao_Atual = @LOTAÇAO_ATUAL, ");
            r.Append("lotaçao_Max = @LOTAÇAO_MAX, ");
            r.Append("duraçao = @DURAÇAO, ");
            r.Append("dificuldade = @DIFICULDADE, ");
            r.Append("Instrutor_email = @INSTRUTOR_EMAIL, ");
            r.Append("Espaço_Ginasio = @ESPAÇO_GINASIO");

            return r.ToString();
        }

    }
}
