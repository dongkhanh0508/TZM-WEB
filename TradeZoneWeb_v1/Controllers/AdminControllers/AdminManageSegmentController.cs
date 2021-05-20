using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models.Requests;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers.AdminControllers
{
    [Authorize(Roles = Role.Admin)]
    public class AdminManageSegmentController : Controller
    {
        private readonly ISegmentServices _SegmentServices;

        public AdminManageSegmentController(ISegmentServices SegmentServices)
        {
            _SegmentServices = SegmentServices;
        }

        [Route("admin-manage-segment/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = Request.Cookies["jwtToken"];
            var rs = await _SegmentServices.GetAllSegment(jwt);
            return View(rs);
        }

        [HttpGet]
        [Route("admin-manage-segment/details/{id}")]
        public async Task<object> GetSegmentById(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _SegmentServices.GetSegmentById(id, jwt);
            return json;
        }

        [HttpDelete]
        [Route("admin-manage-segment/delete/{id}")]
        public async Task<object> DeleteSegmentById(int id)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _SegmentServices.DeleteSegment(id, jwt);
            return json;
        }

        [HttpPut]
        [Route("admin-manage-segment/update/{id}")]
        public async Task<object> UpdateSegment(int id, [FromBody] SegmentRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _SegmentServices.PutSegment(id, request, jwt);
            return json;
        }

        [HttpPost]
        [Route("admin-manage-segment/insert")]
        public async Task<object> InsertSegment([FromBody] SegmentRequest request)
        {
            string jwt = Request.Cookies["jwtToken"];
            if (jwt == null) return null;
            var json = await _SegmentServices.PostSegment(request, jwt);
            return json;
        }
    }
}