using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ArtikelVerwaltung.API.Controllers
{
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public class BaseAPIController : ApiController
	{
		private IArticleRepository articleRepo;
        private ICategoryRepository categoryRepo;
        private ICartRepository cartRepo;
		private IUserRepository userRepo;
		private ModelFactory modelFactory;

		public BaseAPIController(IRepository repo)
		{
			articleRepo = repo.GetArticleRepository();
            categoryRepo = repo.GetCategoryRepository();
            cartRepo = repo.GetCartRepository();
			userRepo = repo.GetUserRepository();
		}

		protected IArticleRepository ArticleRepository
		{
			get { return articleRepo; }
		}

        protected ICategoryRepository CategoryRepository
        {
            get { return categoryRepo; }
        }

        protected ICartRepository CartRepository
		{
			get { return cartRepo; }
		}

		protected IUserRepository UserRepository
		{
			get { return userRepo; }
		}

		protected ModelFactory ModelFactory
		{
			get
			{
				return modelFactory =  modelFactory ?? new ModelFactory();
			}
		}

	}
}
