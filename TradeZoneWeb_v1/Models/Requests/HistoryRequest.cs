using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.AdminModel;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class HistoryRequest
    {
        public PagingRequestHistory Request { get; set; }
        public PagedResults<HistoryModel> Result { get; set; }
    }
}
