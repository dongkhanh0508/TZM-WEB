using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class AddCampusRequest
    {
        public string Name { get; set; }
        public string Wkt { get; set; }
        public JObject Geom { get; set; }
        public List<object> StreetSegmentId { get; set; } = new List<object>();
    }
}