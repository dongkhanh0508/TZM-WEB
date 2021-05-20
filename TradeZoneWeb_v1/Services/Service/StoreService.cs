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
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class StoreService : IStoreService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public StoreService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }
        public async Task<List<StoreModel>> GetAllBrandStore(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/stores/brand");
            if(response.StatusCode == HttpStatusCode.OK)
            {
                var body = await response.Content.ReadAsStringAsync();
                var listBrandStores = JsonConvert.DeserializeObject<List<StoreModel>>(body);
                return listBrandStores;
            }
            return null;
        }
        public async Task<object> InitStoreDetail(StoreRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/stores/" + request.StoreId);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> AssignSurveyForStore(StoreRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/stores/need-survey/" + request.StoreId, null);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> ApproveRequestForStore(StoreRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/stores/approve-store/" + request.StoreId, null);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> RejectRequestForStore(StoreRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/stores/reject-store/" + request.StoreId, null);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> GetStoreByOrder(OrderRequest request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/stores/store-order", httpContent);
            if(response.StatusCode == HttpStatusCode.OK)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return responseData;
            } else if(response.StatusCode == HttpStatusCode.NoContent)
            {
                return 204;
            }
            return false;
        }
    }
}
