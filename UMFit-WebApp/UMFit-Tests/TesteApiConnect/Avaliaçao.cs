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

        public Composiçao_Corporal composiçao_Corporal;

        public Perimetros perimetros;


        // Cria uma Avaliação <Agendada> (tem os valores de composição corporal e perimetros a 0)
        public Avaliaçao(int id, string data, string instrutor_email, string cliente_email)
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
        public Avaliaçao(int id, string data, string instrutor_email, string cliente_email, 
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
            r.Append("Data: " + this.data + ";\n");
            r.Append("Instrutor: " + this.instrutor_email + ";\n");
            r.Append("Cliente: " + this.cliente_email + ";\n");
            r.Append(this.composiçao_Corporal.ToString());
            r.Append(this.perimetros.ToString());

            return r.ToString();
        }
    }
}
