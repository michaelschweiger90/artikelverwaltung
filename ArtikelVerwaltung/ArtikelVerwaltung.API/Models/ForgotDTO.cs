using System.ComponentModel.DataAnnotations;

namespace ArtikelVerwaltung.API.Models
{
    public class ForgotDTO
    {
        [Required]
        [EmailAddress]
        public string MailAddress { get; set; }
        [Required]
        public string SecretAnswer { get; set; }
        [Required]
        public string SecretQuestion { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}