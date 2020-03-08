using System;

using MySql.Data.MySqlClient;

namespace TesteApiConnect
{
    class Program
    {
        static void Main(string[] args)
        {
            MySqlBaseConnectionStringBuilder builder = new MySqlConnectionStringBuilder
            {
                Server = "localhost",
                UserID = "UMFit",
                Password = "umfitli4",
                Database = "UMFit_DB"
            };

            MySqlConnection connection = new MySqlConnection(builder.ToString());

            Console.WriteLine("Type the email from the user: ");
            string emailUser = Console.ReadLine();

            Console.WriteLine("Connecting to UMFit Data Base...");

            try
            {
                connection.Open();

                string userSQL = "select c.nome from Cliente c where c.email = " + "'" + emailUser + "'";
                MySqlCommand user = new MySqlCommand(userSQL, connection);

                object result = user.ExecuteScalar();

                if (user != null)
                {
                    string userName = Convert.ToString(result);

                    Console.WriteLine("Name of the user is: " + userName);
                    Console.WriteLine("Password: ");

                    string passWriten = Console.ReadLine();

                    string checkPassSQL = "select c.hashPass from Cliente c where c.nome = " + "'" + userName + "'";
                    MySqlCommand checkPass = new MySqlCommand(checkPassSQL, connection);
                    string passUser = Convert.ToString(checkPass.ExecuteScalar());

                    passWriten = CalculateHash.GetHashString(passWriten);

                    if(passUser.Equals(passWriten))
                    {
                        Console.WriteLine("Welcome...");
                    }
                    else
                    {
                        Console.WriteLine("Password is incorrect!");
                    }
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            Console.WriteLine("Closing connection...");

            connection.Close();
        }
    }
}
