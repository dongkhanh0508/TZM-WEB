using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class AssetsService : IAssetsService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public AssetsService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public async Task<object> DeleteAsset(Guid id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.DeleteAsync(_config["api-v"] + "/assets/" + id);
            var body = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                return body;
            }
            else
            {
                return null;
            }
        }
       
        public async Task<object> GetAsset(PagingAssetRequest request,string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/assets?TypeAsset="+(int)request.TypeAsset+ "&StoreId="+request.StoreId);
            if (response.StatusCode == HttpStatusCode.NoContent) return null;
            var body = await response.Content.ReadAsStringAsync();
            var rs = JsonConvert.DeserializeObject<PagedResults<AssetModel>>(body);
            return rs;
        }

        public async Task<object> GetAssetAmount(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/assets/amount-unit");
            if (response.StatusCode == HttpStatusCode.NoContent) return null;
            var body = await response.Content.ReadAsStringAsync();           
            return body;
        }

        public async Task<object> GetAssetById(Guid id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/assets/" + id);
            var body = await response.Content.ReadAsStringAsync();
            return body;
        }

        public async Task<object> GetViolationLogs(PagingAssetRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/assets/violation-logs?StoreId=" + request.StoreId+ "&SortType=1&ColName=StartTime");
            if (response.StatusCode == HttpStatusCode.NoContent) return null;
            var body = await response.Content.ReadAsStringAsync();
            var rs = JsonConvert.DeserializeObject<PagedResults<LogViolationResponse>>(body);
            return rs;
        }

        public async Task<object> GetViolationLogsById(int id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/assets/violation-logs/" + id);
            var body = await response.Content.ReadAsStringAsync();
            return body;
        }

        public async Task<object> PostAsset(AssetRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(_config["api-v"] + "/assets/", httpContent);
            var body = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                return body;
            }
            else
            {
                return null;
            }
        }

        public async Task<object> PutAsset(Guid id, AssetRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PutAsync(_config["api-v"] + "/assets/" + id, httpContent);
            var body = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                return body;
            }
            else
            {
                return null;
            }
        }
        public async Task<object> GetAssetLocation(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/assets/Assets-Location");
            if (response.StatusCode == HttpStatusCode.NoContent) return null;
            var body = await response.Content.ReadAsStringAsync();
            return body;
        }
    }
}
