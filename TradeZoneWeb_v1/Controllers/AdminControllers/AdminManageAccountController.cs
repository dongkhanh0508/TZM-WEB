using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.AdminControllers
{
    [Authorize(Roles = Role.Admin)]
    public class AdminManageAccountController : Controller
    {
        private readonly IAdminManagementAccountService _adminManagementAccountService;
        private readonly IBrandServices _iBrandServices;

        public AdminManageAccountController(IAdminManagementAccountService adminManagementAccountService, IBrandServices iBrandServices)
        {
            _adminManagementAccountService = adminManagementAccountService;
            _iBrandServices = iBrandServices;
        }

        [Route("admin-manage-account/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            var rs = await _adminManagementAccountService.GetAccount(jwt);
            List<BrandModel> listBrand = await _iBrandServices.GetAllBrand(jwt);
            ViewBag.ListBrand = listBrand;
            return View(rs);
        }

        [HttpGet]
        [Route("admin-manage-account/details/{id}")]
        public async Task<object> GetAccountById(Guid id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _adminManagementAccountService.GetAccountById(id, jwt);
            return json;
        }

        [HttpDelete]
        [Route("admin-manage-account/delete/{id}")]
        public async Task<object> DeleteAccountById(Guid id)
        {
            Guid currentAccountId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _adminManagementAccountService.DeleteAccount(id, jwt, currentAccountId);
            return json;
        }

        [HttpPut]
        [Route("admin-manage-account/update/{id}")]
        public async Task<object> UpdateAccount(Guid id, [FromBody] PutAccountRequest request)
        {
            Guid currentAccountId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _adminManagementAccountService.PutAccount(id, request, jwt, currentAccountId);
            return json;
        }

        [HttpPost]
        [Route("admin-manage-account/insert")]
        public async Task<object> InsertAccount([FromBody] PostAccountRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _adminManagementAccountService.PostAccount(request, jwt);
            return json;
        }
    }
}