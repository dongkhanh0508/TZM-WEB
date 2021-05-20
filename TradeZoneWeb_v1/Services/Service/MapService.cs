using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class MapService : IMapService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public MapService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public async Task<JObject> LoadWardForMap(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/ward", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            JObject result = JObject.Parse(responseData);
            return result;
        }
        public async Task<JObject> LoadWardPolygonForMap(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/ward-full", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            JObject result = JObject.Parse(responseData);
            return result;
        }
        public async Task<JObject> LoadDistrictForMap(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/district", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            JObject result = JObject.Parse(responseData);
            return result;
        }

        public async Task<JObject> LoadCampusForMap(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/campus", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            JObject result = JObject.Parse(responseData);
            return result;
        }

        public async Task<JObject> LoadSystemZoneForMap(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/system-zone", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            JObject result = JObject.Parse(responseData);
            return result;
        }

        public async Task<object> CheckValidSystemZone(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/ward/check-system-zone", httpContent);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return responseData;
            }
            return false;
        }

        public async Task<object> CheckValidCampus(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/ward/check-new-campus", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }

        public async Task<JObject> GetStoreForMap(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/store", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            JObject result = JObject.Parse(responseData);
            return result;
        }

        public async Task<JObject> GetBuildingForMap(RequestBodyForMap request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/building", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            JObject result = JObject.Parse(responseData);
            return result;
        }
        public async Task<object> CheckValidGroupZone(RequestBodyForCheckValidGroupZone request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/map/ward/check-group-zone-valid", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
    }
}