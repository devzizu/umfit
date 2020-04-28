
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
            
            return Ok(_system.AddAvaliacao(av));
        }

    }
}