using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class OrderRequest
    {
        public string CoordinateString { get; set; }
        public string TimeOrder { get; set; }
        public int DateOrder { get; set; }
    }
}
