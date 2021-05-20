using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IAdminManagementBrandService
    {              
        Task<List<BrandModel>> GetBrand(string jwt);
        Task<object> DeleteBrand(int id, string jwt);
        Task<object> GetBrandById(int id, string jwt);
        Task<object> PostBrand(PostBrandRequest request, string jwt);
        Task<object> PutBrand(int id, PostBrandRequest model, string jwt);
        Task<object> ApprovalOrRejectBrand(int id, int type, string jwt);
    }
}
