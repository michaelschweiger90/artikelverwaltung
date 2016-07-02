using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
    public class UserDTO
    {
        public int ID { get; set; }
        [Required]
        [EmailAddress]
        public string MailAddress { get; set; }
        [Required]
        [StringLength(128, MinimumLength = 8)]
        public string Password { get; set; }
    }
}