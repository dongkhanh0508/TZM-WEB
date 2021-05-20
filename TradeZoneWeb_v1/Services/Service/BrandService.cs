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
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class BrandService : IBrandServices
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public BrandService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public async Task<string> Add(AccountModel acc, string jwt)
        {
            AddBranch req = new AddBranch
            {
                Id = acc.Id,
                FireBaseUid = "",
                Fullname = "",
                PhoneNumber = "",
                Email = "",
                Role = Int32.Parse(acc.Role),
                FcmToken = "",
                BrandName = acc.BrandName,
                IconUrl = "",
                ImageUrl = ""
            };
            var json = JsonConvert.SerializeObject(req);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/accounts", httpContent);
            if (response.StatusCode == HttpStatusCode.Forbidden)
            {
                return "Forbidden";
            }
            if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                return "Unauthorized";
            }
            var newJwt = await response.Content.ReadAsStringAsync();
            return newJwt;
        }

        public async Task<List<BrandModel>> GetAllBrand(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/brands");
            var body = await response.Content.ReadAsStringAsync();
            var listBrand = JsonConvert.DeserializeObject<List<BrandModel>>(body);
            return listBrand;
        }
    }
}