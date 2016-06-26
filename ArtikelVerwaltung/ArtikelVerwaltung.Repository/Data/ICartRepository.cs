using ArtikelVerwaltung.Repository.EF;
using System.Collections.Generic;

namespace ArtikelVerwaltung.Repository.Data
{
	public interface ICartRepository
	{
		List<Cart> GetCartByUser(User user);
		Cart GetCartByID(int id);
		Cart Add(Cart cart);
		Cart Update(Cart cart);
		Cart Delete(Cart cart);

		ArticleCart AddArticle(ArticleCart ac);
		ArticleCart RemoveArticle(ArticleCart ac);
		ArticleCart ArticleExisits(int cartID, int articleID);
		List<Article> GetArticle(int cartID);

		bool SaveAll();
	}
}
