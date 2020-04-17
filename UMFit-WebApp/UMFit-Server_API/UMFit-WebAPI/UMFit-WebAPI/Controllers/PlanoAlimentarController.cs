using System;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;


namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanoAlimentarController : ControllerBase
    {
        [HttpPost("refeicoes")]
        public ActionResult<string> Exercicios([FromBody] dynamic rec)
        {
            string[] list = {"Pequeno-Almoço", "Almoço", "Lanche", "Jantar"};
            var send = new JObject();
            send.Add("refeicoes",new JArray(list));
            return (Ok(
                send.ToString()
            ));
        }

        [HttpPost("add")]
        public ActionResult<string> SetPlano([FromBody] dynamic rec)
        {
            var jobject = JObject.Parse(JsonSerializer.Serialize(rec));
            
            string email = jobject.GetValue("email");
            
            dynamic plano = jobject.GetValue("planoAlimentar");
            
            Console.WriteLine(jobject.ToString());
            
            return (Ok());
        }

        
        
        
    }
}