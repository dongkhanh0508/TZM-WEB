using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.AdminModel
{
    public class BuidingModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? OsmId { get; set; }
        public DateTime? CreateDate { get; set; }
        public Geometry Geom { get; set; }
        public string ImageUrl { get; set; }
        public string Type { get; set; }
        public bool? Active { get; set; }
        public int? NumberOfFloor { get; set; }
        public int? CampusId { get; set; }
        public int? Status { get; set; }
        public string Address { get; set; }
        public List<FloorModel> Floors { get; set; }
        public List<BuidingStreetSegmentResponse> BuidingStreetSegments { get; set; }
        public int? ReferenceId { get; set; }
    }

    public class FloorModel
    {
        public int Id { get; set; }
        public int? FloorNumber { get; set; }
        public string Desciption { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? BuildingId { get; set; }
        public bool? Active { get; set; }

        public List<FloorAreaModel> FloorAreas { get; set; }
    }

    public class FloorAreaModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? FloorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool? Active { get; set; }

        public List<StoreModel> Stores { get; set; }
    }

    public class BuidingStreetSegmentResponse
    {
        public int BuildingId { get; set; }
        public int StreetSegmentId { get; set; }
    }
}
