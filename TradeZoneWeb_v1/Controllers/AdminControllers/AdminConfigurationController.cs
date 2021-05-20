using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.AdminControllers
{
    [Authorize(Roles = Role.Admin)]
    public class AdminConfigurationController : Controller
    {
        private readonly IConfigurationService _configurationService;

        public AdminConfigurationController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        [Route("admin-configuration/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            
            ViewBag.ListVersion = await _configurationService.GetVersionList(jwt);
            return View();
        }
        [HttpPost]
        [Route("admin-configuration/get-data")]
        public async Task<object> GetData([FromBody] ConfigurationRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var rs = await _configurationService.GetConfig(jwt, request.Version);
            return rs;
        }

        [HttpPut]
        [Route("admin-configuration/update/{id}")]
        public async Task<object> UpdateConfiguration(int id, [FromBody] ConfigurationRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _configurationService.PutConfig(id, request, jwt);
            return json;
        }
        [HttpPut]
        [Route("admin-configuration/change-version")]
        public async Task<object> ChangeVersionConfiguration([FromBody] ChangeVersionConfig request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _configurationService.ChangVersion(request, jwt);
            return json;
        }
    }
}