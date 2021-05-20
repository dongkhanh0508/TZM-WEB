using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class InitTradeZoneRequest
    {
        public double Distance { get; set; }
        public string TimeSlot { get; set; }
        public List<int> StoresId { get; set; }
    }
}
