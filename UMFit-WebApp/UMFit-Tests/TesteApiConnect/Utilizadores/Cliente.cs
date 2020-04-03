using MySql.Data.MySqlClient;
using System;
using System.Text;

namespace TesteApiConnect
{
    class Cliente : InterfaceUtilizador
    {
        public string tipoDeUser { set; get }
        public string email { get; set; }
        public int nif { get; set; }
        public string nome { get; set; }
        public int genero { get; set; }
        public DateTime data_nascimento { get; set; }
        public string localidade { get; set; }
        public string categoria { get; set; }

        public Cliente(string email, int nif, string nome, int genero, 
                       DateTime data_nascimento, string localidade, string categoria)
        {
            this.tipoDeUser = "Cliente";
            this.email = email;
            this.nif = nif;
            this.nome = nome;
            this.genero = genero;
            this.data_nascimento = data_nascimento;
            this.localidade = localidade;
            this.categoria = categoria;
        }

        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append(this.tipoDeUser + "\n");
            r.Append("\nEmail: " + this.email + ";\n");
            r.Append("Nif: " + this.nif + ";\n");
            r.Append("Nome: " + this.nome + ";\n");
            r.Append("Genero: " + this.genero + ";\n");
            r.Append("Data nascimento: " + this.data_nascimento.ToString() + ";\n");
            r.Append("Localidade: " + this.localidade + ";\n");
            r.Append("Categoria: " + this.categoria + ".\n");

            return r.ToString();
        }

        public string GetEmail()
        {
            return this.email;
        }

        public string ToSql(string hashPass)
        {
            StringBuilder r = new StringBuilder();

            r.Append("'" + this.email + "', ");
            r.Append(this.nif + ",");
            r.Append("'" + this.nome + "', ");
            r.Append("'" + hashPass + "', ");
            r.Append("'" + this.data_nascimento.ToString() + "', ");
            r.Append(this.genero + ", ");
            r.Append("'" + this.categoria + "', ");
            r.Append("'" + this.localidade + "' ");

            return r.ToString();
        }

        public void IniParamSql(MySqlCommand command)
        {
            command.Parameters.Add(new MySqlParameter("@EMAIL", MySqlDbType.VarChar));
            command.Parameters["@EMAIL"].Value = this.email;

            command.Parameters.Add(new MySqlParameter("@NIF", MySqlDbType.Int32));
            command.Parameters["@NIF"].Value = this.nif;

            command.Parameters.Add(new MySqlParameter("@NOME", MySqlDbType.VarChar));
            command.Parameters["@NOME"].Value = this.nome;

            command.Parameters.Add(new MySqlParameter("@DATA_NASCIMENTO", MySqlDbType.DateTime));
            command.Parameters["@DATA_NASCIMENTO"].Value = this.data_nascimento;

            command.Parameters.Add(new MySqlParameter("@GENERO", MySqlDbType.Int16));
            command.Parameters["@GENERO"].Value = this.genero;

            command.Parameters.Add(new MySqlParameter("@CATEGORIA", MySqlDbType.VarChar));
            command.Parameters["@CATEGORIA"].Value = this.categoria;

            command.Parameters.Add(new MySqlParameter("@LOCALIDADE", MySqlDbType.VarChar));
            command.Parameters["@LOCALIDADE"].Value = this.localidade;
        }
    }
}
