using Newtonsoft.Json;

namespace ArtikelVerwaltung.API.Models
{
    public class UserDTO : RegisterDTO
    {
        public int ID { get; set; }

        public bool isAdmin { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Token { get; set; }
    }
}