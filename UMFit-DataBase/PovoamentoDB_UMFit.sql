use UMFit_DB;

-- NOTAS
-- Género é definido por um inteiro. 0 no caso de ser feminino e 1 caso seja masculino;
-- A categoria do cliente tem os seguintes valores possiveis: Standard, Premium;

-- CODIGO_POSTAL -----------------------------------------------------------------------------------------
insert into Codigo_Postal values ("Famalicão", "4760");
insert into Codigo_Postal values ("Braga", "4700");
insert into Codigo_Postal values ("Porto", "4000");
insert into Codigo_Postal values ("Fafe", "4820");

-- RECECIONISTAS -----------------------------------------------------------------------------------------

-- Pass sem estar encriptada: helloSus
insert into Rececionista
values ("susanaMag@gmail.com", 1, "Susana Magalhães", 
		"96220D456C93E47A7C70C217DF5ED577CA91E2B03DF758A1422FA6CE1585A5BF",
         "1990-04-23", 0, "Porto");
-- Pass : helloAnto 
insert into Rececionista
values ("antoPi@hotmail.com", 2, "António Pinheiro", 
		"E727B8094CF763E259F3C1F0DA8B3AAFFC5371A3B1F655546AD5D0C67784EE15", 
         "1983-06-01", 1, "Braga");
-- pass: passTeste
insert into Rececionista
values ("a84656@alunos.uminho.pt", 3, "Hugo Cunha",  
		"52BBA69FCE7D58C7BD158821495F50355D6CA00D2403B764A42368DFFA84CE1A",
        "1999-04-23", 1, "Fafe");



-- CLIENTES -----------------------------------------------------------------------------------------
-- pass: passTeste
insert into Cliente 
values ("a83719@alunos.uminho.pt", 10, "Pedro Machado",
		"52BBA69FCE7D58C7BD158821495F50355D6CA00D2403B764A42368DFFA84CE1A",
        "1999-02-23", 1, "Premium", "Famalicão");
-- pass: passTeste
insert into Cliente
values ("a85729@alunos.uminho.pt", 11, "Paulo Araújo", 
		"52BBA69FCE7D58C7BD158821495F50355D6CA00D2403B764A42368DFFA84CE1A",
        "1999-09-28", 1, "Standard", "Famalicão");

insert into Cliente
values ("test", 99, "TesteUser",
        "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08",
        "1999-09-19", 1, "Standard", "Famalicão");     
		
        
-- INSTRUTORES -----------------------------------------------------------------------------------------

-- pass: passTeste
insert into Instrutor 
values ("a85227@alunos.uminho.pt", 100, "João Azevedo", 
		"52BBA69FCE7D58C7BD158821495F50355D6CA00D2403B764A42368DFFA84CE1A",
        "1999-10-15", 1, "Famalicão");
        
-- pass: passTeste
insert into Instrutor
values ("a89983@alunos.uminho.pt", 101, "Paulo Lima", 
		"52BBA69FCE7D58C7BD158821495F50355D6CA00D2403B764A42368DFFA84CE1A", 
        "1999-04-20", 1, "Famalicão");



-- ESPAÇO GINASIO -----------------------------------------------------------------------------------------
insert into Espaço_Ginasio 
values ("Sala de Musculação", 1);

insert into Espaço_Ginasio 
values ("Sala de Cardio", 0);

insert into Espaço_Ginasio 
values ("Piscina", 1);

insert into Espaço_Ginasio 
values ("Sala 1 de aulas de grupo", 0);

insert into Espaço_Ginasio 
values ("Sala 2 de aulas de grupo", 0);


-- CLIENTE NO ESPAÇO GINASIO -----------------------------------------------------------------------------------------
insert into Cliente_no_EspaçoGinasio
values ("a83719@alunos.uminho.pt", "Sala de Musculação");



--  AULA GRUPO -----------------------------------------------------------------------------------------
insert into Aula_Grupo 
values (1, "2020-03-18", "Cycling", 1, 20, "1h30m", "Difícil", "a85227@alunos.uminho.pt");


-- CLIENTES NA AULA GRUPO -----------------------------------------------------------------------------------------
insert into Clientes_na_AulaGrupo 
values ("a85729@alunos.uminho.pt", 1, "2020-03-18", "a85227@alunos.uminho.pt");


-- AVALIAÇAO REALIZADA -----------------------------------------------------------------------------------------
insert into Avaliaçao_Realizada 
values (1, 180, 79.0, 7.27, 68.3, 24.38, 12);

