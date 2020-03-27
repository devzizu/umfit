/*
 * Classe que tem todas as informações relativas à conexão da Base de Dados
 */

using MySql.Data.MySqlClient;

namespace TesteApiConnect
{
    class DataBaseConnector
    {
        /*
         * Variáveis que permitem o acesso à Base de Dados localhost
         * Possibilitam depois a conexão a esta Base de Dados
         */
        public static MySqlBaseConnectionStringBuilder builderLocalhost = new MySqlConnectionStringBuilder
        {
            Server = "localhost",
            UserID = "UMFit",
            Password = "umfitli4",
            Database = "UMFit_DB"
        };
    }
}
