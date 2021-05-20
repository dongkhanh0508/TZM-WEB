using System.Collections.Generic;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface ISegmentServices
    {
        Task<List<SegmentModel>> GetAllSegment(string jwt);
        Task<object> GetSegmentById(int id, string jwt);
        Task<object> DeleteSegment(int id, string jwt);
        Task<object> PostSegment(SegmentRequest request, string jwt);
        Task<object> PutSegment(int id, SegmentRequest model, string jwt);
    }
}