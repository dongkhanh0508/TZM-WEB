using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IMapService
    {
        Task<JObject> LoadWardForMap(RequestBodyForMap request, string jwt);
        Task<JObject> LoadWardPolygonForMap(RequestBodyForMap request, string jwt);
        Task<JObject> LoadDistrictForMap(RequestBodyForMap request, string jwt);
        Task<JObject> LoadCampusForMap(RequestBodyForMap request, string jwt);
        Task<JObject> LoadSystemZoneForMap(RequestBodyForMap request, string jwt);
        Task<object> CheckValidSystemZone(RequestBodyForMap request, string jwt);
        Task<object> CheckValidCampus(RequestBodyForMap request, string jwt);
        Task<JObject> GetStoreForMap(RequestBodyForMap request, string jwt);
        Task<JObject> GetBuildingForMap(RequestBodyForMap request, string jwt);
        Task<object> CheckValidGroupZone(RequestBodyForCheckValidGroupZone request, string jwt);
    }
}
