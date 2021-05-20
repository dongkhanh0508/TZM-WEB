using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.AdminModel
{
    public class HistoryDetailsModel
    {
        public int Id { get; set; }
        public int? StoreId { get; set; }
        public Guid? AccountId { get; set; }
        public string AccountName { get; set; }
        public int? Action { get; set; }
        public int? StatusApproval { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        public string Note { get; set; }
        public int? BuildingId { get; set; }
        public Geometry Geom { get; set; }

        public BuidingModel Building { get; set; }
        public StoreModel Store { get; set; }
        public BuidingModel BuildingUpdated { get; set; }
        public StoreModel StoreUpdated { get; set; }
    }
}
