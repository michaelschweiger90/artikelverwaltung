using System.Security.Principal;

namespace ArtikelVerwaltung.API.Models
{
    public class BasicAuthenticationIdentity : GenericIdentity
    {
        public string Password { get; set; }

        public string Email { get; set; }
 
        public int UserId { get; set; }

        public bool IsAdmin { get; set; }

        public BasicAuthenticationIdentity(string email, string password)
            : base("", "Basic")
        {
            IsAdmin = false;
            Password = password;
            Email = email;
        }
    }
}