using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ArtikelVerwaltung.API.Models
{
    public class RegisterDTO : LoginDTO
    {
        [Required]
        [StringLength(255, MinimumLength = 5)]
        public string Name { get; set; }

        [Required]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string SecretQuestion { get; set; }

        [Required]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string SecretAnswer { get; set; }
    }
}