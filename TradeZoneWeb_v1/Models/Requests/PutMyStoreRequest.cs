using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class PutMyStoreRequest
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string ImageUrl { get; set; }
        public int? AbilityToServe { get; set; }
        public string TimeSlot { get; set; }
    }
}
