using System;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IBrandMapServices
    {
        Task<object> GetWardInformation(string jwt);
    }
}
