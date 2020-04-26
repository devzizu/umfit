/*
 * Classe Perímetros que guarda todos os atributos, mais propriamente,
 * os perimetros relativos à Avaliação
 */
using System.Text;
using MySql.Data.MySqlClient;
using Newtonsoft.Json.Linq;

namespace UMFit_WebAPI.Models.UMFit_LN.Avaliacao
{
    public class Perimetros
    {
        public float cintura { set; get; }
        public float abdomen { set; get; }
        public float ombro { set; get; } 
        public float torax { set; get; }
        public float braço_dir { set; get; }
        public float braço_esq { set; get; }
        public float coxa_dir { set; get; }
        public float coxa_esq { set; get; }
        public float gemeo_dir { set; get; }
        public float gemeo_esq { set; get; }
        public float antebraço_dir { set; get; }
        public float antebraço_esq { set; get; }

        public Perimetros()
        {
            this.cintura = 0;
            this.abdomen = 0;
            this.ombro = 0;
            this.torax = 0;
            this.braço_dir = 0;
            this.braço_esq = 0;
            this.coxa_dir = 0;
            this.coxa_esq = 0;
            this.gemeo_dir = 0;
            this.gemeo_esq = 0;
            this.antebraço_dir = 0;
            this.antebraço_esq = 0;
        }

        public Perimetros(float cintura, float abdomen, float ombro, float torax, float braço_dir, float braço_esq,
            float coxa_dir, float coxa_esq, float gemeo_dir, float gemeo_esq, float antebraço_dir, float antebraço_esq)
        {
            this.cintura = cintura;
            this.abdomen = abdomen;
            this.ombro = ombro;
            this.torax = torax;
            this.braço_dir = braço_dir;
            this.braço_esq = braço_esq;
            this.coxa_dir = coxa_dir;
            this.coxa_esq = coxa_esq;
            this.gemeo_dir = gemeo_dir;
            this.gemeo_esq = gemeo_esq;
            this.antebraço_dir = antebraço_dir;
            this.antebraço_esq = antebraço_esq;
        }

        public string ToSql(bool isNull)
        {
            StringBuilder r = new StringBuilder();

            if (isNull)
            {
                string n = "null";

                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n);
            }
            else
            {
                r.Append("@CINTURA, ");
                r.Append("@ABDOMEN, ");
                r.Append("@OMBRO, ");
                r.Append("@TORAX, ");
                r.Append("@BRAÇO_DIR, ");
                r.Append("@BRAÇO_ESQ, ");
                r.Append("@COXA_DIR, ");
                r.Append("@COXA_ESQ, ");
                r.Append("@GEMEO_DIR, ");
                r.Append("@GEMEO_ESQ, ");
                r.Append("@ANTEBRAÇO_DIR, ");
                r.Append("@ANTEBRAÇO_ESQ");
            }

            return r.ToString();
        }

        public void IniParamSql(MySqlCommand command)
        {
            command.Parameters.Add(new MySqlParameter("@CINTURA", MySqlDbType.Float));
            command.Parameters["@CINTURA"].Value = this.cintura;

            command.Parameters.Add(new MySqlParameter("@ABDOMEN", MySqlDbType.Float));
            command.Parameters["@ABDOMEN"].Value = this.abdomen;

            command.Parameters.Add(new MySqlParameter("@OMBRO", MySqlDbType.Float));
            command.Parameters["@OMBRO"].Value = this.ombro;

            command.Parameters.Add(new MySqlParameter("@TORAX", MySqlDbType.Float));
            command.Parameters["@TORAX"].Value = this.torax;

            command.Parameters.Add(new MySqlParameter("@BRAÇO_DIR", MySqlDbType.Float));
            command.Parameters["@BRAÇO_DIR"].Value = this.braço_dir;

            command.Parameters.Add(new MySqlParameter("@BRAÇO_ESQ", MySqlDbType.Float));
            command.Parameters["@BRAÇO_ESQ"].Value = this.braço_esq;

            command.Parameters.Add(new MySqlParameter("@COXA_DIR", MySqlDbType.Float));
            command.Parameters["@COXA_DIR"].Value = this.coxa_dir;

            command.Parameters.Add(new MySqlParameter("@COXA_ESQ", MySqlDbType.Float));
            command.Parameters["@COXA_DIR"].Value = this.coxa_dir;

            command.Parameters.Add(new MySqlParameter("@GEMEO_DIR", MySqlDbType.Float));
            command.Parameters["@GEMEO_DIR"].Value = this.gemeo_dir;

            command.Parameters.Add(new MySqlParameter("@GEMEO_ESQ", MySqlDbType.Float));
            command.Parameters["@GEMEO_ESQ"].Value = this.gemeo_esq;

            command.Parameters.Add(new MySqlParameter("@ANTEBRAÇO_DIR", MySqlDbType.Float));
            command.Parameters["@ANTEBRAÇO_DIR"].Value = this.antebraço_dir;

            command.Parameters.Add(new MySqlParameter("@ANTEBRAÇO_ESQ", MySqlDbType.Float));
            command.Parameters["@ANTEBRAÇO_ESQ"].Value = this.antebraço_esq;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Cintura: " + this.cintura + ";\n");
            r.Append("Abdomen: " + this.abdomen + ";\n");
            r.Append("Ombro: " + this.ombro + ";\n");
            r.Append("Torax: " + this.torax + ";\n");
            r.Append("Braço direito: " + this.braço_dir + ";\n");
            r.Append("Braço esquerdo: " + this.braço_esq + ";\n");
            r.Append("Coxa direita: " + this.coxa_dir + ";\n");
            r.Append("Coxa esquerda: " + this.coxa_esq + ";\n");
            r.Append("Gêmeo direito: " + this.gemeo_dir + ";\n");
            r.Append("Gêmeo esquerda : " + this.gemeo_esq + ";\n");
            r.Append("Antebraço direito: " + this.antebraço_dir + ";\n");
            r.Append("Antebraço esquerdo: " + this.antebraço_esq + ";\n");

            return r.ToString();
        }

        public JToken ToJSON()
        {
            return new JObject(this);
        }
    }
}
