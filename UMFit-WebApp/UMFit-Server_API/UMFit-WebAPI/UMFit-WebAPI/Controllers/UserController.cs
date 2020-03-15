
using System;
using Microsoft.AspNetCore.Mvc;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.Data.DAO;
using UMFit_WebAPI.Models.UMFit_LN;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores.Interfaces;


namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UMFit_LN _system = new UMFit_LN();

        [HttpPost("logout")]
        public ActionResult<string> Logout([Bind] UserDto userDto)
        {
            _system.logout(userDto.email);

            return Ok(new {status = "logout OK " + userDto.email});
        }

        [HttpPost("status")]
        public ActionResult<string> Status([Bind] UserDto userDto)
        {
            var res = _system.isUserOnline(userDto.email);
            
            return res ? Ok(new {status = "online"}) : Ok(new {status = "offline"});
        }
        
        [HttpPost("authenticate")]
        public ActionResult<InterfaceUtilizador> Authenticate([Bind] UserDto userDto)
        {
            InterfaceUtilizador user = null;
            int typeOfUser = _system.TypeUser(userDto.email);

            if (typeOfUser != -1)
            {
                switch (typeOfUser)
                {
                    case 0:
                    {
                        user = (Cliente) _system.Authenticate(userDto.email, userDto.password);
                        break;
                    }
                    case 1:
                    {
                        user = (Instrutor) _system.Authenticate(userDto.email, userDto.password);
                        break;
                    }
                    case 2:
                    {
                        user = (Rececionista) _system.Authenticate(userDto.email, userDto.password);
                        break;
                    }
                }
            }
            
            if (user == null && typeOfUser == -1)
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