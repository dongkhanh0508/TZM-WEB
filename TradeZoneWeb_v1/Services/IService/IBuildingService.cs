using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IBuildingService
    {
        Task<object> InitBuildingDetail(BuildingRequest request, string jwt);
        Task<object> ApproveRequestForBuilding(BuildingRequest request, string jwt);
        Task<object> AssignSurveyForBuilding(BuildingRequest request, string jwt);
        Task<object> RejectRequestForBuilding(BuildingRequest request, string jwt);
        Task<object> GetBuildingByStoreId(StoreRequest request, string jwt);
        Task<object> GetBuildingSegmentForBuilding(BuildingRequest request, string jwt);
    }
}
