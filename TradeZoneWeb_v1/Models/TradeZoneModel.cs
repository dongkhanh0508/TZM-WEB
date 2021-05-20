using NetTopologySuite.Geometries;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models
{
    public class TradeZoneModel
    {
        public string Wkt { get; set; }
        public JObject Geom { get; set; }
        public int GroupZoneId { get; set; }
        public int StoreId { get; set; }
        public string Name { get; set; }
        public double WeightNumber { get; set; }
    }
}
