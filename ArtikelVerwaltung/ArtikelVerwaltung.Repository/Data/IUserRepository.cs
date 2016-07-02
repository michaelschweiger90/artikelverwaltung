using ArtikelVerwaltung.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtikelVerwaltung.Repository.Data
{
	public interface IUserRepository
	{
		User GetUserById(int id);

        User FindUserByEmail(string email);

        void Create(User user);

		bool SaveAll();
	}
}
