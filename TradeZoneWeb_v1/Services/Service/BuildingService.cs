using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class BuildingService : IBuildingService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        public BuildingService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }
        public async Task<object> InitBuildingDetail(BuildingRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/buildings/" + request.BuildingId);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> ApproveRequestForBuilding(BuildingRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/buildings/approve-building/" + request.BuildingId, null);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> AssignSurveyForBuilding(BuildingRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/buildings/need-survey/" + request.BuildingId, null);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> RejectRequestForBuilding(BuildingRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/buildings/reject-building/" + request.BuildingId, null);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetBuildingByStoreId(StoreRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/buildings/store-id/" + request.StoreId);
            if(response.StatusCode == HttpStatusCode.OK)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var json = JObject.Parse(responseData);
                var result = json["id"].ToString();
                return result;
            }

            return null;
            
        }
        public async Task<object> GetBuildingSegmentForBuilding(BuildingRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/buildings/analysis/" + request.BuildingId);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }

    }
}
