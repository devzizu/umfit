
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.UMFit_LN;
using UMFit_WebAPI.Models.UMFit_LN.Avaliacao;

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

            bool tokenOK = _system.isUserOnline(token.valueST);

            var listaCinturas = new List<Registo_Avaliaçao>();
            var listaPesos = new List<Registo_Avaliaçao>();

            if (tokenOK)
            {
                string email = _system.getUserGivenToken(token.valueST);

                listaPesos = _system.Generate_Reg(email, 
                    "peso", 
                    true);
            
                listaCinturas = _system.Generate_Reg(email, 
                    "cintura", 
                    false);
            }
            
            var result = new
            {
                TokenStatus = tokenOK,
                Pesos = listaPesos,
                Cinturas = listaCinturas
            };
 
            return Ok(result);
        }

        [HttpPost("last")]
        public ActionResult<string> UltimaAvaliacao([FromBody] StringDto token){
            string email=token.valueST;
            Avaliaçao av = _system.GetUltAvaliaçaoR(email);
            
            if (av == null) return BadRequest("Utilizador ainda não tem Avaliaçoes");
            
            JObject job = JObject.Parse(JsonConvert.SerializeObject(av));
            var nome = _system.GetUser(email).GetName();
            //---------------- Patch
            job.Remove("id");
            job.Remove("realizada");
            job.Remove("instrutor_email");
            job.Add("comentario", " ");
            job.Add("massa_gorda_img"," ");
            job.Add("cliente_nome",nome);
            //------------
            return Ok(job.ToString());
        }
        
        [HttpPost("criar")]
        public ActionResult<string> criarAvaliacao([FromBody] dynamic rec)
        {
            JObject jObject = JObject.Parse(rec.ToString());

            DateTime data = Convert.ToDateTime(jObject["data"].ToString());
            string email_cliente = (string) jObject["email_cliente"];
            string email_instrutor = (string) jObject["email_instrutor"];
            
            ActionResult<string> ret= BadRequest("Impossível inserir avaliação");
            
            try
            {
                if(email_cliente.Equals("")) throw new Exception("EMAIL BROKEN");
                
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
            catch (Exception e){Console.WriteLine(e.ToString()); }
            
            return (ret);
        }
        
        [HttpPost("agendadas")]
        public ActionResult<string> AvaliacoesAgendadas([FromBody] StringDto token){
            string email=token.valueST;
            List<Avaliaçao> av = _system.GetAvaAgendCli(email);
            JArray array = new JArray();
            foreach(Avaliaçao a in av)
            {
                JObject tmp = new JObject();
                tmp.Add("instrutor_email", a.instrutor_email);
                tmp.Add("instrutor_nome", _system.GetUser(a.instrutor_email).GetName());
                tmp.Add("data",a.data.ToString("yyyy-MM-dd HH:mm:ss"));
                array.Add(tmp);
            }
            JObject avaliacoes = new JObject();
            avaliacoes.Add("avaliacoes",array);
            return Ok(avaliacoes.ToString());
        }
        
        [HttpPost("agendar")]
        public ActionResult<string> Agendar([FromBody] dynamic obj)
        {
            ActionResult<string> ret=Ok();
            JObject job = JObject.Parse((string) obj.ToString());
            JObject ava =(JObject) job.GetValue("avaliacao");
            Avaliaçao av = new Avaliaçao( Convert.ToDateTime(ava.GetValue("data").ToString()),
                                   ava.GetValue("instrutor_email").ToString(),
                                    job.GetValue("email").ToString());
            //Console.WriteLine(av);
            if (!_system.agendarAvaliaçao(av)) ret = BadRequest();
            return ret;
        }
        [HttpPost("agendadasI")]
        public ActionResult<string> AvaliacoesAgendadasInstrutor([FromBody] StringDto token){
            string email=token.valueST;
            List<Avaliaçao> av = _system.GetAvaAgendInst(email);
            JArray array = new JArray();
            foreach(Avaliaçao a in av)
            {
                JObject tmp = new JObject();
                tmp.Add("instrutor_email", a.cliente_email);
                tmp.Add("instrutor_nome", _system.GetUser(a.cliente_email).GetName());
                tmp.Add("data",a.data.ToString("yyyy-MM-dd HH:mm:ss"));
                array.Add(tmp);
            }
            JObject avaliacoes = new JObject();
            avaliacoes.Add("avaliacoes",array);
            return Ok(avaliacoes.ToString());
        }
    }
}