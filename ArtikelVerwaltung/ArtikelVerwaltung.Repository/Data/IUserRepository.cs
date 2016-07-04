using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.Repository.Data
{
    public interface IUserRepository
	{
		User GetUserById(int id);

        User FindUserByEmail(string email);

        User FindUserByToken(string token);

        void Create(User user);

		bool SaveAll();
	}
}
