using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class PostBrandRequest
    {
        public string Name { get; set; }
        public string IconUrl { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public int? SegmentId { get; set; }
    }
}
