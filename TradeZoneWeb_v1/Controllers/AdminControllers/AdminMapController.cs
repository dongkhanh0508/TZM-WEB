using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.AdminControllers
{
    [Authorize(Roles = Role.Admin)]
    public class AdminMapController : Controller
    {
        private readonly IMapService _iMapService;
        private readonly ISystemZoneService _iSystemZoneService;
        private readonly IBuildingService _iBuildingService;
        private readonly IStoreService _iStoreService;
        private readonly IStreetSegmentService _iStreetSegmentService;
        private readonly ICampusService _iCampusService;
        public AdminMapController(
            IMapService iMapService,
            ISystemZoneService iSystemZoneService,
            IBuildingService iBuildingService,
            IStoreService iStoreService,
            IStreetSegmentService iStreetSegmentService,
            ICampusService iCampusService
            )
        {
            _iMapService = iMapService;
            _iSystemZoneService = iSystemZoneService;
            _iBuildingService = iBuildingService;
            _iStoreService = iStoreService;
            _iStreetSegmentService = iStreetSegmentService;
            _iCampusService = iCampusService;
        }
        [Route("admin-map/[action]")]
        public ActionResult Index(string wktStoreString, string storeIdString,
            string storeTypeString, string wktBuildingString, string buildingIdString, int buildingIdOfStore)
        {
            if (!string.IsNullOrEmpty(wktStoreString))
            {
                var geom = Helper.FormatToGeoJson(Helper.ParseStringToGeoMetry(wktStoreString));
                ViewBag.Geom = geom["coordinates"];
                ViewBag.Id = storeIdString;
                ViewBag.Type = storeTypeString;
                ViewBag.BuildingIdOfStore = buildingIdOfStore;
            } else if(!string.IsNullOrEmpty(wktBuildingString))
            {
                var geom = Helper.FormatToGeoJson(Helper.ParseStringToGeoMetry(wktBuildingString).Centroid);
                ViewBag.Geom = geom["coordinates"];
                ViewBag.Id = buildingIdString;
                ViewBag.Type = "Building";
                ViewBag.BuildingIdOfStore = "";
            }
            return View();
        }
        [HttpPost]
        [Route("admin-map/move-to-store")]
        public async Task<ActionResult> MoveToStore()
        {
            string jwt = Request.Cookies["jwtToken"];
            string wkt = Request.Form["Wkt"];
            string id = Request.Form["Id"];
            string type = Request.Form["Type"];
            if(id == null)
            {
                return RedirectToAction("Index", "AdminMap", new
                {
                    wktStoreString = wkt,
                    storeTypeString = type
                });
            }
            StoreRequest req = new StoreRequest
            {
                StoreId = Int32.Parse(id)
            };
            var buildingOfStoreId = await _iBuildingService.GetBuildingByStoreId(req, jwt);
            return RedirectToAction("Index", "AdminMap", new { wktStoreString = wkt,
                storeIdString = id, storeTypeString = type, buildingIdOfStore = buildingOfStoreId});
        }
        [HttpPost]
        [Route("admin-map/move-to-building")]
        public async Task<ActionResult> MoveToBuilding()
        {
            string wkt = Request.Form["Wkt"];
            string id = Request.Form["Id"];
            return RedirectToAction("Index", "AdminMap", new { wktBuildingString = wkt, buildingIdString = id });
        }
        [HttpPost]
        public async Task<JObject> LoadWardForAdminMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iMapService.LoadWardForMap(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<JObject> LoadWardPolygonForAdminMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iMapService.LoadWardPolygonForMap(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<JObject> LoadDistrictForAdminMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iMapService.LoadDistrictForMap(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<JObject> LoadCampusForAdminMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iMapService.LoadCampusForMap(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<JObject> LoadSystemZoneForAdminMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iMapService.LoadSystemZoneForMap(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> CheckValidSystemZone([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iMapService.CheckValidSystemZone(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> CheckValidCampus([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iMapService.CheckValidCampus(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<JObject> GetStoreForMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iMapService.GetStoreForMap(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<JObject> GetBuildingForMap([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iMapService.GetBuildingForMap(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> AddNewSystemZone([FromBody] AddNewSystemZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iSystemZoneService.AddNewSystemZone(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<JObject> RemoveSurveyorFromMap([FromBody] SurveyorSystemRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            JObject result = await _iSystemZoneService.RemoveSurveyorFromSystemZone(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> GetSurveyorOfSystemZone([FromBody] SystemZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iSystemZoneService.GetSurveyorOfSystemZone(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> GetAllSurveyorForSystemZone([FromBody] SystemZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iSystemZoneService.GetAllSurveyorForSystemZone(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> AssignSurveyorForSystemZone([FromBody] SurveyorSystemRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iSystemZoneService.AssignSurveyorForSystemZone(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> InitBuildingDetail([FromBody] BuildingRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iBuildingService.InitBuildingDetail(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> ApproveRequestForBuilding([FromBody] BuildingRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iBuildingService.ApproveRequestForBuilding(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> RejectRequestForBuilding([FromBody] BuildingRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iBuildingService.RejectRequestForBuilding(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> AssignSurveyForBuilding([FromBody] BuildingRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iBuildingService.AssignSurveyForBuilding(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> InitStoreDetail([FromBody] StoreRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStoreService.InitStoreDetail(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> AssignSurveyForStore([FromBody] StoreRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStoreService.AssignSurveyForStore(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> ApproveRequestForStore([FromBody] StoreRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStoreService.ApproveRequestForStore(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<Object> RejectRequestForStore([FromBody] StoreRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStoreService.RejectRequestForStore(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> GetStreetSegmentInRadiusByCoordinate([FromBody] RequestBodyForMap request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStreetSegmentService.GetStreetSegmentInRadiusByCoordinate(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> AddNewCampus([FromBody] AddCampusRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iCampusService.AddNewCampus(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> UpdateNameSystemZone([FromBody] UpdateNameSystemZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iSystemZoneService.UpdateNameSystemZone(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> DeleteSystemZone([FromBody] UpdateNameSystemZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iSystemZoneService.DeleteSystemZone(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> DeleteCampus([FromBody] CampusDetailRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iCampusService.DeleteCampus(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> GetCampusById([FromBody] CampusDetailRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iCampusService.GetCampusById(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> EditCampus([FromBody] CampusDetailRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iCampusService.EditCampus(request, jwt);
            return result;
        }
        [HttpPost]
        public async Task<object> GetBuildingByStoreId([FromBody] StoreRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iBuildingService.GetBuildingByStoreId(request, jwt);
            return result;
        }
        public async Task<object> CheckSystemZoneClose([FromBody] SystemZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iSystemZoneService.CheckSystemZoneClose(request, jwt);
            return result;
        }
        public async Task<object> CheckSystemZoneFull([FromBody] SystemZoneRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iSystemZoneService.CheckSystemZoneFull(request, jwt);
            return result;
        }
        public async Task<object> GetBuildingSegmentForBuilding([FromBody] BuildingRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iBuildingService.GetBuildingSegmentForBuilding(request, jwt);
            return result;
        }
    }
}