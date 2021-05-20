using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class ConfigurationRequest
    {
        public double Value { get; set; }
        public int Version { get; set; }
    }
}
