using Microsoft.AspNetCore.Mvc;

namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly Models.System _system = new Models.System();

        [HttpGet]
        public IActionResult Get()
        {
            var users = _system.GetUsers();

            return Ok(users);
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _system.GetUser(id);

            if (user == null) return NotFound("Cannot find user with that id");
            
            return Ok(user);
        }
    }
}