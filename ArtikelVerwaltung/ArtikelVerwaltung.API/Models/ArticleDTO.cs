using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
	public class ArticleDTO
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public double Price { get; set; }

		public List<ArticleCartDTO> Carts { get; set; }
	}
}