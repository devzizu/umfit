
using System;
using UMFit_WebAPI.Models.Data.DAO;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores.Interfaces;

namespace UMFit_WebAPI.Models.UMFit_LN
{
    public class UMFit_LN
    {
        private readonly UtilizadorDAO utilizadoresDAO = new UtilizadorDAO();
        
        public UMFit_LN()
        {
            //empty constructor
        }

        public InterfaceUtilizador Authenticate(string userDtoEmail, string userDtoPassword)
        {
            return utilizadoresDAO.LogIn(userDtoEmail, userDtoPassword);
        }

        public int TypeUser(string email)
        {
            
            return utilizadoresDAO.TypeUser(email);
        }
    }
}