namespace TradeZoneWeb_v1.Models
{
    public class BrandModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool? Active { get; set; }
        public string IconUrl { get; set; }
        public string ImageUrl { get; set; }
        public int? SegmentId { get; set; }
        public bool? IsApproved { get; set; }
        public string SegmentName { get; set; }

    }
}