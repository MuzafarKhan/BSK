using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BSK.Lib.Models;
using System.Threading.Tasks;
using BSK.Lib.Common;
using System.IO;

namespace BSK.Controllers.API
{
    [RoutePrefix("api/User")]
    public class UserController :  BaseApiController
    {
        [HttpGet]
        [Route("GetUsersList")]
        public List<BSK.Lib.Models.UserInfo> GetUsersList()
        {
            return BSK.Lib.Models.UserInfo.GetUsersList();
        }


        [Route("InsertUpdateUser")]
        [HttpPost]
        public async Task<IHttpActionResult> InsertUpdateUser()
        {
            await SaveFile((int)Enumerations.MediaType.Profile);
            UserInfo ui = (UserInfo)GetFormData<UserInfo>(result);

            //var controller = ControllerContext.Controller as ApiController;
            //controller.Validate(ui);

            if (ui.intUserId > 0)
            {
                ModelState.Remove("Pwd");
            }
            if (!ModelState.IsValid)
            {
                if (Directory.Exists(System.Web.HttpContext.Current.Server.MapPath("~/Files/User/" + rendomDirectoryName + "/")))
                    Directory.Delete(System.Web.HttpContext.Current.Server.MapPath("~/Files/User/" + rendomDirectoryName + "/"), true);

                return Json(new
                {
                    success = false,
                    errors = ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                        .Select(m => m.ErrorMessage).ToArray()
                });
            }

            //insert-updata Users
            int userId = BSK.Lib.Models.UserInfo.InsertUser(ui);
            if (userId > 0)
            {
                if (filedata != null)
                {
                    if (Directory.Exists(System.Web.HttpContext.Current.Server.MapPath("~/Files/User/" + userId + "/")))
                        Directory.Delete(System.Web.HttpContext.Current.Server.MapPath("~/Files/User/" + userId + "/"), true);

                    string source = System.Web.HttpContext.Current.Server.MapPath("~/Files/User/" + rendomDirectoryName + "/");
                    string destination = System.Web.HttpContext.Current.Server.MapPath("~/Files/User/" + userId + "/");
                    Directory.Move(source, destination);
                    string CompressedName = Utils.ResizeImages("~/Files/User/" + userId + "/" + filedata.FileName, "~/Files/User/" + userId + "/", 500);
                    FileData.InsertPhotoUrl(userId, filedata.FileName, CompressedName, (int)Enumerations.MediaType.Profile);
                }
                else
                {
                    if (Directory.Exists(System.Web.HttpContext.Current.Server.MapPath("~/Files/User/" + rendomDirectoryName + "/")))
                        Directory.Delete(System.Web.HttpContext.Current.Server.MapPath("~/Files/User/" + rendomDirectoryName + "/"), true);
                }
            }
            return Json(new
            {
                success = true,
            });
        }
    }

}