using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.UMFit_LN;
using UMFit_WebAPI.Models.UMFit_LN.Avaliacao;
using UMFit_WebAPI.Models.UMFit_LN.Planos.PlanoAlimentar;
using JsonSerializer = System.Text.Json.JsonSerializer;

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
            lock (_system)
            {
                if (!_system.isUserOnline(token.valueST)) return Unauthorized("Client Offline");

                var listaCinturas = new List<Registo_Avaliaçao>();
                var listaPesos = new List<Registo_Avaliaçao>();

                string email = _system.getUserGivenToken(token.valueST);

                listaPesos = _system.Generate_Reg(email,
                    "peso",
                    true);

                listaCinturas = _system.Generate_Reg(email,
                    "cintura",
                    false);

                var result = new
                {
                    Pesos = listaPesos,
                    Cinturas = listaCinturas
                };

                return Ok(result);
            }
        }

        [HttpPost("ultima")]
        public ActionResult<string> UltimaAvaliacao([FromBody] dynamic rec)
        {
            lock (_system)
            {
                var jobject = JObject.Parse(JsonSerializer.Serialize(rec));

                if (!_system.isUserOnline(jobject.valueST.ToString())) return Unauthorized("Client Offline");

                string email = jobject.email.ToString();

                Avaliaçao av = _system.GetUltAvaliaçaoR(email);

                if (av == null) return NotFound("Utilizador ainda não tem Avaliaçoes");

                JObject job = JObject.Parse(JsonConvert.SerializeObject(av));
                var nome = _system.GetUser(email).GetName();
                //---------------- Patch
                job.Remove("id");
                job.Remove("realizada");
                job.Remove("instrutor_email");
                job.Add("comentario", " ");
                job.Add("massa_gorda_img", " ");
                job.Add("cliente_nome", nome);
                //------------
                return Ok(job.ToString());
            }
        }

        [HttpPost]
        public ActionResult<string> criarAvaliacao([FromBody] dynamic rec)
        {
            lock (_system)
            {
                JObject jObject = JObject.Parse(rec.ToString());


                DateTime data = Convert.ToDateTime(jObject["data"].ToString());
                string email_cliente = (string) jObject["email_cliente"];
                string email_instrutor = (string) jObject["email_instrutor"];
                if (!_system.isUserOnline(jObject.GetValue("valueST").ToString()))
                    return Unauthorized("Client Offline");

                ActionResult<string> ret = BadRequest("Impossível inserir avaliação");

                try
                {
                    if (email_cliente.Equals("")) throw new Exception("EMAIL INVÁLIDO");

                    Composiçao_Corporal cc = new Composiçao_Corporal(
                        int.Parse(jObject["plano_treino"]["composicao_corporal"]["altura"].ToString()),
                        float.Parse(jObject["plano_treino"]["composicao_corporal"]["peso"].ToString()),
                        float.Parse(jObject["plano_treino"]["composicao_corporal"]["massa_gorda"].ToString()),
                        float.Parse(jObject["plano_treino"]["composicao_corporal"]["massa_magra"].ToString()),
                        float.Parse(jObject["plano_treino"]["composicao_corporal"]["imc"].ToString()),
                        int.Parse(jObject["plano_treino"]["composicao_corporal"]["idade_metabolica"].ToString()));

                    Perimetros p = new Perimetros(
                        float.Parse(jObject["plano_treino"]["perimetros"]["cintura"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["abdomen"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["ombro"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["torax"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["braco_dir"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["braco_esq"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["coxa_dir"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["coxa_esq"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["gemeo_dir"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["gemeo_esq"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["antebraco_dir"].ToString()),
                        float.Parse(jObject["plano_treino"]["perimetros"]["antebraco_esq"].ToString()));

                    Avaliaçao av = new Avaliaçao(
                        data,
                        email_instrutor,
                        email_cliente,
                        cc,
                        p);

                    if (_system.AddAvaliacao(av)) ret = Ok();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                }

                return (ret);
            }
        }

        [HttpPost("agendadas/cliente")]
        public ActionResult<string> AvaliacoesAgendadas([FromBody] dynamic rec)
        {
            lock (_system)
            {
                var jobject = JObject.Parse(JsonSerializer.Serialize(rec));
                if (!_system.isUserOnline(jobject.valueST.ToString())) return Unauthorized("Client Offline");

                string email = jobject.email.ToString();
                List<Avaliaçao> av = _system.GetAvaAgendCli(email);
                JArray array = new JArray();
                foreach (Avaliaçao a in av)
                {
                    JObject tmp = new JObject();
                    tmp.Add("instrutor_email", a.instrutor_email);
                    tmp.Add("instrutor_nome", _system.GetUser(a.instrutor_email).GetName());
                    tmp.Add("data", a.data.ToString("yyyy-MM-dd HH:mm:ss"));
                    array.Add(tmp);
                }

                JObject avaliacoes = new JObject();
                avaliacoes.Add("avaliacoes", array);
                return Ok(avaliacoes.ToString());
            }
        }

        [HttpPost("agendar")]
        public ActionResult<string> Agendar([FromBody] dynamic obj)
        {
            lock (_system)
            {
                ActionResult<string> ret = Ok();
                JObject job = JObject.Parse((string) obj.ToString());
                if (!_system.isUserOnline(job.GetValue("valueST").ToString())) return Unauthorized("Client Offline");

                JObject ava = (JObject) job.GetValue("avaliacao");
                Avaliaçao av = new Avaliaçao(Convert.ToDateTime(ava.GetValue("data").ToString()),
                    ava.GetValue("instrutor_email").ToString(),
                    job.GetValue("email").ToString());
                //Console.WriteLine(av);
                if (!_system.agendarAvaliaçao(av)) ret = BadRequest();
                return ret;
            }
        }

        [HttpPost("agendadas/instrutor")]
        public ActionResult<string> AvaliacoesAgendadasInstrutor([FromBody] dynamic rec)
        {
            lock (_system)
            {
                JObject job = JObject.Parse((string) rec.ToString());
                if (!_system.isUserOnline(job.GetValue("valueST").ToString())) return Unauthorized("Client Offline");

                string email = job.GetValue("email").ToString();
                List<Avaliaçao> av = _system.GetAvaAgendInst(email);
                JArray array = new JArray();
                foreach (Avaliaçao a in av)
                {
                    JObject tmp = new JObject();
                    tmp.Add("instrutor_email", a.cliente_email);
                    tmp.Add("instrutor_nome", _system.GetUser(a.cliente_email).GetName());
                    tmp.Add("data", a.data.ToString("yyyy-MM-dd HH:mm:ss"));
                    array.Add(tmp);
                }

                JObject avaliacoes = new JObject();
                avaliacoes.Add("avaliacoes", array);
                return Ok(avaliacoes.ToString());
            }
        }
    }
}