
namespace UMFit_WebAPI.Models.Users
{
    public class User
    {
        public int id { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public User()
        {
            this.id = -1;
            this.email = "empty.user@umfit.com";
        }
        
        public User(int id, string new_email, string new_password)
        {
            this.id = id;
            this.email = new_email;
            this.password = new_password;
        }
    }
}