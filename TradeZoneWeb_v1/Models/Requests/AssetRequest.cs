using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class AssetRequest
    {
        public string Name { get; set; }
        public int? Type { get; set; }
        public int? StoreId { get; set; }
    }
}
