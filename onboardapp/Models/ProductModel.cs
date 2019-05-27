using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace onboardapp.Models
{
    public class Customer
    {
        [Key]
        public int CusId { get; set; }
        public string CusName { get; set; }
        public string CusAddress { get; set; }

        //public virtual ICollection<ProductSold> ProductsSold { get; set; }
    }

    public class ProductSold
    {
        [Key]
        public int SalesId { get; set; }
        public int ProdId { get; set; }
        public int CusId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }

        public virtual Customer CusName { get; set; }
        public virtual Product ProdName { get; set; }
        public virtual Store StoreName { get; set; }
    }

    public class Store
    {
        [Key]
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string StoreAddress { get; set; }

        //public virtual ICollection<ProductSold> ProductsSold { get; set; }

    }

    public class Product
    {
        [Key]
        public int ProdId { get; set; }
        public string ProdName { get; set; }
        public int ProdPrice { get; set; }

        //public virtual ICollection<ProductSold> ProductsSold { get; set; }

    }
}