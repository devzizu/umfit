use UMFit_DB;
select * from Refeiçao;
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

insert into Instrutor
values ("joseCarv@gmail.com", 102, "José Carvalho", 
		"52BBA69FCE7D58C7BD158821495F50355D6CA00D2403B764A42368DFFA84CE1A", 
        "1993-06-27", 1, "Braga");

insert into Instrutor
values ("anaSILVa@hotmail.com", 103, "Ana Silva", 
		"52BBA69FCE7D58C7BD158821495F50355D6CA00D2403B764A42368DFFA84CE1A", 
        "1995-01-03", 0, "Braga");

insert into Instrutor
values ("mariCst@gmail.com", 104, "Maria Costa", 
		"52BBA69FCE7D58C7BD158821495F50355D6CA00D2403B764A42368DFFA84CE1A", 
        "1996-02-25", 0, "Porto");

-- ESPAÇO GINASIO -----------------------------------------------------------------------------------------
insert into Espaço_Ginasio 
values ("Sala de Musculação", 1);

insert into Espaço_Ginasio 
values ("Sala de Cardio", 0);

insert into Espaço_Ginasio 
values ("Piscina", 0);

insert into Espaço_Ginasio 
values ("Sala 1 de aulas de grupo", 0);

insert into Espaço_Ginasio 
values ("Sala 2 de aulas de grupo", 0);


-- CLIENTE NO ESPAÇO GINASIO -----------------------------------------------------------------------------------------
insert into Cliente_no_EspaçoGinasio
values ("a83719@alunos.uminho.pt", "Sala de Musculação");

