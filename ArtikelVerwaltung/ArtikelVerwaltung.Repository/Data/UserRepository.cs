using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.Repository.Data
{
	public class UserRepository : Repository, IUserRepository
	{
		public UserRepository(ArtikelVerwaltungEntities ctx) : base(ctx) { }

		public User getUserById(int id)
		{
			return ctx.User.Find(id);
		}
	}
}
