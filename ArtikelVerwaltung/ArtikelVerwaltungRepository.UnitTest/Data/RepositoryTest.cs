﻿using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ArtikelVerwaltungRepository.UnitTest.Data
{
    [TestClass]
    public class RepositoryTest
    {
        private static ArtikelVerwaltungEntities ctx;
        private IRepository repository;

        [ClassInitialize]
        public static void setup(TestContext context)
        {
            ctx = new ArtikelVerwaltungEntities();
        }

        [TestInitialize]
        public void beforeEach()
        {
            repository = new Repository(ctx);
        }

        [TestMethod]
        public void TestGetUserRepository()
        {
            Assert.IsInstanceOfType(repository.GetUserRepository(), typeof(IUserRepository));
        }

        [TestMethod]
        public void TestGetCartRepository()
        {
            Assert.IsInstanceOfType(repository.GetCartRepository(), typeof(ICartRepository));
        }

        [TestMethod]
        public void TestGetArticleRepository()
        {
            Assert.IsInstanceOfType(repository.GetArticleRepository(), typeof(IArticleRepository));
        }

        [TestMethod]
        public void TestGetCategoryRepository()
        {
            Assert.IsInstanceOfType(repository.GetCategoryRepository(), typeof(ICategoryRepository));
        }
    }
}
