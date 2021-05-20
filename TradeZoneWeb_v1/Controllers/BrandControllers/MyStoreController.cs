using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
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
    public class MyStoreController : Controller
    {
        private readonly IMyStoreService _myStoreService;

        public MyStoreController(IMyStoreService myStoreService)
        {
            _myStoreService = myStoreService;          
        }
        [Route("manage-mystore/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            var rs = await _myStoreService.GetMyStore(jwt);
            if (rs != null)
            {
                WKTReader Reader = new WKTReader();
                // NetTopologySuite passes back a GeoApi IGeometry.  This is a shared interface that can be used by both libraries.
                for (int i = 0; i < rs.Count; i++)
                {
                    Geometry Geom = Reader.Read(rs[i].Wkt);
                    Geom.SRID = 4326;
                    rs[i].StoreGeom = Geom;
                }
            }
            return View(rs);
        }
        [HttpGet]
        [Route("manage-mystore/details/{id}")]
        public async Task<object> GetMyStoreById(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _myStoreService.GetMyStoreById(id, jwt);
            return json;
        }       

        [HttpDelete]
        [Route("manage-mystore/delete/{id}")]
        public async Task<object> DeleteMyStoreById(int id)
        {
            
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _myStoreService.DeleteMyStore(id, jwt);
            return json;
        }

        [HttpPut]
        [Route("manage-mystore/update/{id}")]
        public async Task<object> UpdateMyStore(int id, [FromBody] PutMyStoreRequest request)
        {                 
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _myStoreService.PutMyStore(id, request, jwt);
            return json;
        }

        [HttpPost]
        [Route("manage-mystore/insert")]
        public async Task<object> InsertMyStore([FromBody] PostMyStoreRequest request)
        {
            int brandId = Convert.ToInt32(User.FindFirst("BrandId")?.Value);
            request.BrandId = brandId;
            string jwt = Request.Cookies["jwtToken"];            
            if (jwt == null) return null;
            var json = await _myStoreService.PostMyStore(request, jwt);
            return json;
        }     
    }
}