insert into Avaliaçao_Realizada 
values (2, 180, 77.0, 8.50, 66.8, 22, 12);

insert into Avaliaçao_Realizada 
values (3, 179, 81.0, 7.27, 68.3, 24.38, 12);

insert into Avaliaçao_Realizada 
values (4, 180, 80.2, 7.00, 70.3, 24.38, 13);

insert into Avaliaçao_Realizada 
values (5, null, null, null, null, null, null);


-- AVALIAÇAO AGENDADA -----------------------------------------------------------------------------------------
insert into Avaliaçao_Agendada
values ("2020-03-01 14:00:00", "a89983@alunos.uminho.pt", "a83719@alunos.uminho.pt", 1);

insert into Avaliaçao_Agendada
values ("2020-02-04 15:30:00", "a85227@alunos.uminho.pt", "a83719@alunos.uminho.pt", 2);

insert into Avaliaçao_Agendada
values ("2020-02-08 15:30:00", "a85227@alunos.uminho.pt", "a83719@alunos.uminho.pt", 3);

insert into Avaliaçao_Agendada
values ("2020-03-10 10:00:00", "a85227@alunos.uminho.pt", "a83719@alunos.uminho.pt", 4);

insert into Avaliaçao_Agendada
values ("2020-04-01 18:00:00", "a85227@alunos.uminho.pt", "a83719@alunos.uminho.pt", 5);


-- EXERCICIO -----------------------------------------------------------------------------------------
insert into Exercicio 
values (1, "Elevações", "3x");

insert into Exercicio 
values (2, "Puxada", "12-10-8");

insert into Exercicio 
values (3, "Remada curvada", "12-10-8");

insert into Exercicio 
values (4, "Remada unilateral", "(12-12)x3");

insert into Exercicio 
values (5, "Remada alta na polia", "12-10-8");

insert into Exercicio 
values (6, "Trícept pega junta", "12-10-8");

insert into Exercicio 
values (7, "Trícept polia unilateral", "(12-12)x3");

insert into Exercicio 
values (8, "Afundos no banco", "12x3");

insert into Exercicio 
values (9, "Abdominal Tesoura", "20 rep");

insert into Exercicio 
values (10, "Crunch na fit-ball", "12x3");

-- PLANO TREINO -----------------------------------------------------------------------------------------
insert into Plano_Treino 
values (1, "Treino A - Trícept e Costas", "2020-01-01", "2020-04-01", "Trícept e Costas", "1 vez por semana");


-- PLANO TREINO DO CLIENTE -----------------------------------------------------------------------------------------
insert into PlanoTreino_do_Cliente 
values (1, "a83719@alunos.uminho.pt");


-- EXERCICIO DO PLANO DE TREINO -----------------------------------------------------------------------------------------
insert into Exercicio_do_Plano_Treino
values (1, 1);

insert into Exercicio_do_Plano_Treino
values (2, 1);

insert into Exercicio_do_Plano_Treino
values (3, 1);

insert into Exercicio_do_Plano_Treino
values (4, 1);

insert into Exercicio_do_Plano_Treino
values (5, 1);

insert into Exercicio_do_Plano_Treino
values (6, 1);

insert into Exercicio_do_Plano_Treino
values (7, 1);

insert into Exercicio_do_Plano_Treino
values (8, 1);

insert into Exercicio_do_Plano_Treino
values (9, 1);

insert into Exercicio_do_Plano_Treino
values (10, 1);

-- REFEIÇAO -----------------------------------------------------------------------------------------
insert into Refeiçao
values (1, "Pequeno Almoço", "1 x Pão com fiambre ou queijo; 1 x Café; 1 x Copo de leite; ...");


-- PLANO ALIMENTAR -----------------------------------------------------------------------------------------
insert into Plano_Alimentar 
values (1, "Plano alimentar para ganhar peso", " 6 vezes por semana", 3, "2020-04-01", "2020-09-01");


-- PLANO ALIMENTAR REFEIÇOES -----------------------------------------------------------------------------------------
insert into Plano_Alimentar_Refeiçoes
values (1, 1);


-- PLANO ALIMENTAR DO CLIENTE -----------------------------------------------------------------------------------------
insert into PlanoAlimentar_do_Cliente 
values (1, "a85729@alunos.uminho.pt");


-- delete from UtilizadoresOnline u where u.email = "a83719@alunos.uminho.pt"; 

select * from UtilizadoresOnline;
delete from UtilizadoresOnline;
