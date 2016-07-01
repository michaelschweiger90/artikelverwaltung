using ArtikelVerwaltung.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtikelVerwaltung.Repository.Data
{
    public interface ICategoryRepository
    {
        ArticleCategory AddArticle(ArticleCategory ac);
        ArticleCategory RemoveArticle(ArticleCategory ac);
        ArticleCategory ArticleExisits(int categoryID, int articleID);
        List<Article> GetArticle(int categoryID);
        List<Category> GetAll();
        Category GetCategoryById(int categoryID);
        Category SaveCategory(Category category);
        Category UpdateCategory(Category category);
        Category DeleteCategory(Category category);

        bool SaveAll();
    }
}
