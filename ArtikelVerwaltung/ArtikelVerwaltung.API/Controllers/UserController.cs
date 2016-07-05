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
	[RoutePrefix("api/v1/user")]
	public class UserController : BaseAPIController
	{
		public UserController(IRepository repo) : base(repo) { }

		
	}
}
