using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class SurveyStoreRequest
    {
        public string Description { get; set; }
        public JObject Geom { get; set; }
        public String Note { get; set; }
    }
}
