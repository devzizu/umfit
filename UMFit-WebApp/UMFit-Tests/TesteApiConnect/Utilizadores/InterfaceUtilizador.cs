using MySql.Data.MySqlClient;

namespace TesteApiConnect
{
    interface InterfaceUtilizador
    {
        public string GetEmail();

        public string ToString();

        public string ToSql(string hashPass);

        public void IniParamSql(MySqlCommand command);

        public string GetLocalidade();
    }
}
