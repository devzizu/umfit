using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Newtonsoft.Json.Linq;
using UMFit_WebAPI.Models.UMFit_LN;
using UMFit_WebAPI.Models.UMFit_LN.Aulas;


namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AulaGrupoController : ControllerBase{
        
        private readonly UMFit_LN _system = new UMFit_LN();
        
        [HttpGet("planosemanal")]
        public ActionResult<string> Aulas()
        {
            JObject sendJson = new JObject();
            List<AulaGrupo> tst;
            sendJson.Add("Segunda",DiaToJson(_system.GetAulasDia("Segunda")));
            sendJson.Add("Terca", DiaToJson(_system.GetAulasDia("Terca")));
            sendJson.Add("Quarta", DiaToJson(_system.GetAulasDia("Quarta")));
            sendJson.Add("Quinta", DiaToJson(_system.GetAulasDia("Quinta")));
            sendJson.Add("Sexta", DiaToJson(_system.GetAulasDia("Sexta")));
            Console.WriteLine(sendJson.ToString());
            return (Ok(
                sendJson.ToString()
            ));
        }

        private JArray DiaToJson(List<AulaGrupo> dia)
        {
            JArray jarray = new JArray();
            JObject iter = new JObject();
            foreach (var e in dia)
            {
                iter.Add("minutos", e.hora.TotalMinutes);
                iter.Add("lotacao_atual", e.lotaçao_Atual);
                iter.Add("lotacao_max", e.lotaçao_Max);
                iter.Add("dificuldade", e.dificuldade);
                iter.Add("instrutor_email", e.instrutor_email);
                iter.Add("espaco_ginasio", e.espaço_ginasio);
                jarray.Add(iter);
                iter = new JObject();
            }

            return jarray;
        }
























    }
}