using System.Security.Principal;

namespace ArtikelVerwaltung.API.Models
{
    public class TokenAuthenticationIdentity : GenericIdentity
    {
        public string Token { get; set; }

        public string Email { get; set; }
 
        public int UserId { get; set; }

        public bool IsAdmin { get; set; }

        public TokenAuthenticationIdentity(int userID, string token)
            : base("", "Bearer")
        {
            IsAdmin = false;
            UserId = userID;
            Token = token;
        }
    }
}