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
	}
}