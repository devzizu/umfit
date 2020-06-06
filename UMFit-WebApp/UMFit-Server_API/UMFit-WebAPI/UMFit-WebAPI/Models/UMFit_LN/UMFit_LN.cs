
using System;
using System.Collections.Generic;
using UMFit_WebAPI.Models.Data.DAO;
using UMFit_WebAPI.Models.UMFit_LN.Aulas;
using UMFit_WebAPI.Models.UMFit_LN.Avaliacao;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoAlimentar;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoTreino;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores.Interfaces;

namespace UMFit_WebAPI.Models.UMFit_LN
{
    public class UMFit_LN
    {
        private static readonly UtilizadorDAO utilizadoresDAO = new UtilizadorDAO();
        private readonly AulaGrupoDAO aulaGrupoDAO = new AulaGrupoDAO();
        private readonly PlanoTreinoDAO planoTreinoDAO = new PlanoTreinoDAO();
        private readonly AvaliaçaoDAO avaliaçaoDAO = new AvaliaçaoDAO();
        private readonly PlanoAlimentarDAO planoAlimentarDao = new PlanoAlimentarDAO();
        
        public UMFit_LN()
        {
            //empty constructor
        }

        public InterfaceUtilizador Authenticate(string userDtoEmail, string userDtoPassword,string token)
        {    lock(utilizadoresDAO){
            return utilizadoresDAO.LogIn(userDtoEmail, userDtoPassword, token);
        }
        }

        public int TypeUser(string email)
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.TypeUser(email);
            }
        }

        public bool isUserOnline(string token)
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.IsUserOnline(token);
            }
        }

        public void logout(string email)
        {
            lock (utilizadoresDAO)
            {
                utilizadoresDAO.LogOut(email);
            }
        }

        /*
           Função que gera uma lista com parametros das avaliações do cliente em causa, associados à data da sua realização
           A função recebe o email do cliente, o parâmetro pretendido (peso, altura, massa_magra,...) e um bool para indicar
           que tipo de parâmetro é pretendido
        */
        public List<Registo_Avaliaçao> Generate_Reg(string emailCliente, string param, bool isCompCorp)
        {
            lock (utilizadoresDAO)
            {
                List<Avaliaçao> listA = avaliaçaoDAO.GetAvalRCliente(emailCliente);

                List<Registo_Avaliaçao> reg = new List<Registo_Avaliaçao>();

                Registo_Avaliaçao r;

                for (int i = 0; i < listA.Count; i++)
                {
                    r = new Registo_Avaliaçao(listA[i].GetParam(param, isCompCorp), listA[i].data);
                    reg.Add(r);
                }

                return reg;
            }
        }

        public string getUserGivenToken(string validToken)
        {
            lock (utilizadoresDAO)
            {

                return utilizadoresDAO.GetUserGivenToken(validToken);
            }
        }

        public InterfaceUtilizador GetUser(string email)
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.GetUser(email);
            }
        }

        public void RenovaToken(string token)
        {
            lock (utilizadoresDAO)
            {
                utilizadoresDAO.RenovaToken(token);
            }
        }

        public bool createUser(InterfaceUtilizador user, int tipo, string passwordHash)
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.InsertUser(user, tipo, passwordHash);
            }
        }

        public List<string> GetAllEmails()
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.GetAllEmails();
            }
        }

        public void RemoveUser(string email, char type)
        {
            lock (utilizadoresDAO)
            {
                UtilizadorDAO.RemoveUser(email, type);
            }
        }

        public void UpdateUser(InterfaceUtilizador user, in int typeOfUser, string passHash)
        {
            lock (utilizadoresDAO)
            {
                utilizadoresDAO.UpdateUser(user, typeOfUser, passHash);
            }
        }

        public void UpdateClientCat(string email, string cat)
        {
            lock (utilizadoresDAO)
            {
                utilizadoresDAO.UpdateCat(email, cat);
            }
        }

        public List<string> GetUserEmails()
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.GetUserEmails();
            }
        }

        public List<string> GetPremiumClientEmails()
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.GetClientesPremiumEmails();
            }
        }

        public List<AulaGrupo> GetAulasDia(string dia)
        {
            lock (utilizadoresDAO)
            {
                return aulaGrupoDAO.GetAulasDia(dia);
            }
        }

        public bool AddPlano(PlanoTreino pt)
        {
            lock (utilizadoresDAO)
            {
                return planoTreinoDAO.InsertPlanoTreino(pt);
            }
        }

        public Avaliaçao GetUltAvaliaçaoR(string email)
        {
            lock (utilizadoresDAO)
            {
                return avaliaçaoDAO.GetUltAvaliaçaoR(email);
            }
        }

        public bool AddPlanoAlimentar(PlanoAlimentar pa)
        {
            lock (utilizadoresDAO)
            {
                return planoAlimentarDao.InsertPlanoAlimentar(pa);
            }
        }

        public List<PlanoTreino> GetPlanosTreino(string mail)
        {
            lock (utilizadoresDAO)
            {
                return planoTreinoDAO.GetPlanoTreino(mail);
            }
        }

        public bool AddAvaliacao(Avaliaçao av)
        {
            lock (utilizadoresDAO)
            {
                return avaliaçaoDAO.UpdateAvaliaçaoRealizada(av);
            }
        }

        public List<PlanoAlimentar> GetPlanosAlimentares(string mail)
        {
            lock (utilizadoresDAO)
            {
                return planoAlimentarDao.GetPlanoAlimentar(mail);
            }
        }

        public List<string> GetInstrutorEmails()
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.GetInstrutorEmails();
            }
        }

        public List<Avaliaçao> GetAvaAgendCli(string emailCliente)
        {
            lock (utilizadoresDAO)
            {
                return avaliaçaoDAO.GetAvaAgendCli(emailCliente);

            }
        }

        public Dictionary<string, string> GetAllEmailsNames(string tipo)
        {
            lock (utilizadoresDAO)
            {
                return utilizadoresDAO.GetAllEmailsNames(tipo);
            }
        }

        public bool agendarAvaliaçao(Avaliaçao av)
        {
            lock (utilizadoresDAO)
            {
                return avaliaçaoDAO.InsertAvaliaçao(av);
            }
        }

        public List<Avaliaçao> GetAvaAgendInst(string email)
        {
            lock (utilizadoresDAO)
            {
                return avaliaçaoDAO.GetAvalInstr(email, 'A');
            }
        }

        public AulaGrupo GetAulaID(int id)
        {
            lock (utilizadoresDAO)
            {
                return aulaGrupoDAO.GetAulaID(id);
            }
        }

        public bool MarcarAula(ClienteAula ca)
        {
            lock (utilizadoresDAO)
            {
                return aulaGrupoDAO.MarcarAula(ca);
            }
        }

        public List<int> GetAulasCliente(string mail)
        {
            lock (utilizadoresDAO)
            {
                return aulaGrupoDAO.GetAulasCliente(mail);
            }
        }

        public bool DesmarcarAula(int id, string mail)
        {
            lock (utilizadoresDAO)
            {
                return aulaGrupoDAO.DesmarcárAula(id, mail);
            }
        }

        public bool EditarAula(AulaGrupo ag, in int agId)
        {
            lock (utilizadoresDAO)
            {
                return aulaGrupoDAO.UpdateAulaGrupo(ag, agId);
            }
        }

        public List<string> getClientesAula(string idAula)
        {
            lock (utilizadoresDAO)
            {
                return aulaGrupoDAO.GetAlunos(idAula);
            }
        }
    }
}