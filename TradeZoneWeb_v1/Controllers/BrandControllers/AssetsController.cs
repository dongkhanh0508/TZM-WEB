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
    public class AssetsController : Controller
    {
        private readonly IAssetsService _assetsService;
        private readonly IMyStoreService _myStoreService;

        public AssetsController(IAssetsService assetsService, IMyStoreService myStoreService)
        {
            _assetsService = assetsService;
            _myStoreService = myStoreService;
        }

        [Route("manage-assets/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            //var rs = await _assetsService.GetAsset(jwt);
            var listStores =await _myStoreService.GetMyStore(jwt);
            ViewBag.Stores = listStores;
            return View();
        }
        [HttpPost]
        [Route("manage-assets/get-assets")]
        public async Task<object> GetAssets([FromBody] PagingAssetRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var rs = await _assetsService.GetAsset(request, jwt);
            return rs;
        }
        [HttpGet]
        [Route("manage-assets/details/{id}")]
        public async Task<object> GetAssetById(Guid id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _assetsService.GetAssetById(id, jwt);
            return json;
        }

        [HttpGet]
        [Route("manage-assets/amount")]
        public async Task<object> GetAmountOfUnit()
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _assetsService.GetAssetAmount(jwt);
            return json;
        }

        [HttpDelete]
        [Route("manage-assets/delete/{id}")]
        public async Task<object> DeleteAssetById(Guid id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _assetsService.DeleteAsset(id, jwt);
            return json;
        }

        [HttpPut]
        [Route("manage-assets/update/{id}")]
        public async Task<object> UpdateAsset(Guid id, [FromBody] AssetRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _assetsService.PutAsset(id, request, jwt);
            return json;
        }

        [HttpPost]
        [Route("manage-assets/insert")]
        public async Task<object> InsertAsset([FromBody] AssetRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _assetsService.PostAsset(request, jwt);
            return json;
        }
    }
}