using BSK.Lib.Common;
using BSK.Lib.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace BSK.Controllers.API
{
    [RoutePrefix("api/Deal")]
    public class DealController : BaseApiController
    {
        [Route("GetDealsList")]
        public PagedCollection<Deal> GetDealsList(int PageId, int SortExpression, string SortBy)
        {
            return Deal.GetDealsList(PageId, SortExpression, SortBy , PageSize);
        }
        [Route("InsertUpdateDeal")]
        [HttpPost]
        public async Task<IHttpActionResult> InsertUpdateDeal()
        {
            await SaveFile((int)Enumerations.MediaType.Deal);
            Deal Deal = (Deal)GetFormData<Deal>(result);

            var controller = ControllerContext.Controller as ApiController;
            controller.Validate(Deal);

            if (Deal.DealId > 0)
            {
                ModelState.Remove("Pwd");
            }
            if (!ModelState.IsValid)
            {
                if (Directory.Exists(System.Web.HttpContext.Current.Server.MapPath("~/Files/Deal/" + rendomDirectoryName + "/")))
                    Directory.Delete(System.Web.HttpContext.Current.Server.MapPath("~/Files/Deal/" + rendomDirectoryName + "/"), true);

                return Json(new
                {
                    success = false,
                    errors = ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                        .Select(m => m.ErrorMessage).ToArray()
                });
            }

            //insert-updata Deals
            int DealId = BSK.Lib.Models.Deal.InsertDeal(Deal);
            if (DealId > 0)
            {
                if (filedata != null)
                {
                    if (Directory.Exists(System.Web.HttpContext.Current.Server.MapPath("~/Files/Deal/" + DealId + "/")))
                        Directory.Delete(System.Web.HttpContext.Current.Server.MapPath("~/Files/Deal/" + DealId + "/"), true);

                    string source = System.Web.HttpContext.Current.Server.MapPath("~/Files/Deal/" + rendomDirectoryName + "/");
                    string destination = System.Web.HttpContext.Current.Server.MapPath("~/Files/Deal/" + DealId + "/");
                    Directory.Move(source, destination);
                    string CompressedName = Utils.ResizeImages("~/Files/Deal/" + DealId + "/" + filedata.FileName, "~/Files/Deal/" + DealId + "/", 500);
                    FileData.InsertPhotoUrl(DealId, filedata.FileName, CompressedName, (int)Enumerations.MediaType.Deal);
                }
                else
                {
                    if (Directory.Exists(System.Web.HttpContext.Current.Server.MapPath("~/Files/Deal/" + rendomDirectoryName + "/")))
                        Directory.Delete(System.Web.HttpContext.Current.Server.MapPath("~/Files/Deal/" + rendomDirectoryName + "/"), true);
                }
            }
            return Json(new
            {
                success = true,
            });
        }

    }
}
