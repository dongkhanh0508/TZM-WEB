using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.AdminControllers
{
    [Authorize(Roles = Role.Admin)]
    public class AdminManageBrandController : Controller
    {
        private readonly IAdminManagementBrandService _adminManagementBrandService;
        private readonly ISegmentServices _categoryServices;

        public AdminManageBrandController(IAdminManagementBrandService adminManagementBrandService, ISegmentServices categoryServices)
        {
            _adminManagementBrandService = adminManagementBrandService;
            _categoryServices = categoryServices;
        }

        [Route("admin-manage-brands/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            var rs = await _adminManagementBrandService.GetBrand(jwt);
            List<SegmentModel> listCategory = await _categoryServices.GetAllSegment(jwt);
            ViewBag.ListCategory = listCategory;
            return View(rs);
        }

        [HttpGet]
        [Route("admin-manage-brands/details/{id}")]
        public async Task<object> GetBrandById(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _adminManagementBrandService.GetBrandById(id, jwt);
            return json;
        }

        [HttpDelete]
        [Route("admin-manage-brands/delete/{id}")]
        public async Task<object> DeleteBrandById(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _adminManagementBrandService.DeleteBrand(id, jwt);
            return json;
        }

        [HttpPut]
        [Route("admin-manage-brands/update/{id}")]
        public async Task<object> UpdateBrand(int id, [FromBody] PostBrandRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _adminManagementBrandService.PutBrand(id, request, jwt);
            return json;
        }

        [HttpPost]
        [Route("admin-manage-brands/insert")]
        public async Task<object> InsertBrand([FromBody] PostBrandRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _adminManagementBrandService.PostBrand(request, jwt);
            return json;
        }
    }
}