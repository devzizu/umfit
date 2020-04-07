using System;
using System.Collections.Generic;
using System.Text;

namespace TesteApiConnect
{
    class AulaGrupo
    {
        public int id { get; set; }
        public TimeSpan hora { get; set; }
        public string dia { get; set; }
        public string nome { get; set; }
        public int lotaçao_Atual {get; set;}
        public int lotaçao_Max { get; set; }
        public string duraçao { get; set; }
        public string dificuldade { get; set; }
        public string instrutor_email { get; set; }
        public string espaço_ginasio { get; set; }

        public AulaGrupo(int id, TimeSpan hora, string dia, string nome, int lotaçao_Atual, int lotaçao_Max,
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

            r.Append("Id: " + this.id + "\n");
            r.Append("Hora: " + this.hora.ToString() + "\n");
            r.Append("Dia: " + this.dia + "\n");
            r.Append("Nome: " + this.nome + "\n");
            r.Append("Lotaçao Atual: " + this.lotaçao_Atual + "\n");
            r.Append("Duraçao: " + this.duraçao + "\n");
            r.Append("Dificuldade: " + this.dificuldade + "\n");
            r.Append("Email do Instrutor: " + this.instrutor_email + "\n");
            r.Append("Espaço do Ginásio: " + this.espaço_ginasio + "\n");

            return r.ToString();
        }







    }
}
