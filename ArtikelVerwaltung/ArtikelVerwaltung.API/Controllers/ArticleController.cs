using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.API.Models;

namespace ArtikelVerwaltung.API.Controllers
{
	public class ArticleController : BaseAPIController
	{
		public ArticleController(IRepository repo) : base(repo)
		{
		}

		[Route("~/api/v1/articles")]
		[HttpGet]
		public IHttpActionResult getAllArticle()
		{
			List<ArticleDTO> articles = ModelFactory.Create(ArticleRepository.GetAllArticle());

			return Ok(articles);
		}

	}
}
