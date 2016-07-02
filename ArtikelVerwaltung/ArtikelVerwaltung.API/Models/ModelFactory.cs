using ArtikelVerwaltung.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArtikelVerwaltung.API.Models
{
	public class ModelFactory
	{
		public CartDTO Create(Cart cart)
		{
			return new CartDTO()
			{
				Id = cart.ID,
				Name = cart?.Name,
				UserID = cart.UserID
			};
		}

		public Cart Create(CartDTO dto)
		{
			Cart cart = null;

			if(dto != null)
			{
				cart = new Cart()
				{
					ID = dto.Id,
					Name = dto.Name,
					UserID = dto.UserID
				};
			}

			return cart;
		}

        public Article Create(ArticleDTO dto)
        {
            Article article = null;

            if (dto != null)
            {
                article = new Article()
                {
                    ID = dto.ID,
                    Name = dto.Name,
                    Description = dto.Description,
                    Price = dto.Price
                };
            }

            return article;
        }

        public Category Create(CategoryDTO dto)
        {
            Category category = null;

            if (dto != null)
            {
                category = new Category()
                {
                    ID = dto.ID,
                    Name = dto.Name,
                    ParentID = dto.ParentID
                };
            }

            return category;
        }

        internal List<ArticleDTO> Create(List<Article> articles)
		{
			List<ArticleDTO> list = new List<ArticleDTO>();

			if (articles?.Count > 0)
			{
				foreach (Article article in articles)
				{
					list.Add(Create(article));
				}
			}

			return list;
		}

        internal List<CategoryDTO> Create(List<Category> categories)
        {
            List<CategoryDTO> list = new List<CategoryDTO>();

            if (categories?.Count > 0)
            {
                foreach (Category category in categories)
                {
                    list.Add(Create(category));
                }
            }

            return list;
        }

        public CategoryDTO Create(Category category)
        {
            return new CategoryDTO()
            {
                ID = category.ID,
                Name = category.Name,
                ParentID = category.ParentID
            };
        }

        public ArticleDTO Create(Article article)
		{
			return new ArticleDTO()
			{
				ID = article.ID, 
				Name = article.Name,
				Price = article.Price,
				Description = article.Description
			};
		}

		public List<CartDTO> Create(List<Cart> carts)
		{
			List<CartDTO> list = new List<CartDTO>();

			if(carts?.Count > 0)
			{
				foreach ( Cart cart in carts)
				{
					list.Add(Create(cart));
				}
			}

			return list;
		}

		public ArticleCart Create(ArticleCartDTO dto)
		{
			ArticleCart ac = null;

			if (dto != null)
			{
				ac = new ArticleCart()
				{
					ID = dto.Id,
					ArticleID = dto.ArticleID,
					CartID = dto.CartID
				};
			}

			return ac;
		}

        public User Create(UserDTO userDTO)
        {
            return new User()
            {
                ID = userDTO.ID,
                Email = userDTO.MailAddress,
                Passwort = AuthFactory.encrptPasswordWithSHA256(userDTO.Password),
                IsAdmin = false,
                Cart = null
            };
        }
    }
}