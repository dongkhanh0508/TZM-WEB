using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Helpers
{
    public class Helper
    {
        public static ClaimsPrincipal Validate(string jwtToken, IConfiguration _iConfiguration)
        {
            if (string.IsNullOrEmpty(jwtToken))
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

        public static Geometry ParseStringToGeoMetry(String WKT)
        {
            // Create a Well Known Text Reader from NetTopologySuite
            WKTReader Reader = new WKTReader();
            // NetTopologySuite passes back a GeoApi IGeometry.  This is a shared interface that can be used by both libraries.
            Geometry Geom = Reader.Read(WKT);
            return Geom;
        }
        public static JObject FormatToGeoJson(Geometry geometry)
        {
            string geoJson;
            var serializer = GeoJsonSerializer.Create();
            using (var stringWriter = new StringWriter())
            using (var jsonWriter = new JsonTextWriter(stringWriter))
            {
                serializer.Serialize(jsonWriter, geometry);
                geoJson = stringWriter.ToString();
            }
            var Result = JObject.Parse(geoJson);
            return Result;
        }
    }
}
