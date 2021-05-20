using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static TradeZoneWeb_v1.Helpers.TypeAssetEnum;

namespace TradeZoneWeb_v1.Models
{
    public class AssetReportResponse
    {
        public TypeAsset TypeAsset { get; set; }
        public int Total { get; set; }
    }
}
