using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class PostAccountRequest
    {
        public string Fullname { get; set; } = "";
        public string PhoneNumber { get; set; } = "";
        public string Email { get; set; } = "";
        public int Role { get; set; } = -1;
        public string ImageUrl { get; set; } = "";
        public int BrandId { get; set; } = -1;
    }
}
