using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Services.Service
{
    public class AdminHistoryService : IAdminHistoryService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public AdminHistoryService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
        }

        public async Task<PagedResults<HistoryModel>> GetHistory(PagingRequestHistory request, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/history?Action="
                + (int)request.Action
                + "&Page=" + (request.Page == null?1:request.Page)
                + "&PageSize=" + (request.PageSize == null ? 10 : request.PageSize)
                + (request.KeySearch != null && request.KeySearch != "" ? "&KeySearch=" + request.KeySearch : "")
                + "&SortType=" + 1
                + (request.ColName != 0? "&ColName=" + request.ColName : "&ColName=CreateDate") +"&Type="+request.Type+ "&Status="+(int)request.Status
                );
            if (response.StatusCode == HttpStatusCode.NoContent) return null;
            var body = await response.Content.ReadAsStringAsync();
            var historyPageResults = JsonConvert.DeserializeObject<PagedResults<HistoryModel>>(body);
            return historyPageResults;
        }

        public async Task<HistoryDetailsModel> GetHistoryDetails(int id, string jwt)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_config["BaseUrl"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwt);
            var response = await client.GetAsync(_config["api-v"] + "/history/" + id);
            var body = await response.Content.ReadAsStringAsync();
            var historyDetails = JsonConvert.DeserializeObject<HistoryDetailsModel>(body);
            return historyDetails;
        }

        
    }
}