using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.AdminModel
{
    public class ListVersionConfig
    {
        public int CurrentActive { get; set; }
        public List<int> VersionList { get; set; }
    }
}
