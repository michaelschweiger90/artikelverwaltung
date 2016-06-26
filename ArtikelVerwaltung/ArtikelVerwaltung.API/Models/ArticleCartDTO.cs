using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
	public class ArticleCartDTO
	{
		public int Id { get; set; }
		public int ArticleID { get; set; }
		public int CartID { get; set; }
	}
}