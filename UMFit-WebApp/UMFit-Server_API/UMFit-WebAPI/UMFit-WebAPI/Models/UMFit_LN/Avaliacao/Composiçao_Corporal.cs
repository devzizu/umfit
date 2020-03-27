/*
 * Classe Composiçao_Corporal que guarda todos os atributos, mais propriamente,
 * os perimetros relativos à Avaliação
 */
using System.Text;

namespace UMFit_WebAPI.Models.UMFit_LN.Avaliacao
{
    public class Composiçao_Corporal
    {
        public int altura { set; get; }

        public float peso { set; get; }

        public float massa_gorda { set; get; }

        public float massa_magra { set; get; }

        public float imc { set; get; }

        public int idade_metabolica { set; get; }

        public Composiçao_Corporal()
        {
            this.altura = 0;
            this.peso = 0;
            this.massa_gorda = 0;
            this.massa_magra = 0;
            this.imc = 0;
            this.idade_metabolica = 0;
        }

        public Composiçao_Corporal(int altura, float peso, float massa_gorda, float massa_magra, float imc, int idade_metabolica)
        {
            this.altura = altura;
            this.peso = peso;
            this.massa_gorda = massa_gorda;
            this.massa_magra = massa_magra;
            this.imc = imc;
            this.idade_metabolica = idade_metabolica;
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
                r.Append(n);
            }
            else
            {
                r.Append(this.altura + ", ");
                r.Append(this.peso + ", ");
                r.Append(this.massa_gorda + ", ");
                r.Append(this.massa_magra + ", ");
                r.Append(this.imc + ", ");
                r.Append(this.idade_metabolica + " ");
            }

            return r.ToString();
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Altura: " + this.altura + ";\n");
            r.Append("Peso: " + this.peso + ";\n");
            r.Append("Massa Gorda: " + this.massa_gorda + ";\n");
            r.Append("Massa Magra: " + this.massa_magra + ";\n");
            r.Append("IMC: " + this.imc + ";\n");
            r.Append("Idade Metabólica: " + this.idade_metabolica + ";\n");

            return r.ToString();
        }

    }
}
