using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface ITradeZoneService
    {
        Task<object> InitTradeZone(InitTradeZoneRequest request, string jwt);
        Task<object> InsertTradeZone(TradeZoneRequest request, string jwt);
        Task<object> GetTradeZone(string jwt);
    }
}
