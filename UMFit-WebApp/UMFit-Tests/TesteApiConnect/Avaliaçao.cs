using System;
using System.Collections.Generic;
using System.Text;

namespace TesteApiConnect
{
    class Avaliaçao
    {
        public int id { set; get; }

        public string data { set; get; }

        public string instrutor_email { set; get; }

        public string cliente_email { set; get; }

        public bool realizada { set; get; }

        public int altura { set; get; }

        public float peso { set; get; }

        public float massa_gorda { set; get; }

        public float massa_magra { set; get; }

        public float imc { set; get; }

        public int idade_metabolica { set; get; }


        public Avaliaçao(int id, string data, string instrutor_email, string cliente_email)
        {
            this.id = id;
            this.data = data;
            this.instrutor_email = instrutor_email;
            this.cliente_email = cliente_email;

            this.realizada = false;

            this.altura = 0;
            this.peso = 0;
            this.massa_gorda = 0;
            this.massa_magra = 0;
            this.imc = 0;
            this.idade_metabolica = 0;
        }

        public Avaliaçao(int id, string data, string instrutor_email, string cliente_email, 
            int altura, int peso, float massa_gorda, float massa_magra, float imc, int idade_metabolica)
        {
            this.id = id;
            this.data = data;
            this.instrutor_email = instrutor_email;
            this.cliente_email = cliente_email;

            this.realizada = true;

            this.altura = altura;
            this.peso = peso;
            this.massa_gorda = massa_gorda;
            this.massa_magra = massa_magra;
            this.imc = imc;
            this.idade_metabolica = idade_metabolica;
        }

        public void FoiRealizada(int altura, int peso, float massa_gorda, float massa_magra, float imc, int idade_metabolica)
        {
            this.realizada = true;

            this.altura = altura;
            this.peso = peso;
            this.massa_gorda = massa_gorda;
            this.massa_magra = massa_magra;
            this.imc = imc;
            this.idade_metabolica = idade_metabolica;
        }

        public string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("\nId: " + this.id + ";\n");
            r.Append("Data: " + this.data + ";\n");
            r.Append("Instrutor: " + this.instrutor_email + ";\n");
            r.Append("Cliente: " + this.cliente_email + ";\n");
            r.Append("Altura: " + this.altura + ";\n");
            r.Append("Peso: " + this.peso + ";\n");
            r.Append("Massa Gorda: " + this.massa_gorda + ";\n");
            r.Append("Massa Magra: " + this.massa_magra + ";\n");
            r.Append("IMC: " + this.imc + ";\n");
            r.Append("Idade Metabólica: " + this.idade_metabolica + ".\n");

            return r.ToString();
        }




    }
}