--  AULA GRUPO -----------------------------------------------------------------------------------------
/*
-- Segunda 
insert into Aula_Grupo 
values (1, "08:00:00", "Segunda", "Cross Trainning", 0, 30, "1h:00m", "Moderado",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (2, "09:00:00", "Segunda", "Yoga", 0, 20, "1h:00m", "Não definido",
"mariCst@gmail.com", "Sala 2 de aulas de grupo"); 

insert into Aula_Grupo
values (3, "10:00:00", "Segunda", "Funcional", 0, 30, "0h:30m", "Moderado",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (4, "10:30:00", "Segunda", "Local", 0, 30, "0h:30m", "Fácil",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (5, "15:30:00", "Segunda", "Cycling", 0, 30, "1h:00m", "Difícil",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (6, "16:30:00", "Segunda", "Salsa", 0, 20, "0h:30m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (7, "17:00:00", "Segunda", "Local", 0, 30, "1h:00m", "Não definido",
"anaSILVa@hotmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (8, "18:00:00", "Segunda", "Pilates", 0, 20, "1h:00m", "Moderado",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (9, "18:30:00", "Segunda", "Jump", 0, 30, "0h:30m", "Fácil",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (10, "19:00:00", "Segunda", "Kickboxing", 0, 30, "1h:00m", "Moderado",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

-- Terça 
insert into Aula_Grupo
values (11, "07:30:00", "Terça", "Cycling", 0, 30, "1h:00m", "Difícil",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (12, "09:00:00", "Terça", "Pilates", 0, 30, "1h:00m", "Não definido",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (12, "10:00:00", "Terça", "TRX", 0, 30, "0h:30m", "Não definido",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (12, "11:30:00", "Terça", "Natação", 0, 20, "1h:00m", "Moderado",
"anaSILVa@hotmail.com", "Piscina");

insert into Aula_Grupo
values (13, "15:30:00", "Terça", "Yoga", 0, 20, "0h:30m", "Não definido",
"mariCst@gmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (14, "16:30:00", "Terça", "Cycling", 0, 30, "0h:30m", "Moderado",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (15, "17:00:00", "Terça", "G.A.P.", 0, 30, "0h:30m", "Não definido",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (16, "17:30:00", "Terça", "Dance Workout", 0, 20, "0h:30m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (17, "18:00:00", "Terça", "Pilates", 0, 30, "0h:30m", "Não definido",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (18, "18:30:00", "Terça", "Aerolocal", 0, 30, "1h:00m", "Não definido",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (19, "19:30:00", "Terça", "Cycling", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

-- Quarta
insert into Aula_Grupo
values (20, "08:00:00", "Quarta", "Local", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (21, "09:00:00", "Quarta", "Cycling", 0, 30, "1h:00m", "Fácil",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (22, "10:00:00", "Quarta", "G.A.P.", 0, 30, "1h:00m", "Não definido",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (23, "15:30:00", "Quarta", "Cross Training", 0, 30, "1h:00m", "Não definido",
"anaSILVa@hotmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (24, "16:30:00", "Quarta", "Jump", 0, 30, "0h:30m", "Não definido",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (25, "17:00:00", "Quarta", "Steel Tonic", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (26, "18:00:00", "Quarta", "Natação", 0, 20, "1h:00m", "Moderado",
"a85227@alunos.uminho.pt", "Piscina");

insert into Aula_Grupo
values (27, "19:30:00", "Quarta", "TRX", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

-- Quinta
insert into Aula_Grupo
values (28, "07:30:00", "Quinta", "Local", 0, 30, "1h:00m", "Fácil",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (29, "08:00:00", "Quinta", "Pilates", 0, 20, "1h:00m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (30, "09:00:00", "Quinta", "G.A.P.", 0, 30, "1h:00m", "Não definido",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (31, "10:00:00", "Quinta", "Pilates", 0, 20, "0h:30m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (32, "15:00:00", "Quinta", "Zumba", 0, 30, "1h:00m", "Fácil",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (33, "17:30:00", "Quinta", "TRX", 0, 30, "1h:00m", "Fácil",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (34, "17:30:00", "Quinta", "Cycling", 0, 30, "1h:00m", "Difícil",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (35, "18:30:00", "Quinta", "Aerolocal", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

-- Sexta
insert into Aula_Grupo
values (36, "07:30:00", "Sexta", "Local", 0, 30, "1h:00m", "Fácil",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (37, "08:00:00", "Sexta", "Pilates", 0, 20, "1h:00m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (38, "09:00:00", "Sexta", "Natação", 0, 20, "1h:00m", "Não definido",
"a89983@alunos.uminho.pt", "Piscina");

insert into Aula_Grupo
values (39, "10:00:00", "Sexta", "Pilates", 0, 20, "0h:30m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (40, "15:00:00", "Sexta", "Zumba", 0, 30, "1h:00m", "Fácil",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (41, "17:30:00", "Sexta", "TRX", 0, 30, "1h:00m", "Fácil",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (42, "17:30:00", "Sexta", "Cycling", 0, 30, "1h:00m", "Difícil",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (43, "18:30:00", "Sexta", "Aerolocal", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (44, "19:30:00", "Sexta", "Jump", 0, 30, "0h:30m", "Moderado",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (44, "20:00:00", "Sexta", "Yoga", 0, 20, "0h:30m", "Fácil",
"a89983@alunos.uminho.pt", "Sala 2 de aulas de grupo");

*/

--  AULA GRUPO -----------------------------------------------------------------------------------------

