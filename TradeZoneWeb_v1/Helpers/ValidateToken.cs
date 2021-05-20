using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TradeZoneWeb_v1.Helpers
{
    public static class ValidateToken
    {
        public static ClaimsPrincipal Validate(string jwtToken, IConfiguration _iConfiguration)
        {
            if(string.IsNullOrEmpty(jwtToken))
            {
                return null;
            }
            IdentityModelEventSource.ShowPII = true;
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateLifetime = true,

                ValidAudience = _iConfiguration["AppSettings:Issuer"],
                ValidIssuer = _iConfiguration["AppSettings:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_iConfiguration["AppSettings:Secret"]))
            };

            ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out _);

            return principal;
        }
    }
}