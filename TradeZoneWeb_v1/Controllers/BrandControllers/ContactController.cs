using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.BrandControllers
{
    [Authorize(Roles = Role.Brand)]
    public class ContactController : Controller
    {
        

        public ContactController()
        {
                   
        }
        [Route("contact/[action]")]
        public IActionResult Index()
        {                 
            return View();
        }       
    }
}
