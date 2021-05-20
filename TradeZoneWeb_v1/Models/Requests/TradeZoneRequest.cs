using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class TradeZoneRequest
    {
        public List<TradeZoneModel> TradeZones { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string DateFilter { get; set; }
        public string TimeSlot { get; set; }
        public double Distance { get; set; }
    }
}
