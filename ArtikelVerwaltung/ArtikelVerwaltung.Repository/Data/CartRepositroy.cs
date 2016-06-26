
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.Repository.Data
{
	
	public class CartRepositroy : Repository, ICartRepository
	{
		public CartRepositroy(ArtikelVerwaltungEntities ctx) : base(ctx) { }

		public Cart Add(Cart cart)
		{
			return ctx.Cart.Add(cart);
		}

		public ArticleCart AddArticle(ArticleCart ac)
		{
			return ctx.ArticleCart.Add(ac);
		}

		public ArticleCart ArticleExisits(int cartID, int articleID)
		{
			var result = ctx.ArticleCart.Where(d => d.CartID == cartID && d.ArticleID == articleID);

			return (result.Count() > 0) ? result.First() : null;
		}

		public Cart Delete(Cart cart)
		{
			ctx.ArticleCart.RemoveRange(ctx.Cart.Find(cart.ID).ArticleCart);
			return ctx.Cart.Remove(cart);
		}

		public List<Article> GetArticle(int cartID)
		{
			List<ArticleCart> acList = ctx.Cart.Find(cartID).ArticleCart.ToList();

			List<Article> articles = new List<Article>();

			foreach(ArticleCart ac in acList)
			{
				articles.Add(new Article()
				{
					ID = ac.Article.ID,
					Name = ac.Article.Name,
					Description = ac.Article.Description,
					Price = ac.Article.Price
				});
			}

			return articles;
		}

		public Cart GetCartByID(int id)
		{
			return ctx.Cart.Find(id);
		}

		public List<Cart> GetCartByUser(User user)
		{
			return ctx.Cart.Where(d => d.UserID == user.ID).ToList();
		}

		public ArticleCart RemoveArticle(ArticleCart ac)
		{
			return ctx.ArticleCart.Remove(ac);
		}

		public Cart Update(Cart cart)
		{
			Cart original = GetCartByID(cart.ID);

			ctx.Entry(original).CurrentValues.SetValues(cart);

			return cart;
		}
	}
}
