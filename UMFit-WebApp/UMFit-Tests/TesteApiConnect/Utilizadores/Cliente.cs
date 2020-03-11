using System;
using System.Text;

namespace TesteApiConnect
{
    class Cliente : InterfaceUtilizador
    {
        public string email { get; set; }
        public int nif { get; set; }
        public string nome { get; set; }
        public int genero { get; set; }
        public string data_nascimento { get; set; }
        public string localidade { get; set; }
        public string categoria { get; set; }

        public Cliente(string email, int nif, string nome, int genero, 
                       string data_nascimento, string localidade, string categoria)
        {
            this.email = email;
            this.nif = nif;
            this.nome = nome;
            this.genero = genero;
            this.data_nascimento = data_nascimento;
            this.localidade = localidade;
            this.categoria = categoria;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("\nEmail: " + this.email + ";\n");
            r.Append("Nif: " + this.nif + ";\n");
            r.Append("Nome: " + this.nome + ";\n");
            r.Append("Genero: " + this.genero + ";\n");
            r.Append("Data nascimento: " + this.data_nascimento + ";\n");
            r.Append("Localidade: " + this.localidade + ";\n");
            r.Append("Categoria: " + this.categoria + ".\n");

            return r.ToString();
        }

        public string GetEmail()
        {
            return this.email;
        }
    }
}
