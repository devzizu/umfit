using System;
using System.Collections.Generic;

namespace TesteApiConnect
{
    class UMFitLN
    {
        static void Main(string[] args)
        {
            /*Console.WriteLine("LogIn...");

            Console.WriteLine("Enter the email:");
            string email = Console.ReadLine();

            Console.WriteLine("Users online: " + UtilizadorDAO.isUserOnline(email));

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

                    Console.WriteLine("Users online: " + UtilizadorDAO.isUserOnline(email));

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
                    Console.WriteLine(e.ToString());
                }
            }
            else
            {
                Console.WriteLine("Email e/ou password incorreto(s)!");
            }
            */

            List<Avaliaçao> listaAv = AvaliaçaoDAO.GetAvaliaçoesRealizada();

            int i = 0;

            while (i < listaAv.Count)
            {
                Console.WriteLine(listaAv[i].ToString());
                i++;
            }

            Console.WriteLine("Avaliações Totais: ");
            i = 0;

            listaAv = AvaliaçaoDAO.GetAvaliaçoes();

            while (i < listaAv.Count)
            {
                Console.WriteLine(listaAv[i].ToString());
                i++;
            }

        }
    }
}
