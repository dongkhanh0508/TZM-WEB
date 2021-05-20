using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers
{
    [Authorize(Roles = Role.Brand)]
    public class DashboardController : Controller
    {
        private readonly IAdminHistoryService _adminHistoryService;      
        public DashboardController(IAdminHistoryService adminHistoryService)
        {
            _adminHistoryService = adminHistoryService;
        }
        [Route("dashboard/[action]")]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("dashboard/history")]
        public async Task<JsonResult> GetHistory([FromBody] PagingRequestHistory request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            PagedResults<HistoryModel> pageResult = await _adminHistoryService.GetHistory(request, jwt);
            if(pageResult.Results != null)
            {
                @Enum.Parse(typeof(ActionStoreEnum.ActionSurvey), pageResult.Results[0].Action.ToString());
            }          
            return Json(pageResult);
        }
    }
}