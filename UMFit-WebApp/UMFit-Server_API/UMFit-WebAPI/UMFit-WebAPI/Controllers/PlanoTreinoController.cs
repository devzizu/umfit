using System;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;


namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanoTreinoController : ControllerBase
    {
        [HttpPost("exercicios")]
        public ActionResult<string> Exercicios([FromBody] dynamic rec)
        {
           string[] list = {"Supino Reto","Supino Inclinado","Supino Declinado","Supino c/halters","Pack Deck","Aberturas","Cross-Over","Flexoes","Tricep Francês","Barra à Testa","Afundos","Bicep Curl","Bicep Martelo","Bicep Concentrado","Bicep c/barra","Elevaçoes"};
           var send = new JObject();
           send.Add("exercicios",new JArray(list));
           return (Ok(
               send.ToString()
               ));
        }

        [HttpPost("add")]
        public ActionResult<string> SetPlano([FromBody] dynamic rec)
        {
            var jobject = JObject.Parse(JsonSerializer.Serialize(rec));
            
            string email = jobject.GetValue("email");
            
            dynamic plano = jobject.GetValue("planotreino");
            
            Console.WriteLine(jobject.ToString());
            
            return (Ok());
        }
        
        
        
        
        
        
        
        
        
    }
}