using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.IO;
using TradeZoneWeb_v1.Helpers;
using TradeZoneWeb_v1.Services;
using TradeZoneWeb_v1.Services.IService;
using TradeZoneWeb_v1.Services.Service;

namespace TradeZoneWeb_v1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        [Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDirectoryBrowser();
            services.AddHttpClient();
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = "/login/index/";
                    options.AccessDeniedPath = "/error/error";
                });
            services.AddSession(option =>
            {
                option.IdleTimeout = TimeSpan.FromDays(7);
            });
            IMvcBuilder builder = services.AddRazorPages();
            services.AddControllers(x => x.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()))).AddNewtonsoftJson(options =>
              {
                  options.SerializerSettings.Converters.Add(new StringEnumConverter { CamelCaseText = true });
                  options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                  options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                  options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                  foreach (var converter in GeoJsonSerializer.Create(new GeometryFactory(new PrecisionModel(), 4326)).Converters)
                  {
                      options.SerializerSettings.Converters.Add(converter);
                  }
              }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddControllers(options =>
            {
                options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()));
            });
            services.AddControllersWithViews();
            services.AddTransient<IUserServices, UserService>();
            services.AddTransient<IBrandServices, BrandService>();
            services.AddTransient<ISegmentServices, SegmentService>();
            services.AddTransient<IAdminMapServices, AdminMapService>();
            services.AddTransient<IAdminHistoryService, AdminHistoryService>();
            services.AddTransient<IAdminManagementAccountService, AdminManagementAccountService>();
            services.AddTransient<IAdminManagementBrandService, AdminManagementBrandService>();
            services.AddTransient<IBrandMapServices, BrandMapService>();
            services.AddTransient<IAssetsService, AssetsService>();           
            services.AddTransient<IManagementAccountService, ManagementAccountService>();          
            services.AddTransient<IStoreService, StoreService>();
            services.AddTransient<IBuildingService, BuildingService>();
            services.AddTransient<IMapService, MapService>();
            services.AddTransient<ISystemZoneService, SystemZoneService>();
            services.AddTransient<IStreetSegmentService, StreetSegmentService>();
            services.AddTransient<ICampusService, CampusService>();
            services.AddTransient<ITradeZoneService, TradeZoneService>();
            services.AddTransient<IGroupZoneService, GroupZoneService>();
            services.AddTransient<IConfigurationService, ConfigurationService>();
            services.AddTransient<IMyStoreService, MyStoreService>();
            services.AddTransient<ITradeZoneVersionsService, TradeZoneVersionsService>();
            var enviroment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
#if DEBUG
            if (enviroment == Environments.Development)
            {
                builder.AddRazorRuntimeCompilation();
            }
#endif
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error/error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();

            const string cacheMaxAge = "604800";
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    // using Microsoft.AspNetCore.Http;
                    ctx.Context.Response.Headers.Append(
                         "Cache-Control", $"public, max-age={cacheMaxAge}");
                }
            });

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\assets")),
                RequestPath = "/assets"
            });
            app.UseDirectoryBrowser(new DirectoryBrowserOptions()
            {
                FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\assets")),
                RequestPath = new PathString("/assets")
            });

            app.UseAuthentication();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "home-page",
                    pattern: "{controller=Home}/{action=Index}");
            });
        }
    }
}