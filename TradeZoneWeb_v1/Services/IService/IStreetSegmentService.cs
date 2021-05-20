using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Models.Requests;

namespace TradeZoneWeb_v1.Services.IService
{
    public interface IStreetSegmentService
    {
        Task<object> GetStreetSegmentInRadiusByCoordinate(RequestBodyForMap request, string jwt);
    }
}
