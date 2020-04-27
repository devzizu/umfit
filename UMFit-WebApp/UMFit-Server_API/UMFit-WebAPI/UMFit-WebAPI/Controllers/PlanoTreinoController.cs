using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Utilities;
using Renci.SshNet.Common;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.UMFit_LN;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoTreino;
using JsonSerializer = System.Text.Json.JsonSerializer;


namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanoTreinoController : ControllerBase
    {
        private readonly UMFit_LN _system = new UMFit_LN();
        private readonly object[] _exList = 
        {"Supino c/ Halters", "Pack Deck", "Afundos", "Máquina Press Peito", "Tricep c/ Corda",
            "Tricep Francês c/ Barra", "Tricep Kick-Back c/ Corda", "Agachamento Frontal", "Agachamento c/ Halter",
            "Agachamento Normal c/ Barra", "Cadeira Adutora", "Cadeira Extensora", "Máquina de Costas",
            "Elevações na Barra", "Pushada", "Serrote"
        };
        
        [HttpPost("exercicios")]
        public ActionResult<string> Exercicios([FromBody] dynamic rec)
        {
           
           var send = new JObject();
           send.Add("exercicios",new JArray(_exList));
           return (Ok(
               send.ToString()
               ));
        }

        [HttpPost("add")]
        public ActionResult<string> SetPlano([FromBody] dynamic rec)
        {
            var jobject = JObject.Parse(JsonSerializer.Serialize(rec));
            ActionResult<string> ret= BadRequest("Impossível inserir plano de treino");
            
            string email = jobject.GetValue("email");
            
            
            JObject plano = jobject.GetValue("planotreino");
            List<Exercicio> lista =  new List<Exercicio>();
            
            JArray ja = plano.GetValue("lista_exercicios").ToObject<JArray>();
            try
            {
                if(email.Equals("")) throw new Exception("EMAIL BROKEN");
                foreach (JObject v in ja)
                {
                    Exercicio ex = new Exercicio(v.GetValue("nome").ToString(),
                        int.Parse(v.GetValue("nm_repeticoes").ToString()),
                        int.Parse(v.GetValue("nm_series").ToString())
                    );
                    lista.Add(ex);
                }

                PlanoTreino pt = new PlanoTreino(
                    plano.GetValue("nome").ToString(),
                    DateTime.Parse(plano.GetValue("data_fim").ToString()),
                    plano.GetValue("grupos_musculares").ToString(),
                    plano.GetValue("frequencia").ToString(),
                    email,
                    lista
                );
                if (_system.AddPlano(pt)) ret = Ok();
            }
            catch (Exception e) { Console.WriteLine(e.ToString()); }
            return (ret);
        }
        
        [HttpPost("consultar")]
        public ActionResult<string> GetPlanosTreino([FromBody] StringDto emailWrapper)
        {
            string email = emailWrapper.valueST;
            
            List<PlanoTreino> planosList = _system.GetPlanosTreino(email);
            
            return Ok(planosList);
        }
    }
}