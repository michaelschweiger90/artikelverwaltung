using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.API.Services;
using ArtikelVerwaltung.API.Utils;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace ArtikelVerwaltung.API.UnitTest.Services
{
    [TestClass]
    public class UserServiceTest
    {
        private static IUserRepository userRepository;
        private static IRepository repository;
        private static IUserService userService;
        private static ModelFactory modelFactory;
        private static User testUser1;
        private static User testUser2;

        [ClassInitialize]
        public static void Setup(TestContext context)
        {
            ArtikelVerwaltungEntities ctx = new ArtikelVerwaltungEntities();
            repository = new Repository.Data.Repository(ctx);
            userRepository = repository.GetUserRepository();

            testUser1 = new User();
            testUser1.Email = "testusermail1@test.co";
            testUser1.IsAdmin = true;
            testUser1.SecretAnswer = "test1answer";
            testUser1.SecretQuestion = "test2question";
            testUser1.Name = "testobject1";
            testUser1.Passwort = AuthUtil.EncrptPasswordWithSHA256("test1test");
            testUser2 = new User();
            testUser2.Email = "testusermail2@test.co";
            testUser2.IsAdmin = false;
            testUser2.SecretQuestion = "test2question";
            testUser2.SecretAnswer = "test2answer";
            testUser2.Name = "testobject2";
            testUser2.Passwort = AuthUtil.EncrptPasswordWithSHA256("test2test");

            userRepository.Create(testUser1);
            userRepository.Create(testUser2);
            userRepository.SaveAll();
            modelFactory = new ModelFactory();
        }

        [TestInitialize]
        public void BeforeEach()
        {
            userService = new UserService(repository);
        }

        [TestMethod]
        public void TestFindAllUsers()
        {
            Assert.IsInstanceOfType(userService.FindAllUsers(), typeof(List<User>));
            Assert.IsTrue(userService.FindAllUsers().Count > 0);
        }

        [TestMethod]
        public void TestFindUserById()
        {
            User user = userService.FindUserById(testUser1.ID);
            Assert.AreSame(user, testUser1);
        }

        [TestMethod]
        public void TestMakeUserAdminById()
        {
            Assert.IsTrue(userService.MakeUserAdminById(testUser2.ID));
            Assert.IsTrue(testUser2.IsAdmin);
        }

        [TestMethod]
        public void TestUpdateUser()
        {
            UserEditDTO userDTO = new UserEditDTO();
            userDTO.ID = testUser1.ID;
            userDTO.SecretQuestion = "testquestionchanged";
            Assert.IsTrue(userService.UpdateUser(userDTO));
            Assert.AreEqual<string>
                (testUser1.SecretQuestion, "testquestionchanged");
        }

        [TestMethod]
        public void TestRemoveAdminRightByUserId()
        {
            Assert.IsTrue(userService.RemoveAdminRightByUserId(testUser2.ID));
            Assert.IsFalse(testUser2.IsAdmin);
        }

        [TestMethod]
        public void TestExistsUserWithEmail()
        {
            Assert.IsTrue(userService.ExistsUserWithEmail(testUser1.Email, testUser1.ID));
        }

        [TestMethod]
        public void TestRemoveUserById()
        {
            Assert.IsTrue(userService.RemoveUserById(testUser2.ID));
        }

        [ClassCleanup]
        public static void TearDown()
        {
            User user1 = userRepository.FindUserByEmail(testUser1.Email);
            if (user1 != null)
            {
                userRepository.Delete(user1);
            }
            
            User user2 = userRepository.FindUserByEmail(testUser2.Email);
            if (user2 != null)
            {
                userRepository.Delete(user2);
            }

        }
    }
}
