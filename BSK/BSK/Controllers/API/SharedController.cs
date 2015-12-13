using BSK.Lib.Common;
using BSK.Lib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace BSK.Controllers.API
{
    [System.Web.Http.RoutePrefix("api/Shared")]
    public class SharedController : ApiController
    {
        [System.Web.Http.Route("GetCitiesByStateId")]
        public List<SelectListItem> GetCitiesByStateId(int StateId)
        {
            return LookupUtility.Cities(StateId);
        }
        [System.Web.Http.Route("GetSubCategoryByMainCategoryId")]
        public List<SelectListItem> GetSubCategoryByMainCategoryId(int MainCategoryId)
        {
            return LookupUtility.SubCategories(MainCategoryId);
        }
    }
}
