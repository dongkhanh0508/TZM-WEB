using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IAdminHistoryService
    {
        Task<PagedResults<HistoryModel>> GetHistory(PagingRequestHistory request, string jwt);
        Task<HistoryDetailsModel> GetHistoryDetails(int id, string jwt);      
    }
}
