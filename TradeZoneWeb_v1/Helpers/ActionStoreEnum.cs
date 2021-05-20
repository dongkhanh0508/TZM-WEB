using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TradeZoneWeb_v1.Helpers
{
    public static class ActionStoreEnum
    {
        public enum ActionSurvey
        {
            All = 0,
            [Display(Name ="Insert Store")]
            InsertStore = 4,
            [Display(Name = "Edit Store")]
            EditStore = 5,
            [Display(Name = "Delete Store")]
            DeleteStore = 6
        }
    }
}