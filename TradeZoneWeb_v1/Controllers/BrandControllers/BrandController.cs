using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Models;
using TradeZoneWeb_v1.Services.IService;

namespace TradeZoneWeb_v1.Controllers
{
    [Authorize(Roles = Role.Brand)]
    public class BrandController : Controller
    {
        private readonly IBrandServices _iBrandServices;
        private readonly IConfiguration _iConfiguration;

        public BrandController(IBrandServices iBrandServices, IConfiguration iConfiguration)
        {
            _iBrandServices = iBrandServices;
            _iConfiguration = iConfiguration;
        }
        [Route("brand/[action]")]
        public async Task<IActionResult> Index()
        {
            string jwt = HttpContext.Session.GetString("Token");

            List<BrandModel> listBrand = await _iBrandServices.GetAllBrand(jwt);
            BrandAccountModel baModel = new BrandAccountModel
            {
                Brands = listBrand
            };

            return View(baModel);
        }
        [Route("brand/[action]")]
        public async Task<IActionResult> AddBrand(BrandAccountModel baModel)
        {
            if (ModelState.IsValid)
            {
                string jwt = HttpContext.Session.GetString("Token");
                string result = await _iBrandServices.Add(baModel.Account, jwt);
                if (result.Equals("Forbidden"))
                {
                    return View(baModel);
                }
                else if (result.Equals("Unauthorized"))
                {
                    return View(baModel);
                }
                else
                {
                    var userPrincipal = this.ValidateToken(result);
                    var authProperties = new AuthenticationProperties
                    {
                        ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(60),
                        IsPersistent = true
                    };
                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        userPrincipal,
                        authProperties);
                    HttpContext.Session.SetString("Token", result);
                    return RedirectToAction("Index", "TradeZone");
                }
            }
            return View(baModel);
        }
        [Route("brand/[action]")]
        private ClaimsPrincipal ValidateToken(string jwtToken)
        {
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