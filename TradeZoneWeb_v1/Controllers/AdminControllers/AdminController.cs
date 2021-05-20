using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradeZoneWeb_v1.Helpers;

namespace TradeZoneWeb_v1.Controllers.AdminControllers
{
    [Authorize(Roles = Role.Admin)]
    public class AdminController : Controller
    {
        [Route("admin/[action]")]
        public IActionResult Index()
        {
            return View();
        }
    }
}