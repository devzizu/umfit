using System;
using System.Collections.Generic;
using System.Text;

namespace TesteApiConnect
{
    class Cliente : Utilizador
    {
        public string categoria;

        public Cliente(string email, string nome, string hashPass, int genero, 
                       string data_nascimento, string localidade)
        {
            this.email = email;
            this.nome = nome;
            this.hashPass = hashPass;
            this.genero = genero;
            this.data_nascimento = data_nascimento;
            this.localidade = localidade;
        }

        public override bool LogIn(string passInserida)
        {
            return passInserida.Equals(hashPass);
        }
    }
}
