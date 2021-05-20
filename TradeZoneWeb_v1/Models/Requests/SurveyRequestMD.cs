using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class SurveyRequestMD
    {
        public string Description { get; set; }
        public Geometry Geom { get; set; }
        public string Note { get; set; }
    }
}
