using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.API.Services;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.Repository.EF;
using System;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace ArtikelVerwaltung.API.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class ApiAuthFilterAttribute : AuthorizationFilterAttribute
    {
        private readonly bool _isActive = true;
        private readonly string _role = "";

        public ApiAuthFilterAttribute(string role)
        {
            _role = role;
        }

        public override void OnAuthorization(HttpActionContext filterContext)
        {
            if (!_isActive) return;

            if (SkipAuthorization(filterContext)) return;
            
            var identity = FetchAuthHeader(filterContext);
            if (identity == null)
            {
                ChallengeAuthRequest(filterContext);
                return;
            }
            var genericPrincipal = new GenericPrincipal(identity, null);
            Thread.CurrentPrincipal = genericPrincipal;
            if (!OnAuthenticateUser(identity.Email, identity.Password, filterContext))
            {
                ChallengeAuthRequest(filterContext);
                return;
            }

            if (!OnAuthoriseUser(filterContext))
            {
                ChallengeAuthRequest(filterContext);
                return;
            }

            base.OnAuthorization(filterContext);
        }

        private bool OnAuthenticateUser(string email, string password, HttpActionContext filterContext)
        {
            var repository = filterContext.ControllerContext.Configuration
                               .DependencyResolver.GetService(typeof(IRepository)) as Repository.Data.Repository;
            if (repository == null) return false;
            
            IAuthService authService = new AuthService(repository.GetUserRepository());
            User user = authService.Authenticate(email, password);

            if (user != null)
            {
                var basicAuthenticationIdentity = Thread.CurrentPrincipal.Identity as BasicAuthenticationIdentity;
                if (basicAuthenticationIdentity != null)
                {
                    basicAuthenticationIdentity.UserId = user.ID;
                    basicAuthenticationIdentity.IsAdmin = user.IsAdmin;
                    return true;
                }
            }
            return false;
        }

        private BasicAuthenticationIdentity FetchAuthHeader(HttpActionContext filterContext)
        {
            string authHeaderValue = null;
            var authRequest = filterContext.Request.Headers.Authorization;
            if (authRequest != null && !String.IsNullOrEmpty(authRequest.Scheme) && authRequest.Scheme == "Basic")
            {
                authHeaderValue = authRequest.Parameter;
            }

            if (string.IsNullOrEmpty(authHeaderValue))
            {
                return null;
            }

            authHeaderValue = Encoding.Default.GetString(Convert.FromBase64String(authHeaderValue));
            var credentials = authHeaderValue.Split(':');
            return credentials.Length < 2 ? null : new BasicAuthenticationIdentity(credentials[0], credentials[1]);
        }

        private void ChallengeAuthRequest(HttpActionContext filterContext)
        {
            var dnsHost = filterContext.Request.RequestUri.DnsSafeHost;
            filterContext.Response = filterContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            filterContext.Response.Headers.Add("WWW-Authenticate", string.Format("Basic realm=\"{0}\"", dnsHost));
        }

        private bool OnAuthoriseUser(HttpActionContext actionContext)
        {
            var currentIdentity = Thread.CurrentPrincipal.Identity as BasicAuthenticationIdentity;
            switch (_role)
            {
                case "Admin":
                    return currentIdentity.IsAdmin && currentIdentity.UserId > 0;
                case "User":
                    return currentIdentity.UserId > 0;
                default:
                    return false;
            }
        }

        private bool SkipAuthorization(HttpActionContext actionContext)
        {
            Contract.Assert(actionContext != null);

            return actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any()
                   || actionContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any();
        }
    }
}
