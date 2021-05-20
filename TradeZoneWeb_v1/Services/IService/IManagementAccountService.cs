using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IManagementAccountService
    {
        Task<object> GetAccountById(Guid id, string jwt);
        Task<List<AccountModel>> GetAccount(string jwt);
        Task<object> DeleteAccount(Guid id, string jwt, Guid currentAccountId);
        Task<object> PostAccount(PostAccountRequest request, string jwt);
        Task<object> PutAccount(Guid id, PutAccountRequest model, string jwt);       
    }
}
