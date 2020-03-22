using MySql.Data.MySqlClient;


namespace TesteApiConnect
{
    class DataBaseConnector
    {
        public static MySqlBaseConnectionStringBuilder builder = new MySqlConnectionStringBuilder
        {
            Server = "localhost",
            UserID = "UMFit",
            Password = "umfitli4",
            Database = "UMFit_DB"
        };
    }
}
