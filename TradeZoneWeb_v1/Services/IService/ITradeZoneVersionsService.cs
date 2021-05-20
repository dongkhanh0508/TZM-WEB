using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface ITradeZoneVersionsService
    {
        Task<object> InsertTradeZoneVersion(TradeZoneRequest request, string jwt);
        Task<object> GetAllTradeZoneVersion(string jwt);
        Task<object> GetTradeZoneVersionById(int id, string jwt);
        Task<object> ActiveTradeZoneVersionById(int id, string jwt);
        Task<object> DeleteTradeZoneVersion(int id, string jwt);
        Task<object> GetTradeZoneActive(string jwt);
        Task<object> GetGroupZoneByTradeZoneVersionId(int id, string jwt);
        Task<object> GetAllElementOfTradeZoneVersion(string jwt);
    }
}
