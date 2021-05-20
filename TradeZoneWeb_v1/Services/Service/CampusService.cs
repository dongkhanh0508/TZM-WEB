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
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class CampusService : ICampusService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        public CampusService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }
        public async Task<object> AddNewCampus(AddCampusRequest request, string jwt)
        {
            var geom = Helper.FormatToGeoJson(Helper.ParseStringToGeoMetry(request.Wkt));
            request.Geom = geom;
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PostAsync(_config["api-v"] + "/campus", httpContent);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }

        public async Task<object> DeleteCampus(CampusDetailRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.DeleteAsync(_config["api-v"] + "/campus/" + request.Id);
                if (response.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }
            return true;
        }

        public async Task<object> GetCampusById(CampusDetailRequest request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/campus/" + request.Id);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }
            var responseData = await response.Content.ReadAsStringAsync();
            return responseData;
        }
        public async Task<object> EditCampus(CampusDetailRequest request, string jwt)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.PutAsync(_config["api-v"] + "/campus/" + request.Id, httpContent);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                return false;
            };
            return true;
        }
    }
}
