﻿using Microsoft.AspNetCore.Routing;
using System.Text.RegularExpressions;

namespace TradeZoneWeb_v1.Helpers
{
    public class SlugifyParameterTransformer : IOutboundParameterTransformer
    {
        public string TransformOutbound(object value)
        {
            // Slugify value
            return value == null ? null : Regex.Replace(value.ToString(), "([a-z])([A-Z])", "$1-$2").ToLower();
        }
    }
}