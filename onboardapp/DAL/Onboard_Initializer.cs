using onboardapp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace onboardapp.DAL
{
    public class Onboarding_Initializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<Onboarding_Context>
    {
        protected override void Seed(Onboarding_Context context)
        {
            var Products = new List<Product>
            {
            new Product{ProdName="Box",ProdPrice=50},
            new Product{ProdName="Bottle",ProdPrice=10},
            };
            Products.ForEach(s => context.Products.Add(s));
            context.SaveChanges();

            var Stores = new List<Store>
            {
            new Store{StoreName="Store1",StoreAddress="Street1"},
            new Store{StoreName="Store2",StoreAddress="Street2"},
            };
            Stores.ForEach(s => context.Stores.Add(s));
            context.SaveChanges();

            var Customers = new List<Customer>
            {
            new Customer{CusName="Jack",CusAddress="Grove street"},
            new Customer{CusName="Homer",CusAddress="Springfield"},
            };

            Customers.ForEach(s => context.Customers.Add(s));
            context.SaveChanges();

            var ProductsSolds = new List<ProductSold>
            {
            new ProductSold{CusId=1,ProdId=1,StoreId=1,DateSold=DateTime.Parse("2017-09-07")},
            new ProductSold{CusId=1,ProdId=2,StoreId=1,DateSold=DateTime.Parse("2016-12-11")},
            new ProductSold{CusId=2,ProdId=2,StoreId=2,DateSold=DateTime.Parse("2018-09-21")},
            };

            ProductsSolds.ForEach(s => context.ProductsSolds.Add(s));
            context.SaveChanges();

        }
    }
}