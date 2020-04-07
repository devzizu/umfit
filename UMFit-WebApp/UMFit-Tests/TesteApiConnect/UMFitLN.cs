using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

namespace TesteApiConnect
{
    class UMFitLN
    {
        /* Função que gera uma lista com parametros das avaliações do cliente em causa, associados à data da sua realização
           A função recebe o email do cliente, o parâmetro pretendido (peso, altura, massa_magra,...) e um bool para indicar
           que tipo de parâmetro é pretendido
        */
        public static List<Registo_Avaliaçao> Generate_Reg(string emailCliente, string param, bool isCompCorp)
        {
            List<Avaliaçao> listA = AvaliaçaoDAO.GetAvalRCliente(emailCliente);

            List<Registo_Avaliaçao> reg = new List<Registo_Avaliaçao>();

            Registo_Avaliaçao r;

            for(int i = 0;  i < listA.Count; i++)
            {
                r = new Registo_Avaliaçao(listA[i].GetParam(param, isCompCorp), listA[i].data);
                reg.Add(r);
            }

            return reg;
        }
        


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
            
            List<Avaliaçao> listaAv = AvaliaçaoDAO.GetAvaliaçoesRealizadas();

            int i = 0;
            /*
            while (i < listaAv.Count)
            {
                Console.WriteLine(listaAv[i].ToString());
                i++;
            }

            Console.WriteLine("Avaliações Totais: ");
            i = 0;

            listaAv = AvaliaçaoDAO.GetTodasAvaliaçoes();

            while (i < listaAv.Count)
            {
                Console.WriteLine(listaAv[i].ToString());
                i++;
            }
            
            Avaliaçao av = new Avaliaçao(1010101010, "2020-09-09 09:09:00", "a85227@alunos.uminho.pt", "a83719@alunos.uminho.pt");
            AvaliaçaoDAO.insertAvaliaçao(av);
            */
            listaAv = AvaliaçaoDAO.GetAvalRCliente("a83719@alunos.uminho.pt");
            i = 0;
            while (i < listaAv.Count)
            {
                Console.WriteLine(listaAv[i].ToString());
                i++;
            }
            
            DateTime date = DateTime.Parse("2020-09-19");

            //Console.WriteLine(date.ToString("yyyy-MM-dd HH:mm:ss"));

            Cliente user = new Cliente("test", 99, "NOVO nome",
        0, date, "Braga", "Standard");


            //UtilizadorDAO.UpdateUser(user, 0, "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08");


            //UtilizadorDAO.TestSqlInject(99121212, "TesteWELELEL");

            //UtilizadorDAO.TestSqlInject("test");

            /*InterfaceUtilizador u = UtilizadorDAO.LogIn("test", "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08", "token");
            if (u != null)
                Console.WriteLine(u.ToString());
            else
                Console.WriteLine("Pass errada");
              */  

            /*List<AulaGrupo> l = AulaGrupoDAO.GetAulasDia("Segunda");

            for(i = 0; i < l.Count; i++)
            {
                Console.WriteLine(l[i].ToString());
            }
            */
        }
    }
}
