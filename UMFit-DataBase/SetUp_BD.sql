CREATE USER 'UMFit'@'localhost' IDENTIFIED BY 'umfitli4';
GRANT ALL PRIVILEGES ON * . * TO 'UMFit'@'localhost';
FLUSH PRIVILEGES;
select * from Cliente;
select * from Rececionista;
select * from Instrutor;