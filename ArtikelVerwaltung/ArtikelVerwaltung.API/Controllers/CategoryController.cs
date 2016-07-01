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
    public class CategoryController : BaseAPIController
    {
        public CategoryController(IRepository repo) : base(repo)
        {
        }

        [Route("~/api/v1/categories")]
        [HttpGet]
        public IHttpActionResult getAllCategories()
        {
            List<CategoryDTO> categories = ModelFactory.Create(CategoryRepository.GetAll());

            return Ok(categories);
        }
    }
}
