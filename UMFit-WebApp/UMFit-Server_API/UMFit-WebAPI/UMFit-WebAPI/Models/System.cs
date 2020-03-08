using System.Collections.Generic;
using System.Linq;
using UMFit_WebAPI.Models.Users;
using NotImplementedException = System.NotImplementedException;

namespace UMFit_WebAPI.Models
{
    public class System
    {
        //Mapping between User ID and User Object
        private readonly Dictionary<int, User> _users;

        public System()
        {
            _users = new Dictionary<int, User>
            {
                {1, new User(1, "a85227@alunos.uminho.pt", "secretpass1")},
                {2, new User(2, "a89983@alunos.uminho.pt", "secretpass2")},
                {3, new User(3, "a83719@alunos.uminho.pt", "secretpass3")},
                {4, new User(4, "a85729@alunos.uminho.pt", "secretpass4")},
                {5, new User(5, "a84656@alunos.uminho.pt", "secretpass5")}
            };
        }

        public List<User> GetUsers()
        {
            return _users.Values.ToList();
        }

        public User GetUser(int id)
        {
            if (!_users.ContainsKey(id))
            {
                return null;
            }
            
            return _users[id];
        }

        public User Authenticate(string userDtoEmail, string userDtoPassword)
        {
            foreach (var user in _users.Values)
            {
                if (!user.email.Equals(userDtoEmail)) continue;
                if (user.password.Equals(userDtoPassword)) return user;
            }

            return null;
        }
    }
}