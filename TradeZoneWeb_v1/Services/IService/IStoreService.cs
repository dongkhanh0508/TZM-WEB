using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IStoreService
    {
        Task<List<StoreModel>> GetAllBrandStore(string jwt);
        Task<object> InitStoreDetail(StoreRequest request, string jwt);
        Task<object> AssignSurveyForStore(StoreRequest request, string jwt);
        Task<object> ApproveRequestForStore(StoreRequest request, string jwt);
        Task<object> RejectRequestForStore(StoreRequest request, string jwt);
        Task<object> GetStoreByOrder(OrderRequest request, string jwt);
    }
}
