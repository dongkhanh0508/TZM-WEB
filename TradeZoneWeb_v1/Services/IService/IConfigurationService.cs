using System.Collections.Generic;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.AdminModel;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IConfigurationService
    {
        Task<List<Configuration>> GetConfig(string jwt, int version);

        Task<object> PutConfig(int id, ConfigurationRequest model, string jwt);

        Task<object> ChangVersion(ChangeVersionConfig model, string jwt);

        Task<ListVersionConfig> GetVersionList(string jwt);
    }
}