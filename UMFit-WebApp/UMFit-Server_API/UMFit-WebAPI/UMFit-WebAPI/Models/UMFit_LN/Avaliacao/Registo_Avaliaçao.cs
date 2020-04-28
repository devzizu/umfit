/*
 * Classe que guarda o Registo, bem como a data em que foi realizado
 * relativo a uma avaliação
 */

using System;
using System.Text;

namespace UMFit_WebAPI.Models.UMFit_LN.Avaliacao
{
    public class Registo_Avaliaçao
    {
        // O registo pode ser um valor de peso, altura, imc, ...
        public float registo { set; get; }
        // Data da avaliação do registo em causa
        public  DateTime data { set; get; }

        public Registo_Avaliaçao(float registo, DateTime data)
        {
            this.registo = registo;
            this.data = data;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Registo: " + this.registo + "; ");
            r.Append("Data: " + this.data.ToString() + "; ");

            return r.ToString();
        }    }
}