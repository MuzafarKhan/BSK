using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BSK.Lib;
using BSK.Lib.Models;
namespace BSKBusiness.Business
{
    class Users
    {
        public static bool AuthenticateUser(User model, ref string error)
        {
            var userInfo = new Dictionary<string, object>();
            userInfo.Add("Login", model.vchEmail);
            userInfo.Add("Password", model.vchPassword);
            userInfo.Add("IsValid", false);
            userInfo.Add("Message", string.Empty);
            WorkflowHelper.ExecuteWorkflow(typeof(LoginWorkFlow), userInfo);
            error = Conversion.ParseString(userInfo["Message"]);
            return Conversion.ParseBool(userInfo["IsValid"]);
        }
    }
}
