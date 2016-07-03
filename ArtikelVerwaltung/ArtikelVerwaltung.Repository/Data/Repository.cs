using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.Repository.Data
{
    public class Repository : IRepository
	{
		protected ArtikelVerwaltungEntities ctx;

		public Repository(ArtikelVerwaltungEntities ctx)
		{
			this.ctx = ctx;
		}

		public CartRepositroy GetCartRepository()
		{
			return new CartRepositroy(ctx);
		}

		public UserRepository GetUserRepository()
		{
			return new UserRepository(ctx);
		}

		public ArticleRepository GetArticleRepository()
		{
			return new ArticleRepository(ctx);
		}

		public bool SaveAll()
		{
			return ctx.SaveChanges() > 0;
		}

        public CategoryRepository GetCategoryRepository()
        {
            return new CategoryRepository(ctx);
        }
    }
}
