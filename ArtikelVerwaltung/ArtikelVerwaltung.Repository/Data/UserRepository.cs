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

		public User GetUserById(int id)
		{
			return ctx.User.Find(id);
		}

        public void Create(User user)
        {
            ctx.User.Add(user);
        }

        public User FindUserByEmail(string email)
        {
            return ctx.User.Where(d => d.Email == email).SingleOrDefault();
        }
    }
}
