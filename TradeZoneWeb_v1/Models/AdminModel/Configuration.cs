using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.AdminModel
{
    public class Configuration
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public int? Version { get; set; }
        public bool? Active { get; set; }
        public string Description { get; set; }
    }
}
