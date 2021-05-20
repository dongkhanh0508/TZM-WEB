using System;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IAssetsService
    {
        Task<object> GetAssetById(Guid id, string jwt);
        Task<object> GetAsset(PagingAssetRequest request, string jwt);
        Task<object> GetViolationLogs(PagingAssetRequest request, string jwt);
        Task<object> GetViolationLogsById(int id, string jwt);
        Task<object> DeleteAsset(Guid id, string jwt);
        Task<object> PostAsset(AssetRequest request, string jwt);
        Task<object> PutAsset(Guid id, AssetRequest model, string jwt);
        Task<object> GetAssetAmount(string jwt);
        Task<object> GetAssetLocation(string jwt);
    }
}