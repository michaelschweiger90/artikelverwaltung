using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ArtikelVerwaltung.API.Controllers
{
	[RoutePrefix("api/v1/users")]
	public class UserController : BaseAPIController
	{

		public UserController(IRepository repo) : base(repo) { }

		/* User */
		#region User

		#endregion

		/* Warenkorb */
		#region Warenkorb
		[Route("~/api/v1/users/{userId:int}/carts")]
		[HttpGet]
		public IHttpActionResult getCartsByUser(int userId)
		{
			try
			{
				User user = UserRepository.getUserById(userId);

				if (user == null)
					throw new ArgumentException("User existiert nicht!");

				//if(user.ID != 2)
					//throw new HttpResponseException(HttpStatusCode.Unauthorized);

				List<CartDTO> carts = ModelFactory.Create(CartRepository.GetCartByUser(user));

				return Ok(carts);
			}
			catch(ArgumentException)
			{
				return NotFound();
			}
		}


		[Route("~/api/v1/users/{userId:int}/carts/{cartId:int}")]
		[HttpGet]
		public IHttpActionResult getCartByUser(int userId, int cartId)
		{
			try
			{
				User user = UserRepository.getUserById(userId);

				if (user == null)
					throw new ArgumentException("User existiert nicht!");

				//if(user.ID != 2)
				//throw new HttpResponseException(HttpStatusCode.Unauthorized);

				Cart cart = CartRepository.GetCartByID(cartId);

				if (cart == null)
					throw new ArgumentException("Warenkorb existiert nicht!");

				CartDTO cartDTO = ModelFactory.Create(cart);

				return Ok(cartDTO);
			}
			catch(ArgumentException)
			{
				return NotFound();
			}
		}


		[Route("~/api/v1/users/{userId:int}/carts")]
		[HttpPost]
		public IHttpActionResult createCart(int userId, [FromBody] CartDTO cartDTO)
		{
			try
			{
				User user = UserRepository.getUserById(userId);

				if (user == null)
					throw new ArgumentException("User existiert nicht!");

				//if(user.ID != 2)
					//throw new HttpResponseException(HttpStatusCode.Unauthorized);

				Cart cart = ModelFactory.Create(cartDTO);

				if (cart == null)
				{
					throw new HttpResponseException(HttpStatusCode.BadRequest);
				}

				CartRepository.Add(cart);

				if (CartRepository.SaveAll())
				{
					return Ok(ModelFactory.Create(cart));
				}
				else
				{
					return BadRequest();
				}
			}
			catch(ArgumentException)
			{
				return NotFound();
			}
			catch(HttpResponseException)
			{
				return BadRequest();
			}
			
		}


		[Route("~/api/v1/users/{userId:int}/carts/{cartId:int}")]
		[HttpPut]
		public IHttpActionResult editCart(int userId, int cartId, [FromBody] CartDTO cartDTO)
		{
			try
			{
				User user = UserRepository.getUserById(userId);

				if (user == null)
					throw new ArgumentException("User exisitert nicht!");

				//if(user.ID != 2)
					//throw new HttpResponseException(HttpStatusCode.Unauthorized);

				Cart existingCart = CartRepository.GetCartByID(cartId);

				if (existingCart == null)
					throw new ArgumentException("Warenkorb exisitert nicht!");

				Cart cart = ModelFactory.Create(cartDTO);

				if (cart == null)
				{
					throw new HttpResponseException(HttpStatusCode.BadRequest);
				}

				CartRepository.Update(cart);

				if (CartRepository.SaveAll())
				{
					return Ok(ModelFactory.Create(cart));
				}
				else
				{
					return BadRequest();
				}
			}
			catch(ArgumentException)
			{
				return NotFound();
			}
			catch(HttpResponseException)
			{
				return BadRequest();
			}
		}

		
		[Route("~/api/v1/users/{userId:int}/carts/{cartId:int}")]
		[HttpDelete]
		public IHttpActionResult deleteCart(int userId, int cartId)
		{
			try
			{
				User user = UserRepository.getUserById(userId);

				if (user == null)
					throw new ArgumentException("User exisitert nicht!");

				//if(user.ID != 2)
					//throw new HttpResponseException(HttpStatusCode.Unauthorized);

				Cart cart = CartRepository.GetCartByID(cartId);

				if (cart == null)
					throw new ArgumentException("Warenkorb existiert nicht!");

				CartRepository.Delete(cart);

				if (CartRepository.SaveAll())
				{
					return Ok(ModelFactory.Create(cart));
				}
				else
				{
					return BadRequest();
				}
			}
			catch (ArgumentException)
			{
				return NotFound();
			}
		}


		[Route("~/api/v1/users/{userId:int}/carts/{cartId:int}/articles")]
		[HttpGet]
		public IHttpActionResult getArticleInCart(int userId, int cartId)
		{
			try
			{
				User user = UserRepository.getUserById(userId);

				if (user == null)
					throw new ArgumentException("User exisitert nicht!");

				//if(user.ID != 2)
				//throw new HttpResponseException(HttpStatusCode.Unauthorized);

				Cart cart = CartRepository.GetCartByID(cartId);

				if (cart == null)
					throw new ArgumentException("Warenkorb existiert nicht!");

				List<Article> articles =  CartRepository.GetArticle(cart.ID);

				//ToDO in DTO umwandeln

				return Ok(articles);
			}
			catch(ArgumentException)
			{
				return NotFound();
			}
		}


		[Route("~/api/v1/users/{userId:int}/carts/{cartId:int}/articles")]
		[HttpPost]
		public IHttpActionResult addArticleToCart(int userId, int cartId, [FromBody] ArticleCartDTO acDTO)
		{
			try
			{
				User user = UserRepository.getUserById(userId);

				if (user == null)
					throw new ArgumentException("User exisitert nicht!");

				//if(user.ID != 2)
				//throw new HttpResponseException(HttpStatusCode.Unauthorized);

				Cart cart = CartRepository.GetCartByID(cartId);

				if (cart == null)
					throw new ArgumentException("Warenkorb existiert nicht!");

				ArticleCart ac = ModelFactory.Create(acDTO);
				
				CartRepository.AddArticle(ac);

				if (CartRepository.SaveAll())
				{
					return Ok(ModelFactory.Create(cart));
				}
				else
				{
					return BadRequest();
				}
			}
			catch (ArgumentException)
			{
				return NotFound();
			}
		}


		[Route("~/api/v1/users/{userId:int}/carts/{cartId:int}/articles/{articleId}")]
		[HttpDelete]
		public IHttpActionResult removeArticleFromCart(int userId, int cartId, int articleId)
		{
			try
			{
				User user = UserRepository.getUserById(userId);

				if (user == null)
					throw new ArgumentException("User exisitert nicht!");

				// ToDo
				//if(user.ID != 2)
				//throw new HttpResponseException(HttpStatusCode.Unauthorized);

				Cart cart = CartRepository.GetCartByID(cartId);

				if (cart == null)
					throw new ArgumentException("Warenkorb existiert nicht!");

				// ToDo überprüfen ob Artikel existiert

				ArticleCart ac = CartRepository.ArticleExisits(cart.ID, articleId);

				if (ac == null)
				{
					throw new ArgumentException("Artikel ist nicht im Warenkorb!");
				}

				CartRepository.RemoveArticle(ac);

				if (CartRepository.SaveAll())
				{
					return Ok();
				}
				else
				{
					return BadRequest();
				}
			}
			catch(ArgumentException)
			{
				return NotFound();
			}
		}

		#endregion
	}
}
