using System;

using MySql.Data.MySqlClient;

namespace TesteApiConnect
{
    class UMFitLN
    {
        static void Main(string[] args)
        {
            Console.WriteLine("LogIn...");

            Console.WriteLine("Enter the email:");
            string email = Console.ReadLine();

            Console.WriteLine("Password:");
            string pass = Console.ReadLine();

            Cliente user = (Cliente) UtilizadorDAO.LogIn(email, pass);

            if(user != null )
            {
                Console.WriteLine(user.ToString());
            }
            else
            {
                Console.WriteLine("Email e/ou password incorreto!");
            }
        }
    }
}
