using ArtikelVerwaltung.API.Services;
using ArtikelVerwaltung.API.Utils;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ArtikelVerwaltung.API.UnitTest.Services
{
    [TestClass]
    public class AuthServiceTest
    {
        private static IUserRepository userRepository;
        private static IRepository repository;
        private IAuthService authService;
        private static User testUser;

        [ClassInitialize]
        public static void Setup(TestContext context)
        {
            ArtikelVerwaltungEntities ctx = new ArtikelVerwaltungEntities();
            repository = new Repository.Data.Repository(ctx);
            userRepository = repository.GetUserRepository();
        }

        [TestInitialize]
        public void BeforeEach()
        {
            testUser = new User();
            testUser.Email = "testusermail@test.co";
            testUser.IsAdmin = true;
            testUser.Passwort = AuthUtil.EncrptPasswordWithSHA256("testtest");
            testUser.SecretAnswer = "testanswer";
            testUser.SecretQuestion = "testquestion";
            testUser.Name = "testuser";
            authService = new AuthService(repository);
        }

        [TestMethod]
        public void TestSaveUser()
        {
            authService.SaveUser(testUser);
            Assert.IsNotNull(testUser.ID);
        }

        [TestMethod]
        public void TestExistUser()
        {
            Assert.IsTrue(authService.ExistsUser(testUser.Email));
        }

        [TestMethod]
        public void TestAuthenticateByPassword()
        {
            User user = authService.AuthenticateByPassword(testUser.Email, "testtest");
            Assert.IsNotNull(user);
            Assert.IsNotNull(user.Token);
            Assert.IsNotNull(user.TokenDate);
        }

        [TestMethod]
        public void TestAuthoriseUserByTokenAndId()
        {
            User user = userRepository.FindUserByEmail(testUser.Email);
            Assert.IsNotNull(user);
            Assert.IsNotNull(authService.AuthoriseUserByTokenAndId(user.ID, user.Token));
        }

        [TestMethod]
        public void TestRenewPasswordBySecrets()
        {
            Assert.IsTrue(authService.RenewPasswordBySecrets(testUser.Email, testUser.SecretQuestion, testUser.SecretAnswer, "newpassword"));
            User user = userRepository.FindUserByEmail(testUser.Email);
            Assert.IsNotNull(user);
            Assert.AreEqual<string>(AuthUtil.EncrptPasswordWithSHA256("newpassword"), user.Passwort);
        }

        [TestMethod]
        public void TestLogoutUser()
        {
            User user = userRepository.FindUserByEmail(testUser.Email);
            Assert.IsNotNull(user);
            Assert.IsTrue(authService.LogoutUser(user.Token));
            Assert.AreEqual<string>("", user.Token);
            Assert.IsNull(user.TokenDate);
        }

        [ClassCleanup]
        public static void TearDown()
        {
            User user = userRepository.FindUserByEmail(testUser.Email);
            if (user != null)
            {
                userRepository.Delete(user);
            }
        }
    }
}
