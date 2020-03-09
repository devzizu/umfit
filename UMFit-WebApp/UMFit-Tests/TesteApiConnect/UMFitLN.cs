using System;

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

                Console.WriteLine("Users online: " + UtilizadorDAO.GetUtilizadoresOnline());
            }
            else
            {
                Console.WriteLine("Email e/ou password incorreto!");
            }

            Console.WriteLine("Want to LogOut? [yes/no]");
            string res = Console.ReadLine();

            if(res.Equals("yes"))
            {
                UtilizadorDAO.LogOut(email);
                Console.WriteLine("Goodbye...");
            }

        }
    }
}
