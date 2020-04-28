﻿/*
 * Classe Composiçao_Corporal que guarda todos os atributos, mais propriamente,
 * os perimetros relativos à Avaliação
 */
using System.Text;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace UMFit_WebAPI.Models.UMFit_LN.Avaliacao
{
    public class Composiçao_Corporal
    {
        public int altura { set; get; }

        public float peso { set; get; }

        public float massa_gorda { set; get; }

        public float massa_magra { set; get; }

        public float imc { set; get; }

        public int idade_metabolica { set; get; }

        public Composiçao_Corporal()
        {
            this.altura = 0;
            this.peso = 0;
            this.massa_gorda = 0;
            this.massa_magra = 0;
            this.imc = 0;
            this.idade_metabolica = 0;
        }

        public Composiçao_Corporal(int altura, float peso, float massa_gorda, float massa_magra, float imc, int idade_metabolica)
        {
            this.altura = altura;
            this.peso = peso;
            this.massa_gorda = massa_gorda;
            this.massa_magra = massa_magra;
            this.imc = imc;
            this.idade_metabolica = idade_metabolica;
        }

        public string ToSql(bool isNull)
        {
            StringBuilder r = new StringBuilder();

            if (isNull)
            {
                string n = "null";

                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n + ", ");
                r.Append(n);
            }
            else
            {
                r.Append("@ALTURA, ");
                r.Append("@PESO, ");
                r.Append("@MASSA_GORDA, ");
                r.Append("@MASSA_MAGRA, ");
                r.Append("@IMC, ");
                r.Append("@IDADE_METABOLICA");
            }

            return r.ToString();
        }

        public void IniParamSql(MySqlCommand command)
        {
            command.Parameters.Add(new MySqlParameter("@ALTURA", MySqlDbType.Int32));
            command.Parameters["@ALTURA"].Value = this.altura;

            command.Parameters.Add(new MySqlParameter("@PESO", MySqlDbType.Float));
            command.Parameters["@PESO"].Value = this.peso;

            command.Parameters.Add(new MySqlParameter("@MASSA_GORDA", MySqlDbType.Float));
            command.Parameters["@MASSA_GORDA"].Value = this.massa_gorda;

            command.Parameters.Add(new MySqlParameter("@MASSA_MAGRA", MySqlDbType.Float));
            command.Parameters["@MASSA_MAGRA"].Value = this.massa_magra;

            command.Parameters.Add(new MySqlParameter("@IMC", MySqlDbType.Float));
            command.Parameters["@IMC"].Value = this.imc;

            command.Parameters.Add(new MySqlParameter("@IDADE_METABOLICA", MySqlDbType.Int32));
            command.Parameters["@IDADE_METABOLICA"].Value = this.idade_metabolica;
        }


        public override string ToString()
        {
            StringBuilder r = new StringBuilder();

            r.Append("Altura: " + this.altura + ";\n");
            r.Append("Peso: " + this.peso + ";\n");
            r.Append("Massa Gorda: " + this.massa_gorda + ";\n");
            r.Append("Massa Magra: " + this.massa_magra + ";\n");
            r.Append("IMC: " + this.imc + ";\n");
            r.Append("Idade Metabólica: " + this.idade_metabolica + ";\n");

            return r.ToString();
        }

    }
}