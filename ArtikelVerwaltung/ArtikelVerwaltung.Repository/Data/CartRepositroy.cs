
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
		private ArtikelVerwaltungEntities ctx;

		public CartRepositroy(ArtikelVerwaltungEntities ctx) : base(ctx)
		{
			this.ctx = ctx;
		}

		public Cart Add(Cart cart)
		{
			return ctx.Cart.Add(cart);
		}
		
		public Cart Delete(Cart cart)
		{
			return ctx.Cart.Remove(cart);
		}

		public Cart GetCartByID(int id)
		{
			return ctx.Cart.Find(id);
		}

		public List<Cart> GetCartByUser(User user)
		{
			return ctx.Cart.Where(d => d.UserID == user.ID).ToList();
		}

		public Cart Update(Cart cart)
		{
			Cart original = GetCartByID(cart.ID);

			ctx.Entry(original).CurrentValues.SetValues(cart);

			return cart;
		}
	}
}
