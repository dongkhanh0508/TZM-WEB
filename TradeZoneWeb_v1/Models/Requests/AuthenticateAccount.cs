using System.ComponentModel.DataAnnotations;

namespace TradeZoneWeb_v1.Models.Requests
{
    public class AuthenticateAccount
    {
        [Required]
        public string IdToken { get; set; }

        public string FcmToken { get; set; }
    }
}