using System.Collections.Generic;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IBrandServices
    {
        Task<string> Add(AccountModel acc, string jwt);

        Task<List<BrandModel>> GetAllBrand(string jwt);
    }
}