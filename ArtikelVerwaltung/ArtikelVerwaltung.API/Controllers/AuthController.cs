using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.API.Services;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading;

namespace ArtikelVerwaltung.API.Controllers
{
	public class AuthController : BaseAPIController
	{
        private IAuthService authService;

        public AuthController(IRepository repo) : base(repo)
        {
            this.authService = new AuthService(repo.GetUserRepository());
        }

        [Route("~/api/v1/auth/register")]
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
                UserDTO createdUserDTO = ModelFactory.Create(user);
                return Ok(createdUserDTO);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "User not created"));
            }
        }

        [Route("~/api/v1/auth/login")]
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
            User user = authService.AuthenticateByPassword(loginDTO.MailAddress, loginDTO.Password);

            if (user !=null)
            {
                UserDTO userDTO = ModelFactory.Create(user);
                return Ok(userDTO);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotFound, "User not created"));
            }
        }

        [Route("~/api/v1/auth/forgot")]
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult forgotPassword([FromBody] ForgotDTO forgotDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }
            // do authentication
            bool actionResult = authService.RenewPasswordBySecrets(forgotDTO.MailAddress, forgotDTO.SecretQuestion, forgotDTO.SecretAnswer, forgotDTO.NewPassword);

            if (actionResult)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong while renewing"));
            }
        }

        [Route("~/api/v1/auth/logout")]
        [HttpDelete]
        public IHttpActionResult logoutUser()
        {
            var identity = Thread.CurrentPrincipal.Identity as TokenAuthenticationIdentity;
            if (identity != null && authService.LogoutUser(identity.Token))
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
            }
            return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No user for log out"));
        }
    }
}
