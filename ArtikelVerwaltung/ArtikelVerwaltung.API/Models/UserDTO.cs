using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
    public class UserDTO : RegisterDTO
    {
        public int ID { get; set; }

        public bool isAdmin { get; set; }

        public string Token { get; set; }
    }
}