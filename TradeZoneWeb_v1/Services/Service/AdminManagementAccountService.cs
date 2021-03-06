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
    public class AdminManagementAccountService : IAdminManagementAccountService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public AdminManagementAccountService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }
        public async Task<object> DeleteAccount(Guid id, string jwt, Guid currentAccountId)
        {
            if(currentAccountId == id)
            {
                return "409";
            }
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);

            var response = await client.DeleteAsync(_config["api-v"] + "/accounts/" + id);
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

        public async Task<List<AccountModel>> GetAccount(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/accounts");
            if (response.StatusCode == HttpStatusCode.NoContent) return null;
            var body = await response.Content.ReadAsStringAsync();
            var rs = JsonConvert.DeserializeObject<PagedResults<AccountModel>>(body);
            return rs.Results;
        }

        public async Task<object> GetAccountById(Guid id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/accounts/"+id);
            var body = await response.Content.ReadAsStringAsync();           
            return body;
        }

        public async Task<object> PutAccount(Guid id, PutAccountRequest request, string jwt, Guid currentAccountId)
        {
            if (currentAccountId == id)
            {
                if (request.Role != 0)
                {
                    return "405";
                }
            }
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PutAsync(_config["api-v"] + "/accounts/" + id, httpContent);
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

        public async Task<object> PostAccount(PostAccountRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(_config["api-v"] + "/accounts/", httpContent);
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

        public async Task<object> ApprovalOrReject(Guid id, int type, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var httpContent = new StringContent("", Encoding.UTF8, "application/json");
            var response = await client.PutAsync(_config["api-v"] + "/accounts/approval/" + id+"/"+type, httpContent);
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
    }
}
