using System;
using System.Security.Cryptography;
using System.Text;

namespace TestingHash
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter the password to encrypt: ");

            string input = Console.ReadLine();
            string passDataBase = GetHashString("hello");

            string hashInput = GetHashString(input);

            Console.WriteLine(hashInput);

            Console.WriteLine("The password is " + (hashInput.Equals(passDataBase) ? "correct" : "incorrect") + ".");
        }
        public static byte[] GetHash(string inputString)
        {
            HashAlgorithm algorithm = SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }
        public static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
    }
}