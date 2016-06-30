using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtikelVerwaltung.Repository.Data
{
	public interface IRepository
	{
		CartRepositroy GetCartRepository();
		UserRepository GetUserRepository();
		ArticleRepository GetArticleRepository();

		bool SaveAll();
	}
}
