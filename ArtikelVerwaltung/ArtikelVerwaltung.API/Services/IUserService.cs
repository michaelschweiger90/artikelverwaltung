using ArtikelVerwaltung.Repository.EF;
using System.Collections.Generic;

namespace ArtikelVerwaltung.API.Services
{
    interface IUserService
    {
        List<User> FindAllUsers();

        bool MakeUserAdminById(int id);

        bool RemoveAdminRightByUserId(int id);
    }
}
