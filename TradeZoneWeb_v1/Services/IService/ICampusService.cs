using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface ICampusService
    {
        Task<object> AddNewCampus(AddCampusRequest request, string jwt);
        Task<object> DeleteCampus(CampusDetailRequest request, string jwt);
        Task<object> GetCampusById(CampusDetailRequest request, string jwt);
        Task<object> EditCampus(CampusDetailRequest request, string jwt);
    }
}