
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
        public ActionResult<string> Logout([Bind] UserAuthenticationDto userDto)
        {
            var listPesos = new[]
            {
                new { Data = new DateTime(2020, 1, 1), Peso = 98.2},
                new { Data = new DateTime(2020, 1, 1), Peso = 94.2},
                new { Data = new DateTime(2020, 1, 1), Peso = 92.2},
                new { Data = new DateTime(2020, 1, 1), Peso = 91.2},
                new { Data = new DateTime(2020, 1, 1), Peso = 88.2},
                new { Data = new DateTime(2020, 1, 1), Peso = 92.2},
                new { Data = new DateTime(2020, 1, 1), Peso = 93.2}
            }.ToList();
            
            var listCintura = new[]
            {
                new { Data = new DateTime(2020, 1, 1), Cintura = 110},
                new { Data = new DateTime(2020, 1, 1), Cintura = 108},
                new { Data = new DateTime(2020, 1, 1), Cintura = 108},
                new { Data = new DateTime(2020, 1, 1), Cintura = 107},
                new { Data = new DateTime(2020, 1, 1), Cintura = 108},
                new { Data = new DateTime(2020, 1, 1), Cintura = 104},
                new { Data = new DateTime(2020, 1, 1), Cintura = 103}
            }.ToList();

            var result = new
            {
                Pesos = listPesos,
                Cinturas = listCintura
            };
            
            return Ok(result);
        }
   }
}