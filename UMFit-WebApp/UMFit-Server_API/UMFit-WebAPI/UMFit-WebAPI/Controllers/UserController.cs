
using System;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using MySqlX.Serialization;
using Newtonsoft.Json.Linq;
using UMFit_WebAPI.Dto;
using UMFit_WebAPI.Models.Data.DAO;
using UMFit_WebAPI.Models.Security;
using UMFit_WebAPI.Models.UMFit_LN;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores;
using UMFit_WebAPI.Models.UMFit_LN.Utilizadores.Interfaces;


namespace UMFit_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UMFit_LN _system = new UMFit_LN();

        [HttpPost("logout")]
        public ActionResult<string> Logout([FromBody] StringDto token)
        {
            lock (_system)
            {
                if (!_system.isUserOnline(token.valueST)) return Unauthorized("Client offline");
                _system.logout(token.valueST);

                return Ok();
            }
        }

        [HttpPost("status")]
        public ActionResult<string> Status([FromBody] StringDto token)
        {
            lock (_system)
            {
                var validToken = _system.isUserOnline(token.valueST);
                if (!validToken) return Unauthorized("Client offline");

                String statusToken = validToken ? "online" : "offline";

                InterfaceUtilizador user = null;

                if (validToken)
                {
                    _system.RenovaToken(token.valueST);

                    var email = _system.getUserGivenToken(token.valueST);

                    user = _system.GetUser(email);

                    int typeOfUser = _system.TypeUser(user.GetEmail());

                    if (typeOfUser != -1)
                    {
                        switch (typeOfUser)
                        {
                            case 0:
                            {
                                user = (Cliente) user;
                                break;
                            }
                            case 1:
                            {
                                user = (Instrutor) user;
                                break;
                            }
                            case 2:
                            {
                                user = (Rececionista) user;
                                break;
                            }
                        }
                    }

                }

                string userData = JsonSerializer.Serialize(user, user.GetType());
                StringBuilder a = new StringBuilder()
                    .Append("{")
                    .Append("\"status\":\"")
                    .Append(statusToken)
                    .Append("\",\"user\":")
                    .Append(userData)
                    .Append("}");

                return Ok(a.ToString());
            }
        }

        [HttpPost("authenticate")]
        public ActionResult<InterfaceUtilizador> Authenticate([Bind] UserAuthenticationDto userDto)
        {
            lock (_system)
            {

                InterfaceUtilizador user = null;
                int typeOfUser = _system.TypeUser(userDto.email);
                string token = CalculateHash.GetHashString(userDto.email + DateTime.Now);
                if (typeOfUser != -1)
                {
                    switch (typeOfUser)
                    {
                        case 0:
                        {
                            user = (Cliente) _system.Authenticate(userDto.email, userDto.password, token);
                            break;
                        }
                        case 1:
                        {
                            user = (Instrutor) _system.Authenticate(userDto.email, userDto.password, token);
                            break;
                        }
                        case 2:
                        {
                            user = (Rececionista) _system.Authenticate(userDto.email, userDto.password, token);
                            break;
                        }
                    }

                }

                if (user == null || typeOfUser == -1)
                {
                    return Unauthorized(new
                    {
                        message = "Credentials are wrong..."
                    });
                }

                StringBuilder a = new StringBuilder()
                    .Append("{")
                    .Append("\"token\":\"")
                    .Append(token)
                    .Append("\",\"user\":")
                    .Append(JsonSerializer.Serialize(user, user.GetType()))
                    .Append("}");

                return Ok(a.ToString());
            }
        }

        [HttpPost("create")]
        public ActionResult<string> InserirUtilizador([FromBody] dynamic json)
        {
            lock (_system)
            {

                var res = JsonSerializer.Serialize(json);
                var createUserObject = JObject.Parse(res);

                var userJson = createUserObject.newUser;
                if (_system.GetUser((string) userJson.email) != null) return Conflict("Email já registado");
                InterfaceUtilizador user = null;
                var tipo = -1;
                try
                {
                    switch (Convert.ToString(userJson.tipoDeUser))
                    {
                        case "Cliente":
                        {
                            user = new Cliente((string) userJson.email,
                                (int) Convert.ToInt32(userJson.nif),
                                (string) userJson.nome,
                                (int) Convert.ToInt16(userJson.genero),
                                (DateTime) Convert.ToDateTime(userJson.data_nascimento),
                                (string) userJson.localidade,
                                (string) userJson.categoria);
                            tipo = 0;
                            break;
                        }
                        case "Instrutor":
                        {
                            user = new Instrutor((string) userJson.email,
                                (int) Convert.ToInt32(userJson.nif),
                                (string) userJson.nome,
                                (int) Convert.ToInt16(userJson.genero),
                                (DateTime) Convert.ToDateTime(userJson.data_nascimento),
                                (string) userJson.localidade);

                            tipo = 1;
                            break;
                        }
                        case "Rececionista":
                        {
                            user = new Rececionista((string) userJson.email,
                                (int) Convert.ToInt32(userJson.nif),
                                (string) userJson.nome,
                                (int) Convert.ToInt16(userJson.genero),
                                (DateTime) Convert.ToDateTime(userJson.data_nascimento),
                                (string) userJson.localidade);


                            tipo = 2;
                            break;
                        }
                    }
                }
                catch (Exception)
                {
                    return BadRequest("Credenciais Invalidas");
                }

                if (!_system.createUser(user, tipo, (string) Convert.ToString(createUserObject.passwordHash)))
                    return BadRequest("Credenciais Invalidas");

                return Ok();
            }
        }

        [HttpPost("update")]
        public ActionResult<string> AtualizarUtilizador([FromBody] dynamic json)
        {
            lock (_system)
            {
                try
                {

                    var res = JsonSerializer.Serialize(json);
                    var createUserObject = JObject.Parse(res);
                    string email = (string) createUserObject.userEmail;
                    string localidadeNova = (string) createUserObject.newLocalidade;
                    InterfaceUtilizador user = null;
                    int typeOfUser = _system.TypeUser(email);

                    string passHash = (string) createUserObject.newPasswordHash==""? _system.GetPass(email,typeOfUser) : createUserObject.newPasswordHash;
                    if (typeOfUser != -1)
                    {
                        switch (typeOfUser)
                        {
                            case 0:
                            {
                                user = (Cliente) _system.GetUser(email);
                                ((Cliente) user).localidade = localidadeNova;
                                break;
                            }
                            case 1:
                            {
                                user = (Instrutor) _system.GetUser(email);
                                ((Instrutor) user).localidade = localidadeNova;
                                break;
                            }
                            case 2:
                            {
                                user = (Rececionista) _system.GetUser(email);
                                ((Rececionista) user).localidade = localidadeNova;
                                break;
                            }
                        }

                    }

                    _system.UpdateUser(user, typeOfUser, passHash);
                }
                catch (Exception)
                {
                    return BadRequest("Dados Invalidos");
                }

                return Ok();
            }
        }

        [HttpPost("emails")]
        public ActionResult<string> GetEmails([FromBody] StringDto token)
        {
            lock (_system)
            {
                if (!_system.isUserOnline(token.valueST)) return Unauthorized("Client offline");
                var emailsList = _system.GetAllEmails();

                return Ok(new
                {
                    users = emailsList
                });
            }
        }

        [HttpPost("select")]
        public ActionResult<string> SelectUser([FromBody] dynamic json)
        {
            lock (_system)
            {
                var res = JsonSerializer.Serialize(json);
                JObject job = JObject.Parse(res);
                String email = job.GetValue("email").ToString();
                if (!_system.isUserOnline(job.GetValue("valueST").ToString())) return Unauthorized("Client Offline");

                InterfaceUtilizador u = _system.GetUser(email);
                var user = new JObject();
                user.Add("name", u.GetName());
                user.Add("email", email);

                user.Add("cat", u.GetType().Name);
                user.Add("localidade", u.GetLocalidade());
                if (u.GetType().Name == "Cliente") user.Add("categoria", "Cliente " + ((Cliente) u).categoria);
                var ret = new JObject();
                ret.Add("user", user);
                return Ok(ret.ToString());
            }
        }

        [HttpPost("remove")]
        public ActionResult<string> RemoveUser([FromBody] dynamic json)
        {
            lock (_system)
            {
                var res = JObject.Parse(JsonSerializer.Serialize(json));
                if (!_system.isUserOnline(res.GetValue("valueST").ToString())) return Unauthorized("Client Offline");
                String email = res.GetValue("email").ToString();
                char type = res.GetValue("type").ToString()[0];
                _system.RemoveUser(email, type);
                return Ok();
            }
        }

        [HttpPost("emails/clientes")]
        public ActionResult<string> GetClientEmails([FromBody] StringDto token)
        {
            lock (_system)
            {
                if (!_system.isUserOnline(token.valueST)) return Unauthorized("Client Offline");

                var emailsList = _system.GetUserEmails();

                return Ok(new
                {
                    users = emailsList
                });
            }
        }

        [HttpPost("emails/clientes/premium")]
        public ActionResult<string> GetClientEmailsPremium([FromBody] StringDto token)
        {
            lock (_system)
            {
                if (!_system.isUserOnline((string) token.valueST)) return Unauthorized("Client Offline");

                var emailsList = _system.GetPremiumClientEmails();

                return Ok(new
                {
                    users = emailsList
                });
            }
        }

        [HttpPost("categoria")]
        public ActionResult<string> AtualizarCat([FromBody] dynamic json)
        {
            lock (_system)
            {
                var received = JObject.Parse(JsonSerializer.Serialize(json));
                if (!_system.isUserOnline(received.GetValue("valueST").ToString()))
                    return Unauthorized("Client Offline");


                string email = (string) received.userEmail;
                string newTipo = (string) received.tipo;

                int typeOfUser = _system.TypeUser(email);
                if (typeOfUser == -1) return NotFound("Utilizador Invalido");
                if (typeOfUser != 0)
                    return StatusCode(403,
                        "Não existe categoria num " + ((typeOfUser == 1)
                            ? "Instrutor"
                            : (typeOfUser == 2 ? "Treinador" : " ")));
                _system.UpdateClientCat(email, newTipo.Remove(0, "Cliente ".Length));
                return Ok();
            }
        }

        [HttpPost("emails/instrutores")]
        public ActionResult<string> GetIntrutorEmails([FromBody] StringDto token)
        {
            lock (_system)
            {
                if (!_system.isUserOnline(token.valueST)) return Unauthorized("Client Offline");

                var emailsList = _system.GetAllEmailsNames("Instrutor");
                return Ok(new
                {
                    instrutores = emailsList
                });
            }
        }



    }
}