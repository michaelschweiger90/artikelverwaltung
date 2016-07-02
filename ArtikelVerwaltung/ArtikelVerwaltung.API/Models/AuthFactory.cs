using ArtikelVerwaltung.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace ArtikelVerwaltung.API.Models
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
    }
}