/*
 * Classe que guarda o Registo, bem como a data em que foi realizado
 * relativo a uma avaliação
 */
using System.Text;

namespace TesteApiConnect
{
    class Registo_Avaliaçao
    {
        // O registo pode ser um valor de peso, altura, imc, ...
        public float registo { set; get; }
        // Data da avaliação do registo em causa
        public string data { set; get; }

        public Registo_Avaliaçao(float registo, string data)
        {
            this.registo = registo;
            this.data = data;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Registo: " + this.registo + "; ");
            r.Append("Data: " + this.data + "; ");

            return r.ToString();
        }
    }
}
