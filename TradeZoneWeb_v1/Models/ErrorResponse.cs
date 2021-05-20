using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models
{
    public class ErrorResponse
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public string StackTrade { get; set; }
        
    }
}
