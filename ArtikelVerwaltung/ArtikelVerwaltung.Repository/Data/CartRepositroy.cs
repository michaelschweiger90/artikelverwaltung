
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.Repository.Data
{
	public class CartRepositroy : ICartRepository
	{
		private ArtikelVerwaltungEntities ctx;

		public CartRepositroy(ArtikelVerwaltungEntities ctx)
		{
			this.ctx = ctx;
		}

		public Cart add(Cart cart)
		{
			return ctx.Cart.Add(cart);
		}
		
		public Cart delete(Cart cart)
		{
			return ctx.Cart.Remove(cart);
		}

		public Cart getCartByID(int id)
		{
			return ctx.Cart.Find(id);
		}

		public Cart getCartByUser(User user)
		{
			List<Cart> results =  ctx.Cart.Where(d => d.UserID == user.ID).ToList();
			return results.First();
		}

		public Cart update(Cart cart)
		{
			Cart original = getCartByID(cart.ID);

			ctx.Entry(original).CurrentValues.SetValues(cart);

			return cart;
		}
	}
}
