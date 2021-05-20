using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class PostMyStoreRequest
    {    
        public string Name { get; set; }
        public string CoordinateString { get; set; }
        public string Address { get; set; }
        public string ImageUrl { get; set; }
        public int? AbilityToServe { get; set; }
        public string TimeSlot { get; set; }
        //public List<int> StreetSegmentIds { get; set; }
        public int FloorAreaId { get; set; } = -1;
        public int BrandId { get; set; }
    }
}
