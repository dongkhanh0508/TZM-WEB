using Microsoft.AspNetCore.Mvc;
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
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class AdminMapService : IAdminMapServices
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        public AdminMapService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public Task<bool> AddNewCampus(CreateNewRequestModel request, string jwt)
        {
            throw new NotImplementedException();
        }


        public Task<bool> AddStreetSeqment(CreateNewRequestModel request, string jwt)
        {
            throw new NotImplementedException();
        }
        public async Task<object> AssignSurveyForStore(int storeId, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/stores/need-survey/" + storeId, null);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> ApproveRequestForStore(int storeId, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/stores/approve-store/" + storeId, null);
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
    }
}
