using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using onboardapp.Models;

namespace onboardapp.DAL
{
    public class Onboarding_Context : DbContext
    {
        public Onboarding_Context() : base("Data Source = sql5018.site4now.net; Initial Catalog = DB_A49907_salesDb; Integrated Security = False; User ID = DB_A49907_salesDb_admin; Password=SalesDb123")
        {
        }
        public DbSet<ProductSold> ProductsSolds { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Store> Stores { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}