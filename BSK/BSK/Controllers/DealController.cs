using BSK.Lib.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BSK.Controllers
{
    public class DealController : Controller
    {
        //
        // GET: /Deal/
        public ActionResult Index()
        {
            DealViewModel DealVM = new DealViewModel();
            return View(DealVM);
        }
	}
}