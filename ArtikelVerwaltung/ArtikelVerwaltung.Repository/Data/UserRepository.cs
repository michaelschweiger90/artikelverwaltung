using System;
using System.Collections.Generic;
using System.Linq;
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

        public User FindUserByToken(string token)
        {
            return ctx.User.Where(d => d.Token == token).SingleOrDefault();
        }

        public List<User> GetAllUsers()
        {
            return ctx.User.ToList();
        }

        public bool Delete(User user)
        {
            ctx.User.Remove(user);
            return SaveAll();
        }
    }
}
