/*
 * Classe Perímetros que guarda todos os atributos, mais propriamente,
 * os perimetros relativos à Avaliação
 */
using System.Text;

namespace TesteApiConnect
{
    class Perimetros
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
                r.Append(this.cintura + ", ");
                r.Append(this.abdomen + ", ");
                r.Append(this.ombro + ", ");
                r.Append(this.torax + ", ");
                r.Append(this.braço_dir + ", ");
                r.Append(this.braço_esq + ", ");
                r.Append(this.coxa_dir + ", ");
                r.Append(this.coxa_esq + ", ");
                r.Append(this.gemeo_dir + ", ");
                r.Append(this.gemeo_esq + ", ");
                r.Append(this.antebraço_dir + ", ");
                r.Append(this.antebraço_esq);
            }

            return r.ToString();
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

    }
}
