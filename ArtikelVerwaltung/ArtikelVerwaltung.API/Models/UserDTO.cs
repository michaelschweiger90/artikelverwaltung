using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
    public class UserDTO : RegisterDTO
    {
        [Required]
        public int ID { get; set; }

        public bool isAdmin { get; set; }
        [Required]
        public string Token { get; set; }
    }
}