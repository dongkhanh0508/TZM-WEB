using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.BrandControllers
{
    [Authorize(Roles = Role.Brand)]
    public class ViolationLogsController : Controller
    {
        private readonly IAssetsService _assetsService;
        private readonly IMyStoreService _myStoreService;

        public ViolationLogsController(IAssetsService assetsService, IMyStoreService myStoreService)
        {
            _assetsService = assetsService;
            _myStoreService = myStoreService;
        }

        [Route("violation-logs/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            var listStores =await _myStoreService.GetMyStore(jwt);
            ViewBag.Stores = listStores;
            return View();
        }
        [HttpPost]
        [Route("violation-logs/get-violation-logs")]
        public async Task<object> GetViolationLogs([FromBody] PagingAssetRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var rs = await _assetsService.GetViolationLogs(request, jwt);
            return rs;
        }
        [HttpGet]
        [Route("violation-logs/details/{id}")]
        public async Task<object> GetAssetViolationLogById(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _assetsService.GetViolationLogsById(id, jwt);
            return json;
        }

    }
}