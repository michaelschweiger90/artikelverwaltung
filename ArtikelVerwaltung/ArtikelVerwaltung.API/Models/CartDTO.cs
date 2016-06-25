using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
	public class CartDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int UserID { get; set; }
		
	}
}