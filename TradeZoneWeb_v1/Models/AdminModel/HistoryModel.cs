using System;
using TradeZoneWeb_v1.Helpers;

namespace TradeZoneWeb_v1.Models.AdminModel
{
    public class HistoryModel
    {
        public int Id { get; set; }
        public int? StoreId { get; set; }
        public int? BuildingId { get; set; }
        public string ReferenceName { get; set; }
        public Guid? AccountId { get; set; }
        public string AccountName { get; set; }
        public RoleEnum.Role Role { get; set; }
        public int Action { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ModifyDate { get; set; }
        public string Geom { get; set; }
        public string Note { get; set; }
        public int Status { get; set; }
    }
}