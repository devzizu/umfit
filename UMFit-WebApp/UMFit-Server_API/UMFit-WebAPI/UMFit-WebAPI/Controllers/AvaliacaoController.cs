
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.UMFit_LN;

namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvaliacaoController : ControllerBase
    {
        private readonly UMFit_LN _system = new UMFit_LN();

        [HttpPost("evolucao")]
        public ActionResult<string> Evolucao([Bind] UserAuthenticationDto userDto)
        {

            var listaPesos = _system.Generate_Reg(userDto.email, 
                                                              "peso", 
                                                              true);
            
            var listaCinturas = _system.Generate_Reg(userDto.email, 
                                                                 "cintura", 
                                                              false);
            
            var result = new
            {
                Pesos = listaPesos,
                Cinturas = listaCinturas
            };
            
            return Ok(result);
        }
   }
}