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
	public class RegisterController : BaseAPIController
	{

		public RegisterController(IRepository repo) : base(repo) { }

        [Route("~/api/v1/register")]
        [HttpPost]
        public IHttpActionResult registerUser([FromBody] UserDTO userDTO)
        {
            if (userDTO.ID != 0 || ! ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }

            User user = ModelFactory.Create(userDTO);
            UserRepository.Create(user);
            UserRepository.SaveAll();

            if (user.ID > 0)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.Created));
            } else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "User not created"));
            }
        }
    }
}
