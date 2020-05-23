using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Utilities;
using UMFit_WebAPI.Dto;
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
            //List<AulaGrupo> tst;
            sendJson.Add("Segunda",DiaToJson(_system.GetAulasDia("Segunda")));
            sendJson.Add("Terca", DiaToJson(_system.GetAulasDia("Terca")));
            sendJson.Add("Quarta", DiaToJson(_system.GetAulasDia("Quarta")));
            sendJson.Add("Quinta", DiaToJson(_system.GetAulasDia("Quinta")));
            sendJson.Add("Sexta", DiaToJson(_system.GetAulasDia("Sexta")));
            
            return (Ok(
                sendJson.ToString()
            ));
        }
        [HttpPost("planoSemanalC")]
        public ActionResult<string> PlanoSemanalC([FromBody] StringDto rec)
        {
            List<int> participaçions = _system.GetAulasCliente(rec.valueST);

            JObject sendJson = new JObject();
            sendJson.Add("Segunda",DiaToJson(_system.GetAulasDia("Segunda"),participaçions));
            sendJson.Add("Terca", DiaToJson(_system.GetAulasDia("Terca"),participaçions));
            sendJson.Add("Quarta", DiaToJson(_system.GetAulasDia("Quarta"),participaçions));
            sendJson.Add("Quinta", DiaToJson(_system.GetAulasDia("Quinta"),participaçions));
            sendJson.Add("Sexta", DiaToJson(_system.GetAulasDia("Sexta"),participaçions));
            
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
                iter.Add("id",e.id);
                iter.Add("hora", e.hora.Hours + "h" + e.hora.Minutes);
                iter.Add("dia", e.dia);
                iter.Add("nome", e.nome);
                iter.Add("lotacao_atual", e.lotaçao_Atual);
                iter.Add("lotacao_max", e.lotaçao_Max);
                iter.Add("duracao", e.duraçao);
                iter.Add("dificuldade", e.dificuldade);
                iter.Add("instrutor_email", e.instrutor_email);
                iter.Add("espaco_ginasio", e.espaço_ginasio);
                jarray.Add(iter);
                iter = new JObject();
            }
            return jarray;
        }
        
        private JArray DiaToJson(List<AulaGrupo> dia, List<int> ç)
        {
            JArray jarray = new JArray();
            JObject iter = new JObject();
            foreach (var e in dia)
            {
                if(ç.Contains(e.id)) iter.Add("marcada", true);else{iter.Add("marcada", false);}
                iter.Add("id",e.id);
                iter.Add("hora", e.hora.Hours + "h" + e.hora.Minutes);
                iter.Add("dia", e.dia);
                iter.Add("nome", e.nome);
                iter.Add("lotacao_atual", e.lotaçao_Atual);
                iter.Add("lotacao_max", e.lotaçao_Max);
                iter.Add("duracao", e.duraçao);
                iter.Add("dificuldade", e.dificuldade);
                iter.Add("instrutor_email", e.instrutor_email);
                iter.Add("espaco_ginasio", e.espaço_ginasio);
                jarray.Add(iter);
                iter = new JObject();
            }
            return jarray;
        }
        
        
        [HttpPost("marcarAula")]
        public ActionResult<string> marcarAula(dynamic json)
        {
            JObject received = JObject.Parse(JsonSerializer.Serialize( json));
            ActionResult<string> ret = Ok();
            var uMail  =_system.getUserGivenToken(received.GetValue("token").ToString());
            var tmp = received.GetValue("aula").ToObject<int>();
            AulaGrupo ag = _system.GetAulaID(tmp);
            ClienteAula ca = new ClienteAula(ag.id,ag.hora,ag.dia,uMail,ag.instrutor_email,ag.espaço_ginasio);
            
            if ( (  (ag.lotaçao_Max < ag.lotaçao_Atual + 1) || !( _system.MarcarAula(ca))) ) 
                ret = BadRequest();


            return (ret);
        }
        [HttpPost("desmarcárAula")]
        public ActionResult<string> DesmarcarAula(dynamic json)
        {
            JObject received = JObject.Parse(JsonSerializer.Serialize( json));
            ActionResult<string> ret = Ok();
            var uMail  =_system.getUserGivenToken(received.GetValue("token").ToString());
            var id = received.GetValue("aula").ToObject<int>();
            _system.DesmarcarAula(id, uMail);

            return (ret);
        }
        
        
        [HttpPost("editar")]
        public ActionResult<string> editarAula(dynamic json)
        {
            JObject received = JObject.Parse(JsonSerializer.Serialize( json));
            ActionResult<string> ret = BadRequest();
           // var uMail  =_system.getUserGivenToken(received.GetValue("token").ToString());
            JObject extract =(JObject) received.GetValue("aula");
            AulaGrupo ag = new AulaGrupo(
                extract.GetValue("id").ToObject<int>(),
                TimeSpan.Parse( extract.GetValue("hora").ToString().Replace('h',':')),
                extract.GetValue("dia").ToString(),
                extract.GetValue("nome").ToString(),
                extract.GetValue("lotacao_atual").ToObject<int>(),
                extract.GetValue("lotacao_max").ToObject<int>(),
                extract.GetValue("duracao").ToString(),
                extract.GetValue("dificuldade").ToString(),
                extract.GetValue("instrutor_email").ToString(),
                extract.GetValue("espaco_ginasio").ToString()
            );
            if ( _system.EditarAula(ag,ag.id) ) ret =Ok();


            return (ret);
        }
        
        
        
        [HttpPost("clientesAula")]
        public ActionResult<string> getInAula([FromBody] StringDto token){
            
            string idAula = token.valueST;
            List<string> ret = new List<string>();
            _system.getClientesAula(idAula).ForEach((mail)=>ret.Add(_system.GetUser(mail).GetName()) );
            
            return Ok(ret);
        }
























    }
}