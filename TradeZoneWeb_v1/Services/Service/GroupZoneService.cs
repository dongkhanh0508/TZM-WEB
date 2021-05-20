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
    public class GroupZoneService : IGroupZoneService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public GroupZoneService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public async Task<object> AddNewGroupZone(GroupZoneDetailRequest request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/group-zones", httpContent);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }

        public async Task<object> DeleteGroupZone(GroupZoneDetailRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.DeleteAsync(_config["api-v"] + "/group-zones/" + request.Id);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }

        public async Task<object> GetFreeWards(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/group-zones/free-wards");
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetFreeSystemZones(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/group-zones/free-systemzones");
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetFreeDistricts(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/group-zones/free-districts");
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }

        public async Task<object> GetGroupZone(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/group-zones");
            if(response.StatusCode != HttpStatusCode.OK)
            {
                return "Error";
            }
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetStoreByGroupZoneId(int idGroupZone, int idTradeZoneVer, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/group-zones/" + idGroupZone + "/stores-tradezones?tradeverisonId=" + idTradeZoneVer);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
    }
}
