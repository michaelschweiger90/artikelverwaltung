using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ArtikelVerwaltung.API.Models
{
    public class LoginDTO
    {
        [Required]
        [EmailAddress]
        public string MailAddress { get; set; }

        [Required]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        [StringLength(255, MinimumLength = 8)]
        public string Password { get; set; }
    }
}