using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.BrandControllers
{
    [Authorize(Roles = Role.Brand)]
    public class CheckLocationController : Controller
    {
        private readonly IStoreService _iStoreServices;
        public CheckLocationController(IStoreService iStoreServices)
        {
            _iStoreServices = iStoreServices;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<object> GetStoreByOrder([FromBody] OrderRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            var result = await _iStoreServices.GetStoreByOrder(request, jwt);
            return result;
        }
    }
}
