using System;

using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models
{
    public class CreateNewRequestModel
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Wkt { get; set; }
        public int WardId { get; set; }
    }
}
