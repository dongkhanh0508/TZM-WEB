using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class SystemZoneService : ISystemZoneService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        public SystemZoneService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }
        public async Task<object> AddNewSystemZone(AddNewSystemZoneRequest request, string jwt)
        {
            var geom = Helper.FormatToGeoJson(Helper.ParseStringToGeoMetry(request.Wkt));
            request.Geom = geom;
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/system-zones", httpContent);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                return "Error";
            }
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetSurveyorOfSystemZone(SystemZoneRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/system-zones/surveyors?id=" + request.SystemZoneId);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetAllSurveyorForSystemZone(SystemZoneRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/system-zones/free-surveyors?systemzoneId=" + request.SystemZoneId);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<JObject> RemoveSurveyorFromSystemZone(SurveyorSystemRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.DeleteAsync(_config["api-v"] + "/system-zones/" + request.AccountId + "/" + request.SystemZoneId);
            var responseData = await response.Content.ReadAsStringAsync();
            JObject result = JObject.Parse(responseData);
            return result;
        }
        public async Task<object> CheckSystemZoneClose(SystemZoneRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/system-zones/check-close?id=" + request.SystemZoneId);
            if (response.StatusCode == HttpStatusCode.NoContent)
            {
                return "No content";
            }
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> AssignSurveyorForSystemZone(SurveyorSystemRequest request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/system-zones/assign-surveyor", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }

        public async Task<object> UpdateNameSystemZone(UpdateNameSystemZoneRequest request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/system-zones/" + request.Id, httpContent);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                return true;
            }
            return false;
        }
        public async Task<object> DeleteSystemZone(UpdateNameSystemZoneRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.DeleteAsync(_config["api-v"] + "/system-zones/" + request.Id);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                return true;
            }
            return false;
        }
        public async Task<object> CheckSystemZoneFull(SystemZoneRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/system-zones/check-full-fill?id=" + request.SystemZoneId);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
    }
}
