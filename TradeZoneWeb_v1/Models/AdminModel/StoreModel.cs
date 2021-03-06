using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.AdminModel
{
    public class StoreModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Wkt { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? BrandId { get; set; }
        public string Address { get; set; }
        public string BrandName { get; set; }
        public int? Status { get; set; }
        public List<StoreStreetSegmentModel> StoreStreetSegmentModels { get; set; }
        public string ImageUrl { get; set; }
        public Geometry Geome { get; set; }
        public int? FloorAreaId { get; set; }
        public string FloorAreaName { get; set; }
        public string Type { get; set; }
        public int ReferenceId { get; set; }
        public int AbilityToServe { get; set; }
        public string TimeSlot { get; set; }


    }
    public class StoreStreetSegmentModel
    {
        public int StoreId { get; set; }
        public int StreetSegmentId { get; set; }
    }
}
