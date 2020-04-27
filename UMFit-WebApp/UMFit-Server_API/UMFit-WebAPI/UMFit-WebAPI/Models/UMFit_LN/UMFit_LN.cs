
using System.Collections.Generic;
using UMFit_WebAPI.Models.Data.DAO;
using UMFit_WebAPI.Models.UMFit_LN.Aulas;
using UMFit_WebAPI.Models.UMFit_LN.Avaliacao;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoAlimentar;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoTreino;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores.Interfaces;

namespace UMFit_WebAPI.Models.UMFit_LN
{
    public class UMFit_LN
    {
        private readonly UtilizadorDAO utilizadoresDAO = new UtilizadorDAO();
        private readonly AulaGrupoDAO aulaGrupoDAO = new AulaGrupoDAO();
        private readonly PlanoTreinoDAO planoTreinoDAO = new PlanoTreinoDAO();
        private readonly AvaliaçaoDAO avaliaçaoDAO = new AvaliaçaoDAO();
        private readonly PlanoAlimentarDAO planoAlimentarDao = new PlanoAlimentarDAO();
        
        public UMFit_LN()
        {
            //empty constructor
        }

        public InterfaceUtilizador Authenticate(string userDtoEmail, string userDtoPassword,string token)
        {
            return utilizadoresDAO.LogIn(userDtoEmail, userDtoPassword, token);
        }

        public int TypeUser(string email)
        {
            
            return utilizadoresDAO.TypeUser(email);
        }

        public bool isUserOnline(string token)
        {
            return utilizadoresDAO.IsUserOnline(token);
        }

        public void logout(string email)
        {
            utilizadoresDAO.LogOut(email);
        }
        
        /*
           Função que gera uma lista com parametros das avaliações do cliente em causa, associados à data da sua realização
           A função recebe o email do cliente, o parâmetro pretendido (peso, altura, massa_magra,...) e um bool para indicar
           que tipo de parâmetro é pretendido
        */
        public List<Registo_Avaliaçao> Generate_Reg(string emailCliente, string param, bool isCompCorp)
        {
            List<Avaliaçao> listA = AvaliaçaoDAO.GetAvalRCliente(emailCliente);

            List<Registo_Avaliaçao> reg = new List<Registo_Avaliaçao>();

            Registo_Avaliaçao r;

            for(int i = 0;  i < listA.Count; i++)
            {
                r = new Registo_Avaliaçao(listA[i].GetParam(param, isCompCorp), listA[i].data);
                reg.Add(r);
            }

            return reg;
        }

        public string getUserGivenToken(string validToken)
        {

            return utilizadoresDAO.GetUserGivenToken(validToken);
        }

        public InterfaceUtilizador GetUser(string email)
        {
            return utilizadoresDAO.GetUser(email);
        }

        public void RenovaToken(string token)
        {
            utilizadoresDAO.RenovaToken(token);
        }

        public bool createUser(InterfaceUtilizador user, int tipo, string passwordHash)
        {
            return utilizadoresDAO.InsertUser(user, tipo, passwordHash);   
        }

        public List<string> GetAllEmails()
        {
            return utilizadoresDAO.GetAllEmails();
        }

        public void RemoveUser(string email,char type)
        {
            UtilizadorDAO.RemoveUser(email,type);
        }

        public void UpdateUser(InterfaceUtilizador user, in int typeOfUser, string passHash)
        {
            utilizadoresDAO.UpdateUser(user, typeOfUser, passHash);
        }

        public void UpdateClientCat(string email, string cat)
        {
            utilizadoresDAO.UpdateCat(email, cat);
        }

        public List<string> GetUserEmails()
        {
            return utilizadoresDAO.GetUserEmails();
        }

        public List<AulaGrupo> GetAulasDia(string dia)
        {
            return aulaGrupoDAO.GetAulasDia(dia);
        }

        public bool AddPlano(PlanoTreino pt)
        {
            return planoTreinoDAO.InsertPlanoTreino(pt);
        }

        public Avaliaçao GetUltAvaliaçaoR(string email)
        {
         return avaliaçaoDAO.GetUltAvaliaçaoR( email);
        }
        
        public bool AddPlanoAlimentar(PlanoAlimentar pa)
        {
            return planoAlimentarDao.InsertPlanoAlimentar(pa);
        }
        
        public List<PlanoTreino> GetPlanosTreino(string mail)
        {
            return planoTreinoDAO.GetPlanoTreino(mail);
        }
    }
}