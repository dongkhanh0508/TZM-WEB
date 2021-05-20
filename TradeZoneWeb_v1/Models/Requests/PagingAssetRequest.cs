using static TradeZoneWeb_v1.Helpers.TypeAssetEnum;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class PagingAssetRequest : PagingRequest
    {
        public TypeAsset TypeAsset { get; set; } = 0;
        public int StoreId { get; set; }
    }
}