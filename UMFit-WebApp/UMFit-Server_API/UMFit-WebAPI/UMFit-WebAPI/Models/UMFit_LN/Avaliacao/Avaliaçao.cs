/*
 * Classe que implementa uma Avaliação, seja ela Agendada ou realizada
 */

using System;
using System.Text;

namespace UMFit_WebAPI.Models.UMFit_LN.Avaliacao
{
    public class Avaliaçao
    {
       public int id { set; get; }

        public DateTime data { set; get; }

        public string instrutor_email { set; get; }

        public string cliente_email { set; get; }

        public bool realizada { set; get; }

        public Composiçao_Corporal composiçao_Corporal;

        public Perimetros perimetros;


        // Cria uma Avaliação <Agendada> (tem os valores de composição corporal e perimetros a 0)
        public Avaliaçao(int id, DateTime data, string instrutor_email, string cliente_email)
        {
            this.id = id;
            this.data = data;
            this.instrutor_email = instrutor_email;
            this.cliente_email = cliente_email;

            this.realizada = false;

            this.composiçao_Corporal = new Composiçao_Corporal();
            this.perimetros = new Perimetros();
        }

        // Cria uma Avaliação <Realizada> 
        public Avaliaçao(int id, DateTime data, string instrutor_email, string cliente_email, 
            Composiçao_Corporal cc, Perimetros p)
        {
            this.id = id;
            this.data = data;
            this.instrutor_email = instrutor_email;
            this.cliente_email = cliente_email;

            this.realizada = true;

            this.composiçao_Corporal = cc;
            this.perimetros = p;
        }

        // Faz update de uma Avaliação agendada para uma Realizada
        public void FoiRealizada(Composiçao_Corporal cc, Perimetros p)
        {
            this.realizada = true;
            this.composiçao_Corporal = cc;
            this.perimetros = p;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("\nId: " + this.id + ";\n");
            r.Append("Data: " + this.data.ToString() + ";\n");
            r.Append("Instrutor: " + this.instrutor_email + ";\n");
            r.Append("Cliente: " + this.cliente_email + ";\n");
            r.Append(this.composiçao_Corporal.ToString());
            r.Append(this.perimetros.ToString());

            return r.ToString();
        }

        /*
         * Retorna o parâmetro(peso, altura, imc, ...) consoante a string que recebe
         * Esta string tem o mesmo nome que a variável
         * Recebe também um bool para facilitar a pesquisa caso seja um Perímetro ou Composição Corporal
         */
        public float GetParam(string param, bool isCompCorp)
        {
            float r = 0;

            if (isCompCorp)
            {
                switch (param)
                {
                    case "altura":
                        r = this.composiçao_Corporal.altura;
                        break;
                    case "peso":
                        r = this.composiçao_Corporal.peso;
                        break;
                    case "massa_gorda":
                        r = this.composiçao_Corporal.massa_gorda;
                        break;
                    case "massa_magra":
                        r = this.composiçao_Corporal.massa_magra;
                        break;
                    case "imc":
                        r = this.composiçao_Corporal.imc;
                        break;
                    case "idade_metabolica":
                        r = this.composiçao_Corporal.idade_metabolica;
                        break;
                }
            }
            else
            {
                switch (param)
                {
                    case "cintura":
                        r = this.perimetros.cintura;
                        break;
                    case "abdomen":
                        r = this.perimetros.abdomen;
                        break;
                    case "ombro":
                        r = this.perimetros.ombro;
                        break;
                    case "torax":
                        r = this.perimetros.torax;
                        break;
                    case "braço_dir":
                        r = this.perimetros.braço_dir;
                        break;
                    case "braço_esq":
                        r = this.perimetros.braço_esq;
                        break;
                    case "coxa_dir":
                        r = this.perimetros.coxa_dir;
                        break;
                    case "coxa_esq":
                        r = this.perimetros.coxa_esq;
                        break;
                    case "gemeo_dir":
                        r = this.perimetros.gemeo_dir;
                        break;
                    case "gemeo_esq":
                        r = this.perimetros.gemeo_esq;
                        break;
                    case "antebraço_dir":
                        r = this.perimetros.antebraço_dir;
                        break;
                    case "antebraço_esq":
                        r = this.perimetros.antebraço_esq;
                        break;
                }
            }
            return r;
        }
    }
}
