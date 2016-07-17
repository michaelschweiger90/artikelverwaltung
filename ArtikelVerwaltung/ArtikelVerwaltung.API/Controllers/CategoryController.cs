using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using ArtikelVerwaltung.Repository.Data;
using ArtikelVerwaltung.API.Models;
using ArtikelVerwaltung.Repository.EF;

namespace ArtikelVerwaltung.API.Controllers
{
    public class CategoryController : BaseAPIController
    {
        public CategoryController(IRepository repo) : base(repo)
        {
        }

        // ab hier kategorien CRUD Operationen

        [Route("~/api/v1/categories")]
        [HttpGet]
        public IHttpActionResult getAllCategories()
        {
            List<CategoryDTO> categories = ModelFactory.Create(CategoryRepository.GetAll());

            return Ok(categories);
        }

        [Route("~/api/v1/categories/{id:int}")]
        [HttpGet]
        public IHttpActionResult getCategorie(int id)
        {
            CategoryDTO category = ModelFactory.Create(CategoryRepository.GetCategoryById(id));
            return Ok(category);
        }

        [Route("~/api/v1/categories")]
        [HttpPost]
        public IHttpActionResult createCategorie([FromBody] CategoryDTO categoryDTO)
        {
            try
            {
                Category category = ModelFactory.Create(categoryDTO);

                if (category == null)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

				CategoryRepository.SaveCategory(category);

				if (CategoryRepository.SaveAll())
                {
                    return Ok(ModelFactory.Create(category));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (HttpResponseException)
            {
                return BadRequest();
            }
        }

        [Route("~/api/v1/categories/{id:int}")]
        [HttpPut]
        public IHttpActionResult updateCategorie(int id, [FromBody] CategoryDTO categoryDTO)
        {
            try
            {
                Category existCategory = CategoryRepository.GetCategoryById(id);

                if (existCategory == null)
                    throw new ArgumentException("Kategorie exisitert nicht!");

				Category category = ModelFactory.Create(categoryDTO);

				CategoryRepository.UpdateCategory(category);

                if (CategoryRepository.SaveAll())
                {
                    return Ok(ModelFactory.Create(category));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
            catch (HttpResponseException)
            {
                return BadRequest();
            }
        }

        [Route("~/api/v1/categories/{id:int}")]
        [HttpDelete]
        public IHttpActionResult deleteCategorie(int id)
        {
            try
            {
                Category category = CategoryRepository.GetCategoryById(id);

                if (category == null)
                    throw new ArgumentException("Kategorie exisitert nicht!");

                CategoryRepository.DeleteCategory(category);

                if (CategoryRepository.SaveAll())
                {
                    return Ok(ModelFactory.Create(category));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }


        //ab hier artikel CRUD Operationen

        [Route("~/api/v1/categories/{id:int}/articles")]
        [HttpGet]
        public IHttpActionResult getAllArticle(int id)
        {
            List<ArticleDTO> articles = ModelFactory.Create(CategoryRepository.GetArticle(id));

            return Ok(articles);
        }
        
        [Route("~/api/v1/categories/{cId:int}/articles/{aId:int}")]
        [HttpGet]
        public IHttpActionResult getArticle(int cId, int aId)
        {
            ArticleDTO article = ModelFactory.Create(CategoryRepository.GetArticleById(cId, aId));
          
            return Ok(article);
        }

        [Route("~/api/v1/categories/{id:int}/articles")]
        [HttpPost]
        public IHttpActionResult createArticle(int id, [FromBody] ArticleDTO articleDTO)
        {
            try
            {
                Category category =  CategoryRepository.GetCategoryById(id);

                if (category == null)
                    throw new ArgumentException("Kategorie existiert nicht!");
                
                Article article = ModelFactory.Create(articleDTO);

                if (article == null)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

                Article a = ArticleRepository.Add(article);


                if (CategoryRepository.SaveAll())
                {
                    CategoryRepository.AddArticle(a, category.ID);
                    CategoryRepository.SaveAll();
                    return Ok(ModelFactory.Create(a));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
            catch (HttpResponseException)
            {
                return BadRequest();
            }
        }
        
       [Route("~/api/v1/categories/{cId:int}/articles/{aId:int}")]
       [HttpPut]
       public IHttpActionResult updateArticle(int cId, int aId, [FromBody] ArticleDTO articleDTO)
       {
            try
            {
                Category category = CategoryRepository.GetCategoryById(cId);

                if (category == null)
                    throw new ArgumentException("Kategorie exisitert nicht!");
                
                Article existingArticle = ArticleRepository.GetArticleByID(aId);

                if (existingArticle == null)
                    throw new ArgumentException("Artikel exisitert nicht!");

                Article article = ModelFactory.Create(articleDTO);

                if (article == null)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

                ArticleRepository.Update(article);

                if (ArticleRepository.SaveAll())
                {
                    return Ok(ModelFactory.Create(article));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
            catch (HttpResponseException)
            {
                return BadRequest();
            }
        }
        
       [Route("~/api/v1/categories/{cId:int}/articles/{aId:int}")]
       [HttpDelete]
       public IHttpActionResult deleteArticle(int cId, int aId)
       {
            try
            {
                Category category = CategoryRepository.GetCategoryById(cId);

                if (category == null)
                    throw new ArgumentException("Kategorie exisitert nicht!");

                Article article = ArticleRepository.GetArticleByID(aId);

                if (article == null)
                    throw new ArgumentException("Artikel existiert nicht!");

                ArticleRepository.Delete(article);

                if (ArticleRepository.SaveAll())
                {
                    return Ok(ModelFactory.Create(article));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }
    

    }
}
