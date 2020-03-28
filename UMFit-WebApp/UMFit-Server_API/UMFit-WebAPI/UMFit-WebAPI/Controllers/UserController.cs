
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using MySqlX.Serialization;
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
        public ActionResult<string> Logout([FromBody] StringDto token)
        {
            var validToken = _system.isUserOnline(token.valueST);

            return Ok();
        }

        [HttpPost("status")]
        public ActionResult<string> Status([FromBody] StringDto token)
        {
            var validToken = _system.isUserOnline(token.valueST);

            String statusToken = validToken ? "online" : "offline";
            
            InterfaceUtilizador user = null;
            
            if (validToken)
            {
                var email = _system.getUserGivenToken(token.valueST);

                user = _system.GetUser(email);
                
                int typeOfUser = _system.TypeUser(user.GetEmail());
            
                if (typeOfUser != -1)
                {
                    switch (typeOfUser)
                    {
                        case 0:
                        {
                            user = (Cliente) user;
                            break;
                        }
                        case 1:
                        {
                            user = (Instrutor) user;
                            break;
                        }
                        case 2:
                        {
                            user = (Rececionista) user;
                            break;
                        }
                    }
                }

            }

            string json = JsonSerializer.Serialize(new
            {
                status = statusToken,
                user
            });
            
            return Ok(new
            {
                status = statusToken,
                user = user.ToJson()
            });
        }
        
        [HttpPost("authenticate")]
        public ActionResult<InterfaceUtilizador> Authenticate([Bind] UserAuthenticationDto userDto)
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