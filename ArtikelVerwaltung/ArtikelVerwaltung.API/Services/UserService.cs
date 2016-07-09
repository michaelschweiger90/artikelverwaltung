using System;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using ArtikelVerwaltung.API.Utils;
using System.Collections.Generic;

namespace ArtikelVerwaltung.API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IRepository repository)
        {
            userRepository = repository.GetUserRepository();
        }

        public List<User> FindAllUsers()
        {
            return userRepository.GetAllUsers();
        }

        public bool MakeUserAdminById(int id)
        {
            User user = userRepository.GetUserById(id);
            if (user != null)
            {
                user.IsAdmin = true;
                userRepository.SaveAll();
                return true;
            } else
            {
                return false;
            }
        }

        public bool RemoveAdminRightByUserId(int id)
        {
            User user = userRepository.GetUserById(id);
            if (user != null)
            {
                user.IsAdmin = false;
                userRepository.SaveAll();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}