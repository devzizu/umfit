using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using MySql.Data.MySqlClient;
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
            lock (_system)
            {
                JObject sendJson = new JObject();

                sendJson.Add("Segunda", DiaToJson(_system.GetAulasDia("Segunda")));
                sendJson.Add("Terca", DiaToJson(_system.GetAulasDia("Terca")));
                sendJson.Add("Quarta", DiaToJson(_system.GetAulasDia("Quarta")));
                sendJson.Add("Quinta", DiaToJson(_system.GetAulasDia("Quinta")));
                sendJson.Add("Sexta", DiaToJson(_system.GetAulasDia("Sexta")));

                return (Ok(
                    sendJson.ToString()
                ));
            }
        }

        [HttpPost("planosemanal/cliente")]
        public ActionResult<string> PlanoSemanalC([FromBody] dynamic rec)
        {
            lock (_system)
            {
                JObject job = JObject.Parse(rec.ToString());
                if (!_system.isUserOnline(job.GetValue("valueST").ToString())) return Unauthorized("Client Offline");

                List<int> participaçions = _system.GetAulasCliente(job.GetValue("email").ToString());

                JObject sendJson = new JObject();
                sendJson.Add("Segunda", DiaToJson(_system.GetAulasDia("Segunda"), participaçions));
                sendJson.Add("Terca", DiaToJson(_system.GetAulasDia("Terca"), participaçions));
                sendJson.Add("Quarta", DiaToJson(_system.GetAulasDia("Quarta"), participaçions));
                sendJson.Add("Quinta", DiaToJson(_system.GetAulasDia("Quinta"), participaçions));
                sendJson.Add("Sexta", DiaToJson(_system.GetAulasDia("Sexta"), participaçions));

                return (Ok(
                    sendJson.ToString()
                ));
            }
        }

        private JArray DiaToJson(List<AulaGrupo> dia)
        {
            lock (_system)
            {
                JArray jarray = new JArray();
                JObject iter = new JObject();
                foreach (var e in dia)
                {
                    iter.Add("id", e.id);
                    iter.Add("hora", e.hora.Hours + "h" + (e.hora.Minutes<10? "0":"")+e.hora.Minutes );
                    iter.Add("dia", e.dia);
                    iter.Add("nome", e.nome);
                    iter.Add("lotacao_atual", e.lotaçao_Atual);
                    iter.Add("lotacao_max", e.lotaçao_Max);
                    iter.Add("duracao", e.duraçao.Replace(":", ""));
                    iter.Add("dificuldade", e.dificuldade);
                    iter.Add("instrutor_email", e.instrutor_email);
                    iter.Add("espaco_ginasio", e.espaço_ginasio);
                    jarray.Add(iter);
                    iter = new JObject();
                }

                return jarray;
            }
        }

        private JArray DiaToJson(List<AulaGrupo> dia, List<int> ç)
        {
            lock (_system)
            {
                JArray jarray = new JArray();
                JObject iter = new JObject();
                foreach (var e in dia)
                {
                    if (ç.Contains(e.id)) iter.Add("marcada", true);
                    else
                    {
                        iter.Add("marcada", false);
                    }

                    iter.Add("id", e.id);
                    iter.Add("hora", e.hora.Hours + "h" + (e.hora.Minutes<10? "0":"")+e.hora.Minutes );
                    iter.Add("dia", e.dia);
                    iter.Add("nome", e.nome);
                    iter.Add("lotacao_atual", e.lotaçao_Atual);
                    iter.Add("lotacao_max", e.lotaçao_Max);
                    iter.Add("duracao", e.duraçao.Replace(":", ""));
                    iter.Add("dificuldade", e.dificuldade);
                    iter.Add("instrutor_email", e.instrutor_email);
                    iter.Add("espaco_ginasio", e.espaço_ginasio);
                    jarray.Add(iter);
                    iter = new JObject();
                }

                return jarray;
            }
        }


        [HttpPost("marcar")]
        public ActionResult<string> marcarAula(dynamic json)
        {
            lock (_system)
            {
                JObject received = JObject.Parse(JsonSerializer.Serialize(json));
                ActionResult<string> ret = Ok();
                var uMail = _system.getUserGivenToken(received.GetValue("valueST").ToString());
                if (uMail == null) return Unauthorized("Client Offline");
                var tmp = received.GetValue("aula").ToObject<int>();
                AulaGrupo ag = _system.GetAulaID(tmp);
                ClienteAula ca = new ClienteAula(ag.id, ag.hora, ag.dia, uMail, ag.instrutor_email, ag.espaço_ginasio);

                if (((ag.lotaçao_Max < ag.lotaçao_Atual + 1) || !(_system.MarcarAula(ca))))
                    ret = BadRequest("Lotaçao Maxima atingida");


                return (ret);
            }
        }

        [HttpPost("desmarcar")]
        public ActionResult<string> DesmarcarAula(dynamic json)
        {
            lock (_system)
            {
                JObject received = JObject.Parse(JsonSerializer.Serialize(json));
                ActionResult<string> ret = Ok();
                if (!_system.isUserOnline(received.GetValue("valueST").ToString()))
                    return Unauthorized("Client Offline");

                var uMail = _system.getUserGivenToken(received.GetValue("valueST").ToString());
                var id = received.GetValue("aula").ToObject<int>();
                _system.DesmarcarAula(id, uMail);

                return (ret);
            }
        }


        [HttpPost("editar")]
        public ActionResult<string> editarAula(dynamic json)
        {
            lock (_system)
            {
                JObject received = JObject.Parse(JsonSerializer.Serialize(json));
                ActionResult<string> ret = Ok();
                if (!_system.isUserOnline(received.GetValue("valueST").ToString()))
                    return Unauthorized("Client Offline");

                JObject extract = (JObject) received.GetValue("aula");
                AulaGrupo ag = new AulaGrupo(
                    extract.GetValue("id").ToObject<int>(),
                    TimeSpan.Parse(extract.GetValue("hora").ToString().Replace('h', ':')),
                    extract.GetValue("dia").ToString(),
                    extract.GetValue("nome").ToString(),
                    extract.GetValue("lotacao_atual").ToObject<int>(),
                    extract.GetValue("lotacao_max").ToObject<int>(),
                    extract.GetValue("duracao").ToString(),
                    extract.GetValue("dificuldade").ToString(),
                    extract.GetValue("instrutor_email").ToString(),
                    extract.GetValue("espaco_ginasio").ToString()
                );
                _system.EditarAula(ag, ag.id);

                return (ret);
            }
        }



        [HttpPost("aula/clientes")]
        public ActionResult<string> getInAula([FromBody] dynamic token)
        {
            lock (_system)
            {
                JObject received = JObject.Parse(JsonSerializer.Serialize(token));
                if (!_system.isUserOnline(received.GetValue("valueST").ToString()))
                    return Unauthorized("Client Offline");
                string idAula = received.GetValue("aula").ToString();
                List<string> ret = new List<string>();
                _system.getClientesAula(idAula).ForEach((mail) => ret.Add(_system.GetUser(mail).GetName()));

                return Ok(ret);
            }
        }
        
      [HttpPost("cliente/estatisticas")]
              public ActionResult<string> GetEstatisticasCliente([FromBody] dynamic rec)
              {
                  lock (_system)
                  {
                      JObject job = JObject.Parse(rec.ToString());
                      if (!_system.isUserOnline(job.GetValue("valueST").ToString())) return Unauthorized("Client Offline");
      
                      string email = _system.getUserGivenToken(job.GetValue("valueST").ToString());
                      
                      Dictionary<string, int> estatisticasMap = new Dictionary<string, int>();
                      foreach(KeyValuePair<string, int> entry in _system.GetEstatisticasCliente(email))
                      {
                         if(entry.Value>0) estatisticasMap.Add(entry.Key,entry.Value);
                         else
                         {
                             Console.WriteLine("Boken estatistica: "+entry.ToString());
                         }
                      }


      
                      return Ok(estatisticasMap.ToList());
                  }
              }  
























    }
}