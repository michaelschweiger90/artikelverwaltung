using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.Repository.Data
{
	interface ICartRepository
	{
		Cart getCartByUser(User user);
		Cart getCartByID(int id);
		Cart add(Cart cart);
		Cart update(Cart cart);
		Cart delete(Cart cart);
	}
}
