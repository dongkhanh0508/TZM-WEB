using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models
{
    public class LogViolationResponse
    {
        public int Id { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Description { get; set; }
        public Guid? AssetId { get; set; }
        public string AssetName { get; set; }
        public int? StoreId { get; set; }
        public string StoreName { get; set; }
        public int TypeViolation { get; set; }
        public int Severity { get; set; }
        public string Geom { get; set; }
    }
}
