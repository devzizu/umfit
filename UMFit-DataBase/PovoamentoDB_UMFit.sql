use UMFit_DB;

-- NOTAS
-- Género é definido por um inteiro. 0 no caso de ser feminino e 1 caso seja masculino;


-- CODIGO_POSTAL
insert into Codigo_Postal values ("4760-400", "Rua das Pombas");
insert into Codigo_Postal values ("4765-120", "Rua St. António");


-- RECECIONISTAS

-- Pass sem estar encriptada: helloSus
insert into Rececionista (nome, data_nascimento, genero, hashPass, email, codigo_Postal) 
values ("Susana Magalhães", "1990-04-23", 0, 
		"96220D456C93E47A7C70C217DF5ED577CA91E2B03DF758A1422FA6CE1585A5BF", "susanaMag@gmail.com", "4760-400");
-- Pass : helloAnto 
insert into Rececionista (nome, data_nascimento, genero, hashPass, email, codigo_Postal) 
values ("António Pinheiro", "1983-06-01", 1, 
		"E727B8094CF763E259F3C1F0DA8B3AAFFC5371A3B1F655546AD5D0C67784EE15", "antoPi@hotmail.com", "4765-120");

-- CLIENTES

select * from Rececionista;