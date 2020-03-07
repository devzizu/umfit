
using System;
using Microsoft.AspNetCore.Mvc;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.Users;

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

            if (user == null) 
                return 
                    NotFound("Não existe um utilizador com esse ID.");
            
            return Ok(user);
        }

        [HttpPost("authenticate")]
        public ActionResult<User> Post([Bind] UserDto userDto)
        {
            var user = _system.Authenticate(userDto.email, userDto.password);

            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Credentials are wrong..."
                });
            }

            return Ok(user);
        }
    }
}