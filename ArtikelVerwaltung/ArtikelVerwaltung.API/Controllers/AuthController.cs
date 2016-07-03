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
	public class AuthController : BaseAPIController
	{
        public AuthController(IRepository repo) : base(repo) { }

        [Route("~/api/v1/register")]
        [HttpPost]
        public IHttpActionResult registerUser([FromBody] RegisterDTO registerDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }

            // check if mail address exists
            User existingUser = UserRepository.FindUserByEmail(registerDTO.MailAddress);
            if (existingUser != null)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Conflict, "User exists"));
            }

            // now create user.
            User user = ModelFactory.Create(registerDTO);
            UserRepository.Create(user);
            UserRepository.SaveAll();

            if (user.ID > 0)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.Created));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "User not created"));
            }
        }

        [Route("~/api/v1/login")]
        [HttpPost]
        public IHttpActionResult loginUser([FromBody] LoginDTO loginDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }
            // find user with requested mail
            User user = UserRepository.FindUserByEmail(loginDTO.MailAddress);

            if (user !=null)
            {
                if (user.Passwort.Equals(AuthFactory.encrptPasswordWithSHA256(loginDTO.Password)))
                {
                    return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
                }
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.Created));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotFound, "User not created"));
            }
        }
    }
}
