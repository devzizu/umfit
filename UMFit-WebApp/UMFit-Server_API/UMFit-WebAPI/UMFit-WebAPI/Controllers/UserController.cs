
using System;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using MySqlX.Serialization;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.Data.DAO;
using UMFit_WebAPI.Models.Security;
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
            _system.logout(token.valueST);

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
                _system.RenovaToken(token.valueST);
                
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

            string userData = validToken ? JsonSerializer.Serialize(user, user.GetType()) : "{}";
            StringBuilder aEstePontoMaisValeCriarUmaClassSoParaEsteReturn = new StringBuilder()
                .Append("{")
                .Append("\"status\":\"")
                .Append(statusToken)
                .Append("\",\"user\":")
                .Append(userData)
                .Append("}");

            return Ok(aEstePontoMaisValeCriarUmaClassSoParaEsteReturn.ToString());
        }
        
        [HttpPost("authenticate")]
        public ActionResult<InterfaceUtilizador> Authenticate([Bind] UserAuthenticationDto userDto)
        {
            
            InterfaceUtilizador user = null;
            int typeOfUser = _system.TypeUser(userDto.email);
            string token = CalculateHash.GetHashString(userDto.email+DateTime.Now);
            if (typeOfUser != -1)
            {
                switch (typeOfUser)
                {
                    case 0:
                    {
                        user = (Cliente) _system.Authenticate(userDto.email, userDto.password,token);
                        break;
                    }
                    case 1:
                    {
                        user = (Instrutor) _system.Authenticate(userDto.email, userDto.password,token);
                        break;
                    }
                    case 2:
                    {
                        user = (Rececionista) _system.Authenticate(userDto.email, userDto.password,token);
                        break;
                    }
                }

            }
            
            if (user == null || typeOfUser == -1)
            {
                return BadRequest(new
                {
                    message = "Credentials are wrong..."
                });
            }
            
            StringBuilder aEstePontoMaisValeCriarUmaClassSoParaEsteReturn = new StringBuilder()
                .Append("{")
                .Append("\"token\":\"")
                .Append(token)
                .Append("\",\"user\":")
                .Append(JsonSerializer.Serialize(user, user.GetType()))
                .Append("}");

            return Ok(aEstePontoMaisValeCriarUmaClassSoParaEsteReturn.ToString());
        }
    }
}