using ArtikelVerwaltung.Repository.EF;
using System.Collections.Generic;

namespace ArtikelVerwaltung.Repository.Data
{
    public interface IUserRepository
	{
        List<User> GetAllUsers();

		User GetUserById(int id);

        User FindUserByEmail(string email);

        User FindUserByToken(string token);

        void Create(User user);

		bool SaveAll();

        bool Delete(User user);
	}
}
