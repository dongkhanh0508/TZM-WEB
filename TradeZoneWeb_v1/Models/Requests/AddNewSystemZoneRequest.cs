using NetTopologySuite.Geometries;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class AddNewSystemZoneRequest
    {
        public string Name { get; set; }
        public JObject Geom { get; set; }
        public string Wkt { get; set; }
        public int WardId { get; set; }
    }
}