-- Segunda 
insert into Aula_Grupo 
values (1, "08:00:00", "Segunda", "Cross Training", 0, 30, "1h:00m", "Moderado",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (2, "09:00:00", "Segunda", "Yoga", 0, 20, "1h:00m", "Não definido",
"mariCst@gmail.com", "Sala 2 de aulas de grupo"); 

insert into Aula_Grupo
values (3, "10:00:00", "Segunda", "Funcional", 0, 30, "0h:30m", "Moderado",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (4, "10:30:00", "Segunda", "Local", 0, 30, "0h:30m", "Fácil",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (5, "15:30:00", "Segunda", "Cycling", 0, 30, "1h:00m", "Difícil",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (6, "16:30:00", "Segunda", "Salsa", 0, 20, "0h:30m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (7, "17:00:00", "Segunda", "Zumba", 0, 30, "1h:00m", "Não definido",
"anaSILVa@hotmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (8, "18:00:00", "Segunda", "Pilates", 0, 20, "1h:00m", "Moderado",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (9, "18:30:00", "Segunda", "Jump", 0, 30, "0h:30m", "Fácil",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (10, "19:00:00", "Segunda", "Kickboxing", 0, 30, "1h:00m", "Moderado",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

-- Terça 
insert into Aula_Grupo
values (11, "07:30:00", "Terça", "Cycling", 0, 30, "1h:00m", "Difícil",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (12, "09:00:00", "Terça", "Pilates", 0, 30, "1h:00m", "Não definido",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (12, "10:00:00", "Terça", "TRX", 0, 30, "0h:30m", "Não definido",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (12, "11:30:00", "Terça", "Natação", 0, 20, "1h:00m", "Moderado",
"anaSILVa@hotmail.com", "Piscina");

insert into Aula_Grupo
values (13, "15:30:00", "Terça", "Yoga", 0, 20, "0h:30m", "Não definido",
"mariCst@gmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (14, "16:30:00", "Terça", "Cycling", 0, 30, "0h:30m", "Moderado",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (15, "17:00:00", "Terça", "Cycling", 0, 30, "0h:30m", "Não definido",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (16, "17:30:00", "Terça", "Salsa", 0, 20, "0h:30m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (17, "18:00:00", "Terça", "Pilates", 0, 30, "0h:30m", "Não definido",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (18, "18:30:00", "Terça", "Local", 0, 30, "1h:00m", "Não definido",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (19, "19:30:00", "Terça", "Cycling", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

-- Quarta
insert into Aula_Grupo
values (20, "08:00:00", "Quarta", "Local", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (21, "09:00:00", "Quarta", "TRX", 0, 30, "1h:00m", "Fácil",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (22, "10:00:00", "Quarta", "Funcional", 0, 30, "1h:00m", "Não definido",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (23, "15:30:00", "Quarta", "Cross Training", 0, 30, "1h:00m", "Não definido",
"anaSILVa@hotmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (24, "16:30:00", "Quarta", "Jump", 0, 30, "0h:30m", "Não definido",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (25, "17:00:00", "Quarta", "TRX", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (26, "18:00:00", "Quarta", "Natação", 0, 20, "1h:00m", "Moderado",
"a85227@alunos.uminho.pt", "Piscina");

insert into Aula_Grupo
values (27, "19:30:00", "Quarta", "Zumba", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

-- Quinta
insert into Aula_Grupo
values (28, "07:30:00", "Quinta", "Local", 0, 30, "1h:00m", "Fácil",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (29, "08:00:00", "Quinta", "Pilates", 0, 20, "1h:00m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (30, "09:00:00", "Quinta", "Funcional", 0, 30, "1h:00m", "Não definido",
"a89983@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (31, "10:00:00", "Quinta", "Salsa", 0, 20, "0h:30m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (32, "15:00:00", "Quinta", "Zumba", 0, 30, "1h:00m", "Fácil",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (33, "17:30:00", "Quinta", "TRX", 0, 30, "1h:00m", "Fácil",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (34, "17:30:00", "Quinta", "Cycling", 0, 30, "1h:00m", "Difícil",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (35, "18:30:00", "Quinta", "Local", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

-- Sexta
insert into Aula_Grupo
values (36, "07:30:00", "Sexta", "Local", 0, 30, "1h:00m", "Fácil",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (37, "08:00:00", "Sexta", "Pilates", 0, 20, "1h:00m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (38, "09:00:00", "Sexta", "Natação", 0, 20, "1h:00m", "Não definido",
"a89983@alunos.uminho.pt", "Piscina");

insert into Aula_Grupo
values (39, "10:00:00", "Sexta", "Pilates", 0, 20, "0h:30m", "Não definido",
"anaSILVa@hotmail.com", "Sala 2 de aulas de grupo");

insert into Aula_Grupo
values (40, "15:00:00", "Sexta", "Salsa", 0, 30, "1h:00m", "Fácil",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (41, "17:30:00", "Sexta", "TRX", 0, 30, "1h:00m", "Fácil",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (42, "17:30:00", "Sexta", "Cycling", 0, 30, "1h:00m", "Difícil",
"a85227@alunos.uminho.pt", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (43, "18:30:00", "Sexta", "Funcional", 0, 30, "1h:00m", "Moderado",
"mariCst@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (44, "19:30:00", "Sexta", "Jump", 0, 30, "0h:30m", "Moderado",
"joseCarv@gmail.com", "Sala 1 de aulas de grupo");

insert into Aula_Grupo
values (44, "20:00:00", "Sexta", "Yoga", 0, 20, "0h:30m", "Fácil",
"a89983@alunos.uminho.pt", "Sala 2 de aulas de grupo");

-- CLIENTES NA AULA GRUPO -----------------------------------------------------------------------------------------
-- insert into Clientes_na_AulaGrupo 
-- values ("a85729@alunos.uminho.pt", 1, "2020-03-18", "a85227@alunos.uminho.pt");

select * from Avaliaçao_Realizada ar, Avaliaçao_Agendada aa
                    where ar.idAvaliaçao = aa.idAvaliaçao;


-- AVALIAÇAO REALIZADA -----------------------------------------------------------------------------------------
insert into Avaliaçao_Realizada 
values (1, 179, 83.0, 10.1, 70.2, 25.9, 12, 82.5, 84, 118.5, 93, 35, 34, 60.5, 60, 41, 40, 29, 28);	

insert into Avaliaçao_Realizada 
values (2, 180, 79.0, 8.50, 67.8, 24.4, 12, 81.5, 82.3, 117.5, 92.3, 35, 35, 60.8, 61, 41.5, 40.5, 29, 29);

insert into Avaliaçao_Realizada 
values (3, 180, 80.1, 7.87, 70.6, 24.7, 12, 81.4, 83.2, 118, 92.4, 35.7, 35.6, 61.5, 61.5, 42, 42, 30, 30.1);

insert into Avaliaçao_Realizada 
values (4, 181, 80.3, 7.00, 70.3, 24.72, 13, 81.6, 83.8, 118.5, 92.8, 35.9, 35.9, 61.7, 61.7, 42.4, 42.3, 30.6, 30.7);

insert into Avaliaçao_Realizada 
values (5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

select * from Avaliaçao_Realizada;
delete from Avaliaçao_Agendada where idAvaliaçao = 1010101010;
delete from Avaliaçao_Realizada where idAvaliaçao = 1010101010;

-- AVALIAÇAO AGENDADA -----------------------------------------------------------------------------------------
insert into Avaliaçao_Agendada
values ("2020-02-04 15:30:00", "a85227@alunos.uminho.pt", "a83719@alunos.uminho.pt", 1);

insert into Avaliaçao_Agendada
values ("2020-02-28 14:30:00", "a85227@alunos.uminho.pt", "a83719@alunos.uminho.pt", 2);

insert into Avaliaçao_Agendada
values ("2020-03-20 14:00:00", "a89983@alunos.uminho.pt", "a83719@alunos.uminho.pt", 3);

insert into Avaliaçao_Agendada
values ("2020-04-08 10:00:00", "anaSILVa@hotmail.com", "a83719@alunos.uminho.pt", 4);

insert into Avaliaçao_Agendada
values ("2020-04-30 18:00:00", "a85227@alunos.uminho.pt", "a83719@alunos.uminho.pt", 5);

select * from Aula_Grupo;

-- EXERCICIO -----------------------------------------------------------------------------------------
insert into Exercicio 
values (1, "Elevações na Barra", 3, 3);

insert into Exercicio 
values (2, "Pushada", 12, 3);

insert into Exercicio 
values (3, "Serrote", 12, 3);

insert into Exercicio 
values (4, "Máquina de Costas", 12, 3);

insert into Exercicio 
values (5, "Cadeira Adutora", 12, 3);

insert into Exercicio 
values (6, "Agachamento c/ Halter", 12, 3);

insert into Exercicio 
values (7, "Agachamento Frontal", 12 ,3);

-- PLANO TREINO -----------------------------------------------------------------------------------------
insert into Plano_Treino 
values (1, "Treino A - Trícept e Costas", "2020-08-01", "Trícept e Costas", "1 vez por semana");


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

-- REFEIÇAO -----------------------------------------------------------------------------------------
insert into Refeiçao
values (1, "Pequeno Almoço", "1 x Pão com fiambre ou queijo; 1 x Café; 1 x Copo de leite; ...");


-- PLANO ALIMENTAR -----------------------------------------------------------------------------------------
insert into Plano_Alimentar 
values (1, "Plano alimentar para ganhar peso", "6 vezes por semana", 3, "2020-09-01");


-- PLANO ALIMENTAR REFEIÇOES -----------------------------------------------------------------------------------------
insert into Plano_Alimentar_Refeiçoes
values (1, 1);


-- PLANO ALIMENTAR DO CLIENTE -----------------------------------------------------------------------------------------
insert into PlanoAlimentar_do_Cliente 
values (1, "a85729@alunos.uminho.pt");