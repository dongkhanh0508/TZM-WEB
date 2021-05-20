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
    public class ManagementAccountController : Controller
    {
        private readonly IManagementAccountService _managementAccount;
        private readonly IBrandServices _iBrandServices;

        public ManagementAccountController(IManagementAccountService managementAccount, IBrandServices iBrandServices)
        {
            _managementAccount = managementAccount;
            _iBrandServices = iBrandServices;
        }
        [Route("manage-account/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            var rs = await _managementAccount.GetAccount(jwt);
            List<BrandModel> listBrand = await _iBrandServices.GetAllBrand(jwt);
            ViewBag.ListBrand = listBrand;
            return View(rs);
        }
        [HttpGet]
        [Route("manage-account/details/{id}")]
        public async Task<object> GetAccountById(Guid id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _managementAccount.GetAccountById(id, jwt);
            return json;
        }

        [HttpDelete]
        [Route("manage-account/delete/{id}")]
        public async Task<object> DeleteAccountById(Guid id)
        {
            Guid currentAccountId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _managementAccount.DeleteAccount(id, jwt, currentAccountId);
            return json;
        }

        [HttpPut]
        [Route("manage-account/update/{id}")]
        public async Task<object> UpdateAccount(Guid id, [FromBody] PutAccountRequest request)
        {
            int brandId = Convert.ToInt32(User.FindFirst("BrandId")?.Value);
            int role = Convert.ToInt32(User.FindFirst(ClaimTypes.Role)?.Value);
            request.BrandId = brandId;
            request.Role = role;
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _managementAccount.PutAccount(id, request, jwt);
            return json;
        }

        [HttpPost]
        [Route("manage-account/insert")]
        public async Task<object> InsertAccount([FromBody] PostAccountRequest request)
        {
            int brandId = Convert.ToInt32(User.FindFirst("BrandId")?.Value);
            int role = Convert.ToInt32(User.FindFirst(ClaimTypes.Role)?.Value);
            request.BrandId = brandId;
            request.Role = role;
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _managementAccount.PostAccount(request, jwt);
            return json;
        }      
    }
}
