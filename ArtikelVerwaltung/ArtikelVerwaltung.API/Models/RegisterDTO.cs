﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
    public class RegisterDTO : LoginDTO
    {
        [Required]
        public string Name { get; set; }
    }
}