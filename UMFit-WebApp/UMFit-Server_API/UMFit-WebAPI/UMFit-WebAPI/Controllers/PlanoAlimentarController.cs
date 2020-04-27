using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json.Linq;
using UMFit_WebAPI.Models.UMFit_LN;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoAlimentar;

namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanoAlimentarController : ControllerBase
    {
        private readonly UMFit_LN _system = new UMFit_LN();
        private readonly object[] _refList = {"Pequeno-Almoço", "Almoço", "Lanche", "Jantar"};
        
        [HttpPost("refeicoes")]
        public ActionResult<string> Refeicoes([FromBody] dynamic rec)
        {
            var send = new JObject();
            send.Add("refeicoes",new JArray(_refList));
            return (Ok(
                send.ToString()
            ));
        }

        [HttpPost("add")]
        public ActionResult<string> SetPlano([FromBody] dynamic rec)
        {
            var jobject = JObject.Parse(JsonSerializer.Serialize(rec));
            
            ActionResult<string> ret= BadRequest("Impossível inserir plano alimentar");
            
            string email = jobject.GetValue("email");
            
            JObject plano = jobject.GetValue("planoAlimentar");
            
            List<Refeiçao> lista =  new List<Refeiçao>();

            JArray ja = plano.GetValue("lista_refeicoes").ToObject<JArray>();
            
            try
            {
                if(email.Equals("")) throw new Exception("EMAIL BROKEN");
                foreach (JObject v in ja)
                {
                    Refeiçao re = new Refeiçao(v.GetValue("nome").ToString(),
                        v.GetValue("descricao").ToString()
                    );
                    lista.Add(re);
                }

                PlanoAlimentar pa = new PlanoAlimentar(
                    email,
                    plano.GetValue("nome").ToString(),
                    plano.GetValue("frequencia").ToString(), 
                    int.Parse(plano.GetValue("refeicoes_livres").ToString()), 
                    DateTime.Parse(plano.GetValue("data_fim").ToString()),
                    lista
                    );
                Console.WriteLine(pa.ToString());
                
                if (_system.AddPlanoAlimentar(pa)) ret = Ok();
            }
            catch (Exception e) { Console.WriteLine(e.ToString()); }

            return (ret);
            
        }

        
        
        
    }
}