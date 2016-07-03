using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.API.Services
{
    interface IAuthService
    {
        User Authenticate(string email, string password);

        bool ExistsUser(string mailAddress);

        void SaveUser(User user);
    }
}
