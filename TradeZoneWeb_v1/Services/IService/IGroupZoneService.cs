using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IGroupZoneService
    {
        Task<object> GetFreeWards(string jwt);
        Task<object> GetFreeSystemZones(string jwt);
        Task<object> GetFreeDistricts(string jwt);
        Task<object> GetGroupZone(string jwt);
        Task<object> AddNewGroupZone(GroupZoneDetailRequest request,string jwt);
        Task<object> DeleteGroupZone(GroupZoneDetailRequest request, string jwt);
        Task<object> GetStoreByGroupZoneId(int idGroupZone, int idTradeZoneVer, string jwt);
    }
}
