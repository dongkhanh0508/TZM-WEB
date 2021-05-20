using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface ISystemZoneService
    {
        Task<object> AddNewSystemZone(AddNewSystemZoneRequest request, string jwt);
        Task<object> GetSurveyorOfSystemZone(SystemZoneRequest request, string jwt);
        Task<object> GetAllSurveyorForSystemZone(SystemZoneRequest request, string jwt);
        Task<JObject> RemoveSurveyorFromSystemZone(SurveyorSystemRequest request, string jwt);
        Task<object> AssignSurveyorForSystemZone(SurveyorSystemRequest request, string jwt);
        Task<object> UpdateNameSystemZone(UpdateNameSystemZoneRequest request, string jwt);
        Task<object> DeleteSystemZone(UpdateNameSystemZoneRequest request, string jwt);
        Task<object> CheckSystemZoneClose(SystemZoneRequest request, string jwt);
        Task<object> CheckSystemZoneFull(SystemZoneRequest request, string jwt);
    }
}
