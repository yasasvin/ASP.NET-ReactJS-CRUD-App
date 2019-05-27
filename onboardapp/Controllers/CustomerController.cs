using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using onboardapp.DAL;
using onboardapp.Models;
using System.Net;

namespace onboardapp.Controllers
{

    public class CustomerController : Controller
    {
        private Onboarding_Context db = new Onboarding_Context();

        // GET: Customers
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(db.Customers.ToList(), JsonRequestBehavior.AllowGet);
        }
        //Add new Customer
        public JsonResult Add(Customer newCustomer)
        {
            db.Customers.Add(newCustomer);
            db.SaveChanges();

            return Json(db.Customers.Add(newCustomer), JsonRequestBehavior.AllowGet);
        }
        //Delete Cutomer
        public JsonResult Delete(int id)
        {
            Customer customer = db.Customers.Find(id);
            db.Customers.Remove(customer);
            db.SaveChanges();

            return Json(customer, JsonRequestBehavior.AllowGet);
        }
        //Get Customer by ID
        public JsonResult GetbyID(int ID)
        {
            var Cus = db.Customers.ToList().Find(x => x.CusId.Equals(ID));
            return Json(Cus, JsonRequestBehavior.AllowGet);
        }
        //Update
        //public JsonResult Update(Customer id)
        public JsonResult Update([Bind(Include = "CusId,CusName,CusAddress")] Customer customer)
        {
            db.Entry(customer).State = EntityState.Modified;
            db.SaveChanges();

            return Json(customer, JsonRequestBehavior.AllowGet);
        }
    }
}