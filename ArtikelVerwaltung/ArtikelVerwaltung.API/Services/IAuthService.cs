using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.API.Services
{
    interface IAuthService
    {
        User AuthenticateByPassword(string email, string password);

        User AuthoriseUserByTokenAndId(int userId, string token);

        bool ExistsUser(string mailAddress);

        void SaveUser(User user);

        bool RenewPasswordBySecrets(string email, string secretQuestion, string secretAnswer, string newPassword);

        bool LogoutUser(string token);
    }
}
