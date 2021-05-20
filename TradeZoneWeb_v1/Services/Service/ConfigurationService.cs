using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
    public class ConfigurationService : IConfigurationService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public ConfigurationService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public async Task<object> ChangVersion(ChangeVersionConfig model, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var json = JsonConvert.SerializeObject(model);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PutAsync(_config["api-v"] + "/configuration/change-version", httpContent);
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

        public async Task<ListVersionConfig> GetVersionList(string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/configuration/list-version");
            if (response.StatusCode == HttpStatusCode.NoContent) return null;
            var body = await response.Content.ReadAsStringAsync();
            var rs = JsonConvert.DeserializeObject<ListVersionConfig>(body);
            return rs;
        }
        public async Task<List<Configuration>> GetConfig(string jwt, int version)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/configuration?version="+version);
            if (response.StatusCode == HttpStatusCode.NoContent) return null;
            var body = await response.Content.ReadAsStringAsync();
            var rs = JsonConvert.DeserializeObject<List<Configuration>>(body);
            return rs;
        }

        public async Task<object> PutConfig(int id, ConfigurationRequest model, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var json = JsonConvert.SerializeObject(model);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PutAsync(_config["api-v"] + "/configuration/" + id, httpContent);
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