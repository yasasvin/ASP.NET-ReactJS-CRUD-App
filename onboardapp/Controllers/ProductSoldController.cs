using onboardapp.DAL;
using onboardapp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace onboardapp.Controllers
{
    public class ProductSoldController : Controller
    {
        private Onboarding_Context db = new Onboarding_Context();

        // GET: ProductSold
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(db.ProductsSolds.ToList(), JsonRequestBehavior.AllowGet);
        }

        //Add new Sale
        public JsonResult Add(ProductSold newItem)
        {
            db.ProductsSolds.Add(newItem);
            db.SaveChanges();

            return Json(db.ProductsSolds.Add(newItem), JsonRequestBehavior.AllowGet);
        }
        //Delete Sale
        public JsonResult Delete(int id)
        {
            ProductSold Item = db.ProductsSolds.Find(id);
            db.ProductsSolds.Remove(Item);
            db.SaveChanges();

            return Json(Item, JsonRequestBehavior.AllowGet);
        }

        //Get Sale by ID
        public JsonResult GetbyID(int ID)
        {
            var item = db.ProductsSolds.ToList().Find(x => x.SalesId.Equals(ID));
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        //Update
        public JsonResult Update([Bind(Include = "SalesId,CusId,ProdId,StoreId,DateSold")] ProductSold item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();

            return Json(item, JsonRequestBehavior.AllowGet);
        }
    }
}