﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.Repository.Data
{
    public class ArticleRepository : Repository, IArticleRepository
    {
        public ArticleRepository(ArtikelVerwaltungEntities ctx) : base(ctx)
        {
        }

        public Article Add(Article article)
        {
            return ctx.Article.Add(article);
        }

        public Article Delete(Article article)
        {
            ctx.ArticleCategory.RemoveRange(ctx.Article.Find(article.ID).ArticleCategory);
            return ctx.Article.Remove(article);
        }

		public List<Article> GetAllArticle()
		{
			return ctx.Article.ToList();
		}

		public Article GetArticleByID(int id)
        {
            return ctx.Article.Find(id);
        }

        public Article Update(Article article)
        {
            Article original = GetArticleByID(article.ID);

            ctx.Entry(original).CurrentValues.SetValues(article);

            return article;
        }
    }
}
