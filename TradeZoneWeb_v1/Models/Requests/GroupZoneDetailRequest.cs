using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class GroupZoneDetailRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<int> ListZoneId { get; set; }
        public int Type { get; set; }
    }
}
