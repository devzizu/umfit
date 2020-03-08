using System;
using System.Collections.Generic;
using System.Text;

namespace TesteApiConnect
{
    abstract class Utilizador
    {
        public string email;
        public string nome;
        protected string hashPass;
        public int genero;
        public string data_nascimento;
        public string localidade;

        public abstract bool LogIn(string passInserida);

    }
}
