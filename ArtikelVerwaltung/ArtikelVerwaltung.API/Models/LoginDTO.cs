using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
    public class LoginDTO
    {
        [Required]
        [EmailAddress]
        public string MailAddress { get; set; }

        [Required]
        [JsonIgnore]
        [StringLength(255, MinimumLength = 8)]
        public string Password { get; set; }
    }
}