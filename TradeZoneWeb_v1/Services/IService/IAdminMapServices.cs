using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IAdminMapServices
    {
        Task<bool> AddNewCampus(CreateNewRequestModel request, string jwt);
        Task<bool> AddStreetSeqment(CreateNewRequestModel request, string jwt);
        Task<object> AssignSurveyForStore(int storeId, string jwt);
        Task<object> ApproveRequestForStore(int storeId, string jwt);
    }
}
