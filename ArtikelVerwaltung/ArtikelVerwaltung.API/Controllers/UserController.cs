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
			catch(ArgumentException ex)
			{
				return NotFound();
			}
		}


		[Route("~/api/v1/users/{userId:int}/carts/{cartId:int}")]
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
			catch(ArgumentException ex)
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
			catch(ArgumentException ex)
			{
				return NotFound();
			}
			catch(HttpResponseException ex)
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
			catch(ArgumentException ex)
			{
				return NotFound();
			}
			catch(HttpResponseException ex)
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
			catch (ArgumentException ex)
			{
				return NotFound();
			}
		}

		#endregion
	}
}
