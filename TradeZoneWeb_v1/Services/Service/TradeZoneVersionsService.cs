using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class TradeZoneVersionsService : ITradeZoneVersionsService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        public TradeZoneVersionsService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }
        public async Task<object> InsertTradeZoneVersion(TradeZoneRequest request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/trade-zone-versions", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetAllTradeZoneVersion(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/trade-zone-versions");
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetTradeZoneVersionById(int id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/trade-zone-versions/" + id);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> ActiveTradeZoneVersionById(int id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/trade-zone-versions/" + id, null);
            if(response.StatusCode == HttpStatusCode.OK)
            {
                return true;
            }
            return false;
        }
        public async Task<object> GetTradeZoneActive(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/trade-zone-versions/active-version");
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> DeleteTradeZoneVersion(int id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.DeleteAsync(_config["api-v"] + "/trade-zone-versions/" + id);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return responseData;
            }
            return false;
        }
        public async Task<object> GetGroupZoneByTradeZoneVersionId(int id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/trade-zone-versions/" + id + "/group-zones");
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return responseData;
            }
            return false;
        }
        public async Task<object> GetAllElementOfTradeZoneVersion(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/trade-zone-versions/trade-zones-version-active/group-zones");
            if(response.StatusCode == HttpStatusCode.NoContent)
            {
                return 204;
            } else if(response.StatusCode == HttpStatusCode.OK)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return responseData;
            }
            return null;
        }
    }
}
