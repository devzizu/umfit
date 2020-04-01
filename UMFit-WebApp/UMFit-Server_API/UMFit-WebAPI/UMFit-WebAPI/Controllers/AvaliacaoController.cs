
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.UMFit_LN;
using UMFit_WebAPI.Models.UMFit_LN.Avaliacao;

namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvaliacaoController : ControllerBase
    {
        private readonly UMFit_LN _system = new UMFit_LN();

        [HttpPost("evolucao")]
        public ActionResult<string> Evolucao([FromBody] StringDto token)
        {

            bool tokenOK = _system.isUserOnline(token.valueST);

            var listaCinturas = new List<Registo_Avaliaçao>();
            var listaPesos = new List<Registo_Avaliaçao>();

            if (tokenOK)
            {
                string email = _system.getUserGivenToken(token.valueST);

                listaPesos = _system.Generate_Reg(email, 
                    "peso", 
                    true);
            
                listaCinturas = _system.Generate_Reg(email, 
                    "cintura", 
                    false);
            }
            
            var result = new
            {
                TokenStatus = tokenOK,
                Pesos = listaPesos,
                Cinturas = listaCinturas
            };
 
            return Ok(result);
        }
   }
}