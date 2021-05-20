using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models
{
    public class BrandAccountModel
    {
        public List<BrandModel> Brands { get; set; }
        public AccountModel Account { get; set; }
    }
}
