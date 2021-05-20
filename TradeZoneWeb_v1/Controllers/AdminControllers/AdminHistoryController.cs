using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.AdminControllers
{
    [Authorize(Roles = Role.Admin)]
    public class AdminHistoryController : Controller
    {
        private readonly IAdminHistoryService _adminHistoryService;

        public AdminHistoryController(IAdminHistoryService adminHistoryService)
        {
            _adminHistoryService = adminHistoryService;
        }
        [Route("admin-history/[action]")]
        public ActionResult Building()
        {
            return View();
        }
        [Route("admin-history/[action]")]
        public ActionResult Store()
        {
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> GetHistory([FromBody] PagingRequestHistory request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            PagedResults<HistoryModel> pageResult = await _adminHistoryService.GetHistory(request, jwt);
            if (pageResult.Results != null)
            {
                @Enum.Parse(typeof(ActionStoreEnum.ActionSurvey), pageResult.Results[0].Action.ToString());
            }
            return Json(pageResult);
        }
        [HttpGet]
        [Route("admin-history/details/{id}")]
        public async Task<JsonResult> GetHistoryBuildingDetails(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            HistoryDetailsModel json = await _adminHistoryService.GetHistoryDetails(id, jwt);
            return Json(json);
        }
    }
}
