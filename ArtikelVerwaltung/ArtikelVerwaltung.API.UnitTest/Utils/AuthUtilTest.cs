using ArtikelVerwaltung.API.Utils;
using ArtikelVerwaltung.Repository.EF;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ArtikelVerwaltung.API.UnitTest.Utils
{
    [TestClass]
    public class AuthUtilTest
    {
        [TestMethod]
        public void TestEncrptPasswordWithSHA256()
        {
            Assert.IsNotNull(AuthUtil.EncrptPasswordWithSHA256("testpassword"));
            Assert.IsInstanceOfType(AuthUtil.EncrptPasswordWithSHA256("testpassword"), typeof(string));
        }

        [TestMethod]
        public void TestGenerateUniqueToken()
        {
            Assert.IsNotNull(AuthUtil.GenerateUniqueToken());
            Assert.IsInstanceOfType(AuthUtil.GenerateUniqueToken(), typeof(string));
        }
    }
}
