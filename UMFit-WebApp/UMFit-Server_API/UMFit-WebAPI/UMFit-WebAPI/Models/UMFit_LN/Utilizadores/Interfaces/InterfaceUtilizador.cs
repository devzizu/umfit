
using MySql.Data.MySqlClient;

namespace UMFit_WebAPI.Models.UMFit_LN.Utilizadores.Interfaces
{
    public interface InterfaceUtilizador
    {
        public string GetEmail();
        public string GetName();
        public string GetLocalidade();


        public string ToString();

        public string ToSql(string hashPass);

        public void IniParamSql(MySqlCommand command);

    }
}
