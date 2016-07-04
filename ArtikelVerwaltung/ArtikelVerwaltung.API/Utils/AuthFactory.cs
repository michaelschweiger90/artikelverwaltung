using System;
using System.Text;

namespace ArtikelVerwaltung.API.Utils
{
    public class AuthFactory
	{
        public static string encrptPasswordWithSHA256(string password)
        {
            byte[] plainTextBytes = UnicodeEncoding.Unicode.GetBytes(password);

            // Create hash for the pwd
            System.Security.Cryptography.HashAlgorithm hashAlgo = new System.Security.Cryptography.SHA256Managed();
            byte[] hash = hashAlgo.ComputeHash(plainTextBytes);

            return Convert.ToBase64String(hash);
        }

        public static string generateUniqueToken()
        {
            string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            return token;
        }
    }
}