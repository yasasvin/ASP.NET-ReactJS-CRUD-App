using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using onboardapp.DAL;
using onboardapp.Models;

namespace onboardapp.Controllers
{
    public class ProductController : Controller
    {
        private Onboarding_Context db = new Onboarding_Context();

        // GET: Products
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
        }

        //Add new Product
        public JsonResult Add(Product newProduct)
        {
            db.Products.Add(newProduct);
            db.SaveChanges();

            return Json(db.Products.Add(newProduct), JsonRequestBehavior.AllowGet);
        }
        //Delete Product
        public JsonResult Delete(int id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();

            return Json(product, JsonRequestBehavior.AllowGet);
        }

        //Get Product by ID
        public JsonResult GetbyID(int ID)
        {
            var item = db.Products.ToList().Find(x => x.ProdId.Equals(ID));
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        //Update
        public JsonResult Update([Bind(Include = "ProdId,ProdName,ProdPrice")] Product item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();

            return Json(item, JsonRequestBehavior.AllowGet);
        }
    }
}