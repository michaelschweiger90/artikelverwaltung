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
		User getUserById(int id);

		bool SaveAll();
	}
}
