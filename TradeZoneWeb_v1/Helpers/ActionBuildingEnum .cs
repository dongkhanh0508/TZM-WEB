using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TradeZoneWeb_v1.Helpers
{
    public static class ActionBuildingEnum
    {
        public enum ActionSurvey
        {
            All = 0,
            [Display(Name ="Insert Building")]
            InsertBuilding = 1,
            [Display(Name = "Edit Building")]
            EditBuilding = 2,
            [Display(Name = "Delete Building")]
            DeleteBuilding = 3,                      
        }
    }
}