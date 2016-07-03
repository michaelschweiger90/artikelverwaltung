using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository userRepository;

        public AuthService(IUserRepository repository)
        {
            userRepository = repository;
        }

        public User Authenticate(string email, string password)
        {
            var user = userRepository.FindUserByEmail(email);
            if (user != null && user.ID > 0)
            {
                return user;
            }
            return null;
        }

        public bool ExistsUser(string mailAddress)
        {
            User existingUser = userRepository.FindUserByEmail(mailAddress);
            if (existingUser != null && existingUser.ID > 0)
            {
                return true;
            }
            return false;
        }

        public void SaveUser(User user)
        {
            userRepository.Create(user);
            userRepository.SaveAll();
        }
    }
}