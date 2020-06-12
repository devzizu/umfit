using System;

namespace UMFit_WebAPI.Models.UMFit_LN.Aulas
{
    class Estatistica
    {
        public int idEstatistica {get;set;}
        public int num_vezes_feitas {get;set;}
        public string cliente_email {get;set;}
        public string nome_Aula {get;set;}

        public Estatistica (int idEstatistica, string nome_Aula, int num_vezes_feitas, string cliente_email)
        {
            this.idEstatistica = idEstatistica;
            this.nome_Aula = nome_Aula;
            this.num_vezes_feitas = num_vezes_feitas;
            this.cliente_email = cliente_email;
        }

        
    }
}
