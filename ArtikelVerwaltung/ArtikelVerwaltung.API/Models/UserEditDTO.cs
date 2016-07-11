using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ArtikelVerwaltung.API.Models
{
    public class UserEditDTO
    {
        [Required]
        [EmailAddress]
        public string MailAddress { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int ID { get; set; }

        [Required]
        public string SecretAnswer { get; set; }

        [Required]
        public string SecretQuestion { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string NewPassword { get; set; }
    }
}