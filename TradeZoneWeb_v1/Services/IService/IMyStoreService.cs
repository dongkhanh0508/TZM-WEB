using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IMyStoreService
    {
        Task<object> GetMyStoreById(int id, string jwt);
        Task<List<MyStoreModel>> GetMyStore(string jwt);
        Task<object> DeleteMyStore(int id, string jwt);
        Task<object> PostMyStore(PostMyStoreRequest request, string jwt);
        Task<object> PutMyStore(int id, PutMyStoreRequest model, string jwt);
    }
}
