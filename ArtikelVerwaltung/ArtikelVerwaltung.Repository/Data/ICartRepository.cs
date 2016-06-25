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

		bool SaveAll();
	}
}
