using static TradeZoneWeb_v1.Helpers.ActionStoreEnum;
using static TradeZoneWeb_v1.Helpers.StatusEnum;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class PagingRequestHistory : PagingRequest
    {
        public ActionSurvey Action { get; set; } = 0;
        public int Type { get; set; } = 0;
        public Status Status { get; set; } = 0;
    }
}
