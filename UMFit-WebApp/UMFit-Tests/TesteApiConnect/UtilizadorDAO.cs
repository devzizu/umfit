using System;
using System.Collections.Generic;
using System.Text;

namespace TesteApiConnect
{
    class UtilizadorDAO
    {
        public Dictionary<string, Utilizador> utilizadores;

        public UtilizadorDAO(Dictionary<string, Utilizador> utilizadores)
        {
            Dictionary<string, Utilizador> users = new Dictionary<string, Utilizador>();

            for(int i = 0; i < utilizadores.Count; i++)
            {
               
                // users.Add(utilizadores.Keys[i], utilizadores[i]); 
            }
        }
    }
}
