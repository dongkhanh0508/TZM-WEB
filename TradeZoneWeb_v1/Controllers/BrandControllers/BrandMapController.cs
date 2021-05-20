using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json.Linq;
using System;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers
{
    [Authorize(Roles = Role.Brand)]
    public class BrandMapController : Controller
    {
        private readonly IBrandMapServices _iBrandMapServices;
        private readonly IStoreService _iStoreServices;
        private readonly IMapService _iMapService;
        private readonly ITradeZoneService _iTradeZoneService;
        private readonly IGroupZoneService _iGroupZoneService;
        private readonly IBuildingService _iBuildingService;
        private readonly ITradeZoneVersionsService _iTradeZoneVersionsService;
        private readonly IAssetsService _iAssetsService;

        public BrandMapController(
            IBrandMapServices iBrandMapServices,
            IStoreService iStoreServices,
            IMapService iMapService,
            ITradeZoneService iTradeZoneService,
            IGroupZoneService iGroupZoneService,
            IBuildingService iBuildingService,
            ITradeZoneVersionsService iTradeZoneVersionsService,
            IAssetsService iAssetsService)
        {
            _iBrandMapServices = iBrandMapServices;
            _iStoreServices = iStoreServices;
            _iMapService = iMapService;
            _iTradeZoneService = iTradeZoneService;
            _iGroupZoneService = iGroupZoneService;
            _iBuildingService = iBuildingService;
            _iTradeZoneVersionsService = iTradeZoneVersionsService;
            _iAssetsService = iAssetsService;
        }

        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStoreServices.GetAllBrandStore(jwt);
            if (result != null)
            {
                WKTReader Reader = new WKTReader();
                // NetTopologySuite passes back a GeoApi IGeometry.  This is a shared interface that can be used by both libraries.
                for (int i = 0; i < result.Count; i++)
                {
                    Geometry Geom = Reader.Read(result[i].Wkt);
                    Geom.SRID = 4326;
                    result[i].Geome = Geom;
                }
            }

            return View(result);
        }
        public async Task<object> LoadWardForBrandMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iMapService.LoadWardForMap(request, jwt);
            return result;
        }
        public async Task<object> LoadDistrictForBrandMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iMapService.LoadDistrictForMap(request, jwt);
            return result;
        }
        public async Task<object> LoadCampusForBrandMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iMapService.LoadCampusForMap(request, jwt);
            return result;
        }
        public async Task<object> GetStoreForBrandMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iMapService.GetStoreForMap(request, jwt);
            return result;
        }
        public async Task<object> GetBuildingForBrandMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iMapService.GetBuildingForMap(request, jwt);
            return result;
        }
        public async Task<object> GetWardInformation()
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iBrandMapServices.GetWardInformation(jwt);
            return result;
        }

        public async Task<object> GetAllBrandStore()
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStoreServices.GetAllBrandStore(jwt);
            if (result != null)
            {
                WKTReader Reader = new WKTReader();
                // NetTopologySuite passes back a GeoApi IGeometry.  This is a shared interface that can be used by both libraries.
                for (int i = 0; i < result.Count; i++)
                {
                    Geometry Geom = Reader.Read(result[i].Wkt);
                    Geom.SRID = 4326;
                    result[i].Geome = Geom;
                }
            }
            return result;
        }
        public async Task<object> InitTradeZone([FromBody] InitTradeZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iTradeZoneService.InitTradeZone(request, jwt);
            return result;
        }

        public async Task<object> GetFreeWardsForGroupZone(int type)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (type == (int)TypeOfGroupZone.Type.Ward)
            {
                return await _iGroupZoneService.GetFreeWards(jwt);
            }
            else if (type == (int)TypeOfGroupZone.Type.SystemZone)
            {
                return await _iGroupZoneService.GetFreeSystemZones(jwt);
            }
            else if (type == (int)TypeOfGroupZone.Type.District)
            {
                return await _iGroupZoneService.GetFreeDistricts(jwt);
            }
            return null;
        }

        public async Task<object> CheckValidGroupZone([FromBody] RequestBodyForCheckValidGroupZone request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iMapService.CheckValidGroupZone(request, jwt);
            return result;
        }
        public async Task<object> AddNewGroupZone([FromBody] GroupZoneDetailRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iGroupZoneService.AddNewGroupZone(request, jwt);
            return result;
        }
        public async Task<object> DeleteGroupZone([FromBody] GroupZoneDetailRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iGroupZoneService.DeleteGroupZone(request, jwt);
            return result;
        }
        public async Task<object> GetGroupZone()
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iGroupZoneService.GetGroupZone(jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> InitBuildingDetail([FromBody] BuildingRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iBuildingService.InitBuildingDetail(request, jwt);
            return result;
        }
        public async Task<Object> InitStoreDetail([FromBody] StoreRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStoreServices.InitStoreDetail(request, jwt);
            return result;
        }
        public async Task<object> GetTradeZone()
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iTradeZoneVersionsService.GetAllTradeZoneVersion(jwt);
            return result;
        }
        public async Task<object> InsertTradeZone([FromBody] TradeZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            foreach (var item in request.TradeZones)
            {
                var geom = Helper.FormatToGeoJson(Helper.ParseStringToGeoMetry(item.Wkt));
                item.Geom = geom;
            }
            var result = await _iTradeZoneVersionsService.InsertTradeZoneVersion(request, jwt);
            return result;
        }
        public async Task<object> GetTradeZoneVersionById(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iTradeZoneVersionsService.GetTradeZoneVersionById(id, jwt);
            return result;
        }
        public async Task<object> ActiveTradeZoneVersionById(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iTradeZoneVersionsService.ActiveTradeZoneVersionById(id, jwt);
            return result;
        }
        public async Task<object> GetTradeZoneActive()
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iTradeZoneVersionsService.GetTradeZoneActive(jwt);
            return result;
        }
        public async Task<object> DeleteTradeZoneVersion(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iTradeZoneVersionsService.DeleteTradeZoneVersion(id, jwt);
            return result;
        }
        public async Task<object> GetGroupZoneByTradeZoneVersionId(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iTradeZoneVersionsService.GetGroupZoneByTradeZoneVersionId(id, jwt);
            return result;
        }
        public async Task<object> GetStoreByGroupZoneId(int idGroupZone, int idTradeZoneVer)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iGroupZoneService.GetStoreByGroupZoneId(idGroupZone, idTradeZoneVer, jwt);
            return result;
        }
        public async Task<object> GetAssetLocation()
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iAssetsService.GetAssetLocation(jwt);
            return result;
        }
        public async Task<object> GetAllElementOfTradeZoneVersion()
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iTradeZoneVersionsService.GetAllElementOfTradeZoneVersion(jwt);
            return result;
        }
        public async Task<JObject> LoadSystemZone([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iMapService.LoadSystemZoneForMap(request, jwt);
            return result;
        }
    }
}