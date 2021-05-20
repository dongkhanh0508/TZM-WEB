using System.Collections.Generic;

namespace TradeZoneWeb_v1.Models
{
    public class DistrictModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<WardModel> Wards { get; set; }
    }
}