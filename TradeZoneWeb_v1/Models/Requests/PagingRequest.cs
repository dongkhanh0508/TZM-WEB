using static TradeZoneWeb_v1.Helpers.HistoryEnum;
using static TradeZoneWeb_v1.Helpers.SortType;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class PagingRequest
    {
        public int? Page { get; set; } = 1;
        public int? PageSize { get; set; } = 10;
        public string KeySearch { get; set; } = "";
        public SortOrder SortType { get; set; } = 0;
        public HistoryColumn ColName { get; set; } = (HistoryColumn)0;
    }
}
