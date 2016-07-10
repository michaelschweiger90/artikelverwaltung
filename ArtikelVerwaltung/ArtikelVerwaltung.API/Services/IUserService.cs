﻿using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.Repository.EF;
using System.Collections.Generic;

namespace ArtikelVerwaltung.API.Services
{
    interface IUserService
    {
        List<User> FindAllUsers();

        User FindUserById(int id);

        bool MakeUserAdminById(int id);

        bool UpdateUser(AdminEditUserDTO userDTO);

        bool RemoveAdminRightByUserId(int id);

        bool RemoveUserById(int id);
    }
}
