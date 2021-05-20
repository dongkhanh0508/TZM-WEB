using System.Collections.Generic;

namespace TradeZoneWeb_v1.Models
{
    public class StateModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DistrictModel> Models { get; set; }
    }
}