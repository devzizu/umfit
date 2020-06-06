using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json.Linq;
using UMFit_WebAPI.Dto;
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
            lock (_system)
            {
                var send = new JObject();
                send.Add("refeicoes", new JArray(_refList));
                return (Ok(
                    send.ToString()
                ));
            }
        }

        [HttpPost()]
        public ActionResult<string> SetPlano([FromBody] dynamic rec)
        {
            lock (_system)
            {
                var jobject = JObject.Parse(JsonSerializer.Serialize(rec));


                if (!_system.isUserOnline(jobject.valueST.ToString())) return Unauthorized("Client Offline");

                ActionResult<string> ret = BadRequest("Impossível inserir plano alimentar");

                string email = jobject.GetValue("email");

                JObject plano = jobject.GetValue("planoAlimentar");

                List<Refeiçao> lista = new List<Refeiçao>();

                JArray ja = plano.GetValue("lista_refeicoes").ToObject<JArray>();

                try
                {
                    if (email.Equals("")) throw new Exception("EMAIL BROKEN");
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

                    if (_system.AddPlanoAlimentar(pa)) ret = Ok();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                }

                return (ret);

            }
        }

        [HttpPost("consultar")]
        public ActionResult<string> GetPlanosAlimentares([FromBody] dynamic rec)
        {
            lock (_system)
            {
                var jobject = JObject.Parse(JsonSerializer.Serialize(rec));
                if (!_system.isUserOnline(jobject.valueST.ToString())) return Unauthorized("Client Offline");

                string email = jobject.email.ToString();

                List<PlanoAlimentar> planosList = _system.GetPlanosAlimentares(email);

                return Ok(planosList);
            }
        }
    }
}