using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class ApprovedOrRejectRequest
    {
        public string Note { get; set; }
        public int Type { get; set; }
    }
}
