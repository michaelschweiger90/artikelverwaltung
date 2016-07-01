using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.Repository.Data
{
    public class CategoryRepository :Repository, ICategoryRepository
    {
        public CategoryRepository(ArtikelVerwaltungEntities ctx) : base(ctx)
        {
        }

        public Article AddArticle(Article a, int cId)
        {
            ctx.ArticleCategory.Add(new ArticleCategory() {
                CategoryID = cId,
                ArticleID = a.ID
            });

            return a;
        }

        public ArticleCategory ArticleExisits(int categoryID, int articleID)
        {
            var result = ctx.ArticleCategory.Where(d => d.CategoryID == categoryID && d.ArticleID == articleID);

            return (result.Count() > 0) ? result.First() : null;
        }

        public Category DeleteCategory(Category category)
        {
            return ctx.Category.Remove(category);
        }

        public List<Category> GetAll()
        {
            return ctx.Category.ToList();
        }

        public List<Article> GetArticle(int categoryID)
        {
            List<ArticleCategory> acList = ctx.Category.Find(categoryID).ArticleCategory.ToList();

            List<Article> articles = new List<Article>();

            foreach (ArticleCategory ac in acList)
            {
                articles.Add(new Article()
                {
                    ID = ac.Article.ID,
                    Name = ac.Article.Name,
                    Description = ac.Article.Description,
                    Price = ac.Article.Price
                });
            }

            return articles;
        }

        public Article GetArticleById(int cId, int aId)
        {
            return ctx.ArticleCategory.Where(a => a.CategoryID == cId && a.ArticleID == aId).First().Article;
        }

        public Category GetCategoryById(int categoryID)
        {
            return ctx.Category.Find(categoryID);
        }

        public ArticleCategory RemoveArticle(ArticleCategory ac)
        {
            return ctx.ArticleCategory.Remove(ac);
        }

        public Category SaveCategory(Category category)
        {
            return ctx.Category.Add(category);
        }

        public Category UpdateCategory(Category category)
        {
            Category original = GetCategoryById(category.ID);

            ctx.Entry(original).CurrentValues.SetValues(category);

            return category;
        }
    }

}
