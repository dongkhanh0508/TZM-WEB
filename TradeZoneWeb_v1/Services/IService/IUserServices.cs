using System;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models;

namespace TradeZoneWeb_v1.Services
{
    public interface IUserServices
    {
        Task<object> Authenticate(string token);
        Task<bool> JwtVerify(string jwtToken);
        FirebaseConfigModel GetConfig();
    }
}