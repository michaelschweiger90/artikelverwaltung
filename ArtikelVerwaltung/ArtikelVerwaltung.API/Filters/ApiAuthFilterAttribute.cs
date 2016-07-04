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
using System.Collections.Generic;

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

            if (!OnAuthoriseUser(filterContext))
            {
                ChallengeAuthRequest(filterContext);
                return;
            }

            base.OnAuthorization(filterContext);
        }

        private TokenAuthenticationIdentity FetchAuthHeader(HttpActionContext filterContext)
        {
            string authToken = null;
            int authId = 0;
            var authRequest = filterContext.Request.Headers.Authorization;
            IEnumerable<string> values;
            var authIds = filterContext.Request.Headers.TryGetValues("id", out values);
            
            if (authRequest != null && !String.IsNullOrEmpty(authRequest.Scheme) && authRequest.Scheme == "Bearer")
            {
                authToken = authRequest.Parameter;
            }

            if (values != null && !String.IsNullOrEmpty(values.FirstOrDefault()) && Convert.ToInt32(values.FirstOrDefault()) > 0)
            {
                var authIdString = values.FirstOrDefault();
                authId = Convert.ToInt32(authIdString);
            }

            if (string.IsNullOrEmpty(authToken) && !(authId > 0))
            {
                return null;
            }

            var basicIdentity = new TokenAuthenticationIdentity(authId, authToken);
            return basicIdentity;
        }

        private void ChallengeAuthRequest(HttpActionContext filterContext)
        {
            var dnsHost = filterContext.Request.RequestUri.DnsSafeHost;
            filterContext.Response = filterContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            filterContext.Response.Headers.Add("WWW-Authenticate", string.Format("Bearer realm=\"{0}\"", dnsHost));
        }

        private bool OnAuthoriseUser(HttpActionContext actionContext)
        {
            var repository = actionContext.ControllerContext.Configuration
                               .DependencyResolver.GetService(typeof(IRepository)) as Repository.Data.Repository;
            if (repository == null) return false;

            IAuthService authService = new AuthService(repository.GetUserRepository());

            var currentIdentity = Thread.CurrentPrincipal.Identity as TokenAuthenticationIdentity;

            User user = authService.AuthoriseUserByTokenAndId(currentIdentity.UserId, currentIdentity.Token);
            if (user != null)
            {
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
            return false;
        }

        private bool SkipAuthorization(HttpActionContext actionContext)
        {
            Contract.Assert(actionContext != null);

            return actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any()
                   || actionContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any();
        }
    }
}
