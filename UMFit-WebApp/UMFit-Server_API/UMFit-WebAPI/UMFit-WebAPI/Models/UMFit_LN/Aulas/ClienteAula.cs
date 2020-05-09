using System;
using System.Text;
using MySql.Data.MySqlClient;

namespace UMFit_WebAPI.Models.UMFit_LN.Aulas
{
    public class ClienteAula
    {
                     
        public int id {get; set;}
        public TimeSpan hora { get; set; }
        public string dia { get; set; }
        public string cliente_email { get; set; }
        public string instrutor_email { get; set; }
        public string espaço_ginasio { get; set; }

        public ClienteAula(int id,TimeSpan hora, string dia,string cliente_email , string instrutor_email, string espaço_ginasio)
        {
            this.id = id;
            this.hora = hora;
            this.dia = dia;
            this.cliente_email = cliente_email;
            this.instrutor_email = instrutor_email;
            this.espaço_ginasio = espaço_ginasio;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Id: " + this.id + "\n");

            r.Append("Hora: " + this.hora.ToString() + "\n");
            r.Append("Dia: " + this.dia + "\n");

            r.Append("Email do Cliente: " + this.cliente_email + "\n");

            r.Append("Email do Instrutor: " + this.instrutor_email + "\n");
            r.Append("Espaço do Ginásio: " + this.espaço_ginasio + "\n");

            return r.ToString();
        }

        public string ToSql()
        {
            StringBuilder r = new StringBuilder();
            r.Append("@ID, ");
            r.Append("@HORA, ");
            r.Append("@DIA, ");
            r.Append("@EMAIL_CLIENTE, ");
            r.Append("@EMAIL_INSTR, ");
            r.Append("@ESPAÇO_GINASIO");

            return r.ToString();
        }

        public void InitParam(MySqlCommand command)
        {
            command.Parameters.Add("@ID", MySqlDbType.Int16);
            command.Parameters["@ID"].Value = this.id;
            
            command.Parameters.Add("@HORA", MySqlDbType.Time);
            command.Parameters["@HORA"].Value = this.hora;

            command.Parameters.Add("@DIA", MySqlDbType.VarChar);
            command.Parameters["@DIA"].Value = this.dia;
            
            command.Parameters.Add("@EMAIL_CLIENTE", MySqlDbType.VarChar);
            command.Parameters["@EMAIL_CLIENTE"].Value = this.cliente_email;
            
                 command.Parameters.Add("@EMAIL_INSTR", MySqlDbType.VarChar);
            command.Parameters["@EMAIL_INSTR"].Value = this.instrutor_email;

            command.Parameters.Add("@ESPAÇO_GINASIO", MySqlDbType.VarChar);
            command.Parameters["@ESPAÇO_GINASIO"].Value = this.espaço_ginasio;
        }
    }
}