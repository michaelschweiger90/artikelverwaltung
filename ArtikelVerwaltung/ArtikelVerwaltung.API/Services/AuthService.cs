using System;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using ArtikelVerwaltung.API.Utils;

namespace ArtikelVerwaltung.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository userRepository;

        public AuthService(IUserRepository repository)
        {
            userRepository = repository;
        }

        public User AuthenticateByPassword(string email, string password)
        {
            var user = userRepository.FindUserByEmail(email);
            string decryptedPassword = AuthFactory.EncrptPasswordWithSHA256(password);

            if (user != null && user.ID > 0 && decryptedPassword.Equals(user.Passwort))
            {
                user.Token = AuthFactory.GenerateUniqueToken();
                user.TokenDate = DateTime.Now;
                userRepository.SaveAll();
                return user;
            }
            return null;
        }

        public bool ExistsUser(string mailAddress)
        {
            User existingUser = userRepository.FindUserByEmail(mailAddress);
            return existingUser != null && existingUser.ID > 0;
        }

        public bool RenewPasswordBySecrets(string email, string secretQuestion, string secretAnswer, string newPassword)
        {
            User user = userRepository.FindUserByEmail(email);

            if (user !=null && 
                (user.SecretQuestion.Equals(secretQuestion) && user.SecretAnswer.Equals(secretAnswer)))
            {
                user.Passwort = AuthFactory.EncrptPasswordWithSHA256(newPassword);
                userRepository.SaveAll();
                return true;
            }
            return false;
        }

        public void SaveUser(User user)
        {
            userRepository.Create(user);
            userRepository.SaveAll();
        }

        public User AuthoriseUserByTokenAndId(int userId, string token)
        {
            User user = userRepository.FindUserByToken(token);

            if (user != null && user.ID == userId)
            {
                DateTime tokenDate = user.TokenDate.GetValueOrDefault();
                DateTime now = DateTime.Now;
                
                if (tokenDate != null && (now.Subtract(tokenDate) <= TimeSpan.FromHours(1)))
                {
                    return user;
                }

                return null;
                
            } else
            {
                return null;
            }
        }

        public bool LogoutUser(string token)
        {
            User user = userRepository.FindUserByToken(token);
            if (user != null)
            {
                user.Token = "";
                user.TokenDate = null;
                userRepository.SaveAll();
                return true;
            }
            return false;
        }
    }
}