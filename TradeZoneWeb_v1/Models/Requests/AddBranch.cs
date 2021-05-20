using System.ComponentModel.DataAnnotations;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class AddBranch
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string FireBaseUid { get; set; }

        public string Fullname { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public string FcmToken { get; set; }

        [Required]
        public string BrandName { get; set; }

        public string IconUrl { get; set; }
        public string ImageUrl { get; set; }
    }
}