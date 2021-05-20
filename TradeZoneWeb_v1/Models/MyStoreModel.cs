using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models
{
    public class MyStoreModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Wkt { get; set; }
        public Geometry StoreGeom { get; set; }
        public DateTime? CreateDate { get; set; }       
        public int? BrandId { get; set; }
        public string Address { get; set; }
        public string ImageUrl { get; set; }
        public int? Status { get; set; }
        public int? ReferenceId { get; set; }
        public int? AbilityToServe { get; set; }
        public string TimeSlot { get; set; }
    }
}
