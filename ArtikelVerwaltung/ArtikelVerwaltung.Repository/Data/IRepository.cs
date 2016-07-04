namespace ArtikelVerwaltung.Repository.Data
{
    public interface IRepository
	{
		CartRepositroy GetCartRepository();
		UserRepository GetUserRepository();
		ArticleRepository GetArticleRepository();
        CategoryRepository GetCategoryRepository();

		bool SaveAll();
	}
}
