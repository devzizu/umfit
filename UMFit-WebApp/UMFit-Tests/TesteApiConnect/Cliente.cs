using System;
using System.Text;

namespace TesteApiConnect
{
    class Cliente : InterfaceUtilizador
    {
        public string email;
        public int nif;
        public string nome;
        public int genero;
        public string data_nascimento;
        public string localidade;
        public string categoria;

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

        public string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append(this.email + ", ");
            r.Append(this.nif + ", ");
            r.Append(this.nome + ", ");
            r.Append(this.genero + ", ");
            r.Append(this.data_nascimento + ", ");
            r.Append(this.localidade + ", ");
            r.Append(this.categoria + ".");

            return r.ToString();
        }
    }
}
