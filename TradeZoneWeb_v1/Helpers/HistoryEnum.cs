using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Helpers
{
    public static class HistoryEnum
    {
        public enum HistoryColumn
        {
            None = 0,
            CreateDate = 1,
            ModifyDate = 2,
            Action = 3
        }
    }
}
