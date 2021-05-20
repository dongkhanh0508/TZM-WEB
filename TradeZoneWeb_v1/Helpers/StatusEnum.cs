using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TradeZoneWeb_v1.Helpers
{
    public static class StatusEnum
    {
        public enum Status
        {
            All = 0,
            Surveyed = 1,
            NeedSurvey = 2,
            NeedApproval = 3,
            WaitingUpdate = 4,
            Deleted = 5,
            Reject = 6,
        }
    }
}
