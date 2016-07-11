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
    [RoutePrefix("api/v1/auth")]
	public class AuthController : BaseAPIController
	{
        private IAuthService authService;

        public AuthController(IRepository repo) : base(repo)
        {
            this.authService = new AuthService(repo.GetUserRepository());
        }

        [Route("register")]
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult RegisterUser([FromBody] RegisterDTO registerDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable parameter"));
            }

            // check if mail address exists
            if (authService.ExistsUser(registerDTO.MailAddress))
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Conflict, "Email in use"));
            }

            // now create user.
            User user = ModelFactory.Create(registerDTO);
            authService.SaveUser(user);
            
            if (user.ID > 0)
            {
                UserDTO createdUserDTO = ModelFactory.CreateUserDTOWithToken(user);
                return Ok(createdUserDTO);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "User not created"));
            }
        }

        [Route("login")]
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult LoginUser([FromBody] LoginDTO loginDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable parameter"));
            }
            // do authentication
            User user = authService.AuthenticateByPassword(loginDTO.MailAddress, loginDTO.Password);

            if (user !=null)
            {
                UserDTO userDTO = ModelFactory.CreateUserDTOWithToken(user);
                return Ok(userDTO);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotFound, "Invlid credientials"));
            }
        }

        [Route("forgot")]
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult ForgotPassword([FromBody] ForgotDTO forgotDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable parameter"));
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

        [Route("logout")]
        [HttpDelete]
        public IHttpActionResult LogoutUser()
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
