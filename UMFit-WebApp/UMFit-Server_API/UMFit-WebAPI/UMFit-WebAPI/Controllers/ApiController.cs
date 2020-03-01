using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiController : ControllerBase
    {

        public string show_routes()
        {
            var sb = new StringBuilder();

            sb.Append("This is the UMFit WebAPI. Available routes:").Append('\n').Append('\n');
            sb.Append("(1) Users API   : api/user").Append('\n');
            sb.Append("(2) Another API : api/...").Append('\n');
            sb.Append("(3) Another API : api/...").Append('\n');
            sb.Append("(4) Another API : api/...").Append('\n');
            sb.Append("(5) Another API : api/...").Append('\n');

            return sb.ToString();
        }
        
        [HttpGet]
        public string Get()
        {
            return show_routes();
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return NotFound("UMFit Controller could not find your request!");
        }
    }
}