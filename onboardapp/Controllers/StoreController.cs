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
    public class StoreController : Controller
    {
        private Onboarding_Context db = new Onboarding_Context();

        // GET: Stores
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(db.Stores.ToList(), JsonRequestBehavior.AllowGet);
        }

        //Add new Store
        public JsonResult Add(Store newStore)
        {
            db.Stores.Add(newStore);
            db.SaveChanges();

            return Json(db.Stores.Add(newStore), JsonRequestBehavior.AllowGet);
        }
        //Delete Store
        public JsonResult Delete(int id)
        {
            Store Store = db.Stores.Find(id);
            db.Stores.Remove(Store);
            db.SaveChanges();

            return Json(Store, JsonRequestBehavior.AllowGet);
        }

        //Get Store by ID
        public JsonResult GetbyID(int ID)
        {
            var item = db.Stores.ToList().Find(x => x.StoreId.Equals(ID));
            return Json(item, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update([Bind(Include = "StoreId,StoreName,StoreAddress")] Store item)
        {
            db.Entry(item).State = EntityState.Modified;
            db.SaveChanges();

            return Json(item, JsonRequestBehavior.AllowGet);
        }
    }
}