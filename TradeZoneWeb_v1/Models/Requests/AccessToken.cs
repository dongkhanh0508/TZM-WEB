namespace TradeZoneWeb_v1.Models.Requests
{
    public class AccessToken
    {
        public string Token_type { get; set; }
        public string Access_token { get; set; }
        public string Expires_in { get; set; }
    }
}