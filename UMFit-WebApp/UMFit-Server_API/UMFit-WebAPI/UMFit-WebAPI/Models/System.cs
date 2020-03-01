using System.Collections.Generic;
using UMFit_WebAPI.Models.Users;

namespace UMFit_WebAPI.Models
{
    public class System
    {
        private readonly List<User> _users;

        public System()
        {
            _users = new List<User>() {
                new User(1, "João Azevedo", "a85227@alunos.uminho.pt", "secretpass1"),
                new User(2, "Paulo Lima", "a89983@alunos.uminho.pt", "secretpass2")
            };
        }

        public List<User> GetUsers()
        {
            return _users;
        }

        public User GetUser(int id)
        {
            if (id > _users.Count)
            {
                return null;
            }
                        
            return _users[id-1];
        }
    }
}