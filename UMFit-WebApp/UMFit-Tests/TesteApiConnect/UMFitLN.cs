using System;
using System.Collections.Generic;

namespace TesteApiConnect
{
    class UMFitLN
    {
        public static Dictionary<string, InterfaceUtilizador> utilizadoresOn;
        
        static void Main(string[] args)
        {
            utilizadoresOn = new Dictionary<string, InterfaceUtilizador>();

            Console.WriteLine("LogIn...");

            Console.WriteLine("Enter the email:");
            string email = Console.ReadLine();

            Console.WriteLine("Password:");
            string pass = Console.ReadLine();

            int typeUser = UtilizadorDAO.TypeUser(email);

            InterfaceUtilizador user = null;

            if (typeUser != -1)
            { 
                switch (typeUser)
                {
                    case 0:
                        {
                            user = (Cliente)UtilizadorDAO.LogIn(email, pass);
                            break;
                        }
                    case 1:
                        {
                            user = (Instrutor)UtilizadorDAO.LogIn(email, pass);
                            break;
                        }
                    case 2:
                        {
                            user = (Rececionista)UtilizadorDAO.LogIn(email, pass);
                            break;
                        }
                }

                try
                {
                    Console.WriteLine(user.ToString());

                    utilizadoresOn.Add(user.GetEmail(), user);

                    Console.WriteLine("Users online: " + UtilizadorDAO.GetUtilizadoresOnline());

                    Console.WriteLine("Want to LogOut? [yes/no]");
                    string res = Console.ReadLine();

                    if (res.Equals("yes"))
                    {
                        UtilizadorDAO.LogOut(email);
                        Console.WriteLine("Goodbye...");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Email e/ou password incorreto(s)!");
                }
            }
            else
            {
                Console.WriteLine("Email e/ou password incorreto(s)!");
            }
        }
    }
}
