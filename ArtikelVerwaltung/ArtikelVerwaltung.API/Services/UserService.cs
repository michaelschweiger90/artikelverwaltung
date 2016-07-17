using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using System.Collections.Generic;
using ArtikelVerwaltung.API.Models;
using System;
using ArtikelVerwaltung.API.Utils;

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
                return userRepository.SaveAll();
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
                return userRepository.SaveAll();
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

        public bool UpdateUser(UserEditDTO userDTO)
        {
            User user = userRepository.GetUserById(userDTO.ID);
            if (user != null)
            {
                bool isChanged = false;

                if (userDTO.Name != null && userDTO.Name != "" &&! user.Name.Equals(userDTO.Name))
                {
                    isChanged = true;
                    user.Name = userDTO.Name;
                }

                if (userDTO.MailAddress != null && userDTO.MailAddress != "" && ! user.Email.Equals(userDTO.MailAddress))
                {
                    isChanged = true;
                    user.Email = userDTO.MailAddress;
                }

                if (userDTO.SecretAnswer != null && userDTO.SecretAnswer != "" && ! user.SecretAnswer.Equals(userDTO.SecretAnswer))
                {
                    isChanged = true;
                    user.SecretAnswer = userDTO.SecretAnswer;
                }
                if (userDTO.SecretQuestion !=null && userDTO.SecretQuestion != "" && !user.SecretQuestion.Equals(userDTO.SecretQuestion))
                {
                    isChanged = true;
                    user.SecretQuestion = userDTO.SecretQuestion;
                }


                if (userDTO.NewPassword != null && userDTO.NewPassword != "" && !user.Passwort.Equals(AuthUtil.EncrptPasswordWithSHA256(userDTO.NewPassword)))
                {
                    isChanged = true;
                    user.Passwort = AuthUtil.EncrptPasswordWithSHA256(userDTO.NewPassword);
                }

                if (isChanged)
                {
                    return userRepository.SaveAll();
                }
                else
                {
                    return true;
                }
                
            }
            else
            {
                return false;
            }
        }

        public User FindUserById(int id)
        {
            return userRepository.GetUserById(id);
        }

        public bool ExistsUserWithEmail(string email, int ID)
        {
            User user = userRepository.FindUserByEmail(email);
            if (user != null)
            {
                return user.ID == ID; ;
            }
            else
            {
                return false;
            }
        }
    }
}