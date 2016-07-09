using ArtikelVerwaltung.API.Filters;
using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.API.Services;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
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
        public IHttpActionResult getAllUsers()
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
        public IHttpActionResult makeAdmin(int userId)
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
        public IHttpActionResult removeAdminRights(int userId)
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
    }
}
