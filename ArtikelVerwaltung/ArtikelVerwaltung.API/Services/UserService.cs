using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using System.Collections.Generic;

namespace ArtikelVerwaltung.API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly ICartRepository cartRepository;

        public UserService(IRepository repository)
        {
            userRepository = repository.GetUserRepository();
            cartRepository = repository.GetCartRepository();
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
                if (userRepository.SaveAll())
                {
                    return true;
                }
                else
                {
                    return false;
                }
                    
            }
            else
            {
                return false;
            }
        }

        public bool RemoveUserById(int id)
        {
            User user = userRepository.GetUserById(id);
            if (user != null)
            {
                if (user.Cart != null && user.Cart.Count > 0)
                {
                    RemoveCarts(user.Cart);
                }
                return userRepository.Delete(user);
            }
            else
            {
                return false;
            }
            
        }

        private void RemoveCarts(ICollection<Cart> list)
        {
            List<Cart> tempList = new List<Cart>(list);
            foreach (Cart cart in tempList)
            {
                cartRepository.Delete(cart);
            }
        }
    }
}