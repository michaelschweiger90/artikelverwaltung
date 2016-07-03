using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.API.Services;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ArtikelVerwaltung.API.Controllers
{
	public class AuthController : BaseAPIController
	{
        private IAuthService authService;

        public AuthController(IRepository repo) : base(repo)
        {
            this.authService = new AuthService(repo.GetUserRepository());
        }

        [Route("~/api/v1/register")]
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult registerUser([FromBody] RegisterDTO registerDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }

            // check if mail address exists
            if (authService.ExistsUser(registerDTO.MailAddress))
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Conflict, "User exists"));
            }

            // now create user.
            User user = ModelFactory.Create(registerDTO);
            authService.SaveUser(user);
            
            if (user.ID > 0)
            {
                FullUserDTO createdUserDTO = ModelFactory.Create(user);
                return Ok(createdUserDTO);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "User not created"));
            }
        }

        [Route("~/api/v1/login")]
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult loginUser([FromBody] LoginDTO loginDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }
            // do authentication
            User user = authService.Authenticate(loginDTO.MailAddress, loginDTO.Password);

            if (user !=null)
            {
                FullUserDTO fullUserDTO = ModelFactory.Create(user);
                return Ok(fullUserDTO);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotFound, "User not created"));
            }
        }
    }
}
