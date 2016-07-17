using ArtikelVerwaltung.API.Utils;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;

namespace ArtikelVerwaltungRepository.UnitTest.Data
{
    [TestClass]
    public class UserRepositoryTest
    {
        private static IRepository repository;
        private static IUserRepository userRepository;
        private static User user1, user2;

        [ClassInitialize]
        public static void Setup(TestContext context)
        {
            ArtikelVerwaltungEntities ctx = new ArtikelVerwaltungEntities();
            repository = new Repository(ctx);
            userRepository = repository.GetUserRepository();

            user1 = new User();
            user1.Name = "testuser1";
            user1.Email = "testuser1mail@test.co";
            user1.IsAdmin = true;
            user1.SecretAnswer = "testuser1answer";
            user1.SecretQuestion = "testuser1question";
            user1.Passwort = AuthUtil.EncrptPasswordWithSHA256("testtest");
            user1.Token = AuthUtil.GenerateUniqueToken();
            user1.TokenDate = DateTime.Now;

            user2 = new User();
            user2.Name = "testuser2";
            user2.Email = "testuser2mail@test.co";
            user2.IsAdmin = false;
            user2.SecretAnswer = "testuser2answer";
            user2.SecretQuestion = "testuser2question";
            user2.Passwort = AuthUtil.EncrptPasswordWithSHA256("testtest");
        }

        [TestMethod]
        public void TestCreateAndSaveAll()
        {
            userRepository.Create(user1);
            Assert.IsTrue(user1.ID == 0);
            
            userRepository.Create(user2);
            Assert.IsTrue(user2.ID == 0);

            userRepository.SaveAll();
            Assert.IsTrue(user1.ID > 0);
            Assert.IsTrue(user2.ID > 0);
        }

        [TestMethod]
        public void TestGetAllUsers()
        {
            Assert.IsInstanceOfType(userRepository.GetAllUsers(), typeof(List<User>));
            Assert.IsTrue(userRepository.GetAllUsers().Count > 0);
        }

        [TestMethod]
        public void TestGetUserById()
        {
            Assert.IsInstanceOfType(userRepository.GetUserById(user2.ID), typeof(User));
            Assert.IsNull(userRepository.GetUserById(0));
            Assert.AreSame(user1, userRepository.GetUserById(user1.ID));
        }

        [TestMethod]
        public void TestFindUserByEmail()
        {
            Assert.IsInstanceOfType(userRepository.FindUserByEmail(user2.Email), typeof(User));
            Assert.IsNull(userRepository.FindUserByEmail("nouserwiththismail@test.co"));
            Assert.AreSame(userRepository.FindUserByEmail(user1.Email), user1);
        }

        [TestMethod]
        public void TestFindUserByToken()
        {
            Assert.IsInstanceOfType(userRepository.FindUserByToken(user1.Token), typeof(User));
            Assert.IsNull(userRepository.FindUserByToken("nouserwiththistoken"));
            Assert.AreSame(userRepository.FindUserByToken(user1.Token), user1);
        }

        [TestMethod]
        public void TestDelete()
        {
            Assert.IsTrue(userRepository.Delete(user1));
            Assert.IsNull(userRepository.FindUserByEmail(user1.Email));
            Assert.IsTrue(userRepository.Delete(user2));
            Assert.IsNull(userRepository.FindUserByEmail(user2.Email));
        }
    }
}
