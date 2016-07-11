using ArtikelVerwaltung.API.Filters;
using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.API.Services;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace ArtikelVerwaltung.API.Controllers
{
    [RoutePrefix("api/v1/user")]
	public class UserController : BaseAPIController
	{
        private IUserService userService;

        public UserController(IRepository repo) : base(repo) {
            this.userService = new UserService(repo.GetUserRepository());
        }

        [Route("all")]
        [ApiAuthFilter("Admin")]
        [HttpGet]
        public IHttpActionResult GetAllUsers()
        {
            List<User> users = userService.FindAllUsers();
            List<UserDTO> userDTOs = ModelFactory.Create(users);

            if (userDTOs != null)
            {
                return Ok(userDTOs);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Users can not be fetched!"));
            }
        }

        [Route("{userId:int}/adminRights/grant")]
        [ApiAuthFilter("Admin")]
        [HttpPut]
        public IHttpActionResult MakeAdmin(int userId)
        {
            if (userService.MakeUserAdminById(userId))
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Admin right could not be granted!"));
            }
        }

        [Route("{userId:int}/adminRights/remove")]
        [ApiAuthFilter("Admin")]
        [HttpDelete]
        public IHttpActionResult RemoveAdminRights(int userId)
        {
            if (userService.RemoveAdminRightByUserId(userId))
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Admin right could not be granted!"));
            }
        }

        [Route("{userId:int}/remove")]
        [ApiAuthFilter("Admin")]
        [HttpDelete]
        public IHttpActionResult DeleteUser(int userId)
        {
            if (userService.RemoveUserById(userId))
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Admin right could not be granted!"));
            }
        }

        [Route("{userId:int}/get")]
        [ApiAuthFilter("Admin")]
        [HttpGet]
        public IHttpActionResult GetUser(int userId)
        {
            if (userId < 1)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }

            User user = userService.FindUserById(userId);

            if (user != null)
            {
                UserDTO userDTO = ModelFactory.CreateUserDTOWithoutTokenPassword(user);
                return Ok(userDTO);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Admin right could not be granted!"));
            }
        }

        [Route("update")]
        [ApiAuthFilter("Admin")]
        [HttpPut]
        public IHttpActionResult UpdateUser([FromBody] UserEditDTO userDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }

            // check if an user with given email exists
            if (userService.ExistsUserWithEmail(userDTO.MailAddress, userDTO.ID))
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Conflict, "User exists"));
            }

            if (userService.UpdateUser(userDTO))
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Admin right could not be granted!"));
            }
        }

        [Route("deleteAccount")]
        [HttpDelete]
        public IHttpActionResult DeleteAccount()
        {
            TokenAuthenticationIdentity currentIdentity = (TokenAuthenticationIdentity) Thread.CurrentPrincipal.Identity;

            if (userService.RemoveUserById(currentIdentity.UserId))
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Admin right could not be granted!"));
            }
        }

        [Route("editAccount")]
        [HttpPut]
        public IHttpActionResult UpdateUserLoggenin([FromBody] UserEditDTO userDTO)
        {
            // check if parameters valid
            if (!ModelState.IsValid)
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Unacceptable Parameter"));
            }

            TokenAuthenticationIdentity identity = (TokenAuthenticationIdentity)Thread.CurrentPrincipal.Identity;
            userDTO.ID = identity.UserId;

            // check if an user with given email exists
            if (userService.ExistsUserWithEmail(userDTO.MailAddress, userDTO.ID))
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Conflict, "User exists"));
            }

            if (userService.UpdateUser(userDTO))
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK));
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Admin right could not be granted!"));
            }
        }

        [Route("accountDetails")]
        [HttpGet]
        public IHttpActionResult GetUserLoggedin()
        {
            TokenAuthenticationIdentity identity = (TokenAuthenticationIdentity)Thread.CurrentPrincipal.Identity;

            User user = userService.FindUserById(identity.UserId);

            if (user != null)
            {
                UserDTO userDTO = ModelFactory.CreateUserDTOWithoutTokenPassword(user);
                return Ok(userDTO);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Admin right could not be granted!"));
            }
        }
    }
}
