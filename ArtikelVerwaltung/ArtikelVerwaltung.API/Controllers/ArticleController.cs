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

		[Route("~/api/v1/category/{id:int}/articles")]
		[HttpGet]
		public IHttpActionResult getAllArticle(int id)
		{
			List<ArticleDTO> articles = ModelFactory.Create(CategoryRepository.GetArticleById(id));

			return Ok(articles);
		}

        [Route("~/api/v1/category/{cId:int}/article/{aId:int}")]
        [HttpGet]
        public IHttpActionResult getArticle(int cId, int aId)
        {
            //TODO

            return;
        }

        [Route("~/api/v1/category/{id:int}/articles")]
        [HttpPost]
        public IHttpActionResult createArticle(int id)
        {
            //TODO
            return;
        }

        [Route("~/api/v1/category/{cId:int}/articles{aId:int}")]
        [HttpPut]
        public IHttpActionResult updateArticle(int cId, int aId)
        {
            //TODO
            return;
        }

        [Route("~/api/v1/category/{cId:int}/article{aId::int}")]
        [HttpDelete]
        public IHttpActionResult deleteArticle(int cId, int aId)
        {
            //TODO
            return;
        }

    }
}
