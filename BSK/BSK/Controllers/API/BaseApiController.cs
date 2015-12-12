using BSK.Lib.Common;
using BSK.Lib.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BSK.Controllers.API
{
    public class BaseApiController : ApiController
    {
        protected int PageSize = 10;
        protected string VirtualPath = string.Empty;
        protected FileData filedata = null;
        protected CustomMultipartFormDataStreamProvider result = null;
        protected string rendomDirectoryName = RandomGenerator(8);


        public BaseApiController()
        {

        }

        protected CustomMultipartFormDataStreamProvider GetMultipartProvider(int mediaType, ref string VirtualPath)
        {
            VirtualPath = ConfigurationManager.AppSettings["MediaPath"];
            switch (mediaType)
            {
                case (int)Enumerations.MediaType.Company:
                    {
                        VirtualPath = VirtualPath + "Company/";
                        break;
                    }
                case (int)Enumerations.MediaType.Property:
                    {
                        VirtualPath = VirtualPath + "Property/";
                        break;
                    }
                case (int)Enumerations.MediaType.User:
                    {
                        VirtualPath = VirtualPath + "User/" + rendomDirectoryName + "/";
                        break;
                    }
                case (int)Enumerations.MediaType.Agent:
                    {
                        VirtualPath = VirtualPath + "Agent/";
                        break;
                    }
                case (int)Enumerations.MediaType.Portfolio:
                    {
                        VirtualPath = VirtualPath + "Portfolio/";
                        break;
                    }
                case (int)Enumerations.MediaType.Suite:
                    {
                        VirtualPath = VirtualPath + "Suite/";
                        break;
                    }
                case (int)Enumerations.MediaType.Listing:
                    {
                        VirtualPath = VirtualPath + "Listing/";
                        break;
                    }
                case (int)Enumerations.MediaType.SaleComp:
                    {
                        VirtualPath = VirtualPath + "Listing/";
                        break;
                    }
                case (int)Enumerations.MediaType.Task:
                    {
                        VirtualPath = VirtualPath + "Task/";
                        break;
                    }
                //case (int)Enumerations.MediaType.Condo:
                //    {
                //        VirtualPath = VirtualPath + "Condo/";
                //        break;
                //    }
            }
            var root = HttpContext.Current.Server.MapPath(VirtualPath);
            if (!Directory.Exists(root))
                Directory.CreateDirectory(root);
            return new CustomMultipartFormDataStreamProvider(root);
        }

        protected object GetFormData<T>(MultipartFormDataStreamProvider result)
        {
            if (result.FormData.HasKeys())
            {
                var unescapedFormData = Uri.UnescapeDataString(result.FormData.GetValues(0).FirstOrDefault() ?? String.Empty);
                if (!String.IsNullOrEmpty(unescapedFormData))
                    return JsonConvert.DeserializeObject<T>(unescapedFormData);
            }

            return null;
        }

        protected string GetDeserializedFileName(MultipartFileData fileData)
        {
            var fileName = GetFileName(fileData);
            return JsonConvert.DeserializeObject(fileName).ToString();
        }

        protected string GetFileName(MultipartFileData fileData)
        {
            return fileData.Headers.ContentDisposition.FileName;
        }

        protected async Task SaveFile(int MediaType)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
            }


            var provider = GetMultipartProvider(MediaType, ref VirtualPath);
            result = await Request.Content.ReadAsMultipartAsync(provider);
            if (provider.FileData.Count > 0)
            {
                FileInfo info = null;
                info = provider.FileData.Select(i => info = new FileInfo(i.LocalFileName)).First();
                filedata = new FileData() { FileName = info.Name, FileExt = info.Extension, FileSize = info.Length.ToString() };
            }
        }

        private static readonly Random _rng = new Random();
        private const string _chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        private static string RandomGenerator(int size)
        {
            char[] buffer = new char[size];

            for (int i = 0; i < size; i++)
            {
                buffer[i] = _chars[_rng.Next(_chars.Length)];
            }
            return new string(buffer);
        }


    }
}