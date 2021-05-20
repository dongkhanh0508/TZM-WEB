using System.Collections.Generic;

namespace TradeZoneWeb_v1.Models
{
    public class WardModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> StreetSegments { get; set; }
        public List<string> SystemZones { get; set; }
    }
}