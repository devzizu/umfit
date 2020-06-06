/*
 * Classe que tem todas as informações relativas à conexão da Base de Dados
 */

using MySql.Data.MySqlClient;

namespace UMFit_WebAPI.Models.Data
{
    public class DataBaseConnector
    {
        /*
         * Variáveis que permitem o acesso à Base de Dados localhost
         * Possibilitam depois a conexão a esta Base de Dados
         */
        public static MySqlBaseConnectionStringBuilder builderLocalhost = new MySqlConnectionStringBuilder
        {
            Server = "umfit.mysql.database.azure.com",
            UserID = "api-access@umfit",
            Password = "Hc8Vv_S4wwxmtTGm5TVW",
            Database = "umfit_db",
            SslMode = MySqlSslMode.Required
          
            /*
            Server = "localhost",
            UserID = "UMFit",
            Password = "umfitli4",
            Database = "UMFit_DB"
            */
        };
    }
}
