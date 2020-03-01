
namespace UMFit_WebAPI.Models.Users
{
    public class User
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }

        public User(int id, string name, string eMail, string password)
        {
            Id = id;
            Name = name;
            EMail = eMail;
            Password = password;
        }
    }
}