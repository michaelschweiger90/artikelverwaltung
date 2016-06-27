using ArtikelVerwaltung.Repository.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtikelVerwaltung.Repository.Data
{
    public interface IArticleRepository
    {
        Article GetArticleByID(int id);
        Article Add(Article article);
        Article Update(Article article);
        Article Delete(Article article);

        bool SaveAll();
    }
}
