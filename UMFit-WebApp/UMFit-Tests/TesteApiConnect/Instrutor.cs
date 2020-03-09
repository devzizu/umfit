using System;
using System.Collections.Generic;
using System.Text;

namespace TesteApiConnect
{
    class Instrutor : InterfaceUtilizador
    {
        public string email;
        public int nif;
        public string nome;
        public int genero;
        public string data_nascimento;
        public string localidade;


        public Instrutor(string email, int nif, string nome, int genero,
               string data_nascimento, string localidade)
        {
            this.email = email;
            this.nif = nif;
            this.nome = nome;
            this.genero = genero;
            this.data_nascimento = data_nascimento;
            this.localidade = localidade;
        }
    }
}
