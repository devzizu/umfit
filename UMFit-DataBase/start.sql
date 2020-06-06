-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema UMFit_DB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema UMFit_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `UMFit_DB` DEFAULT CHARACTER SET utf8 ;
USE `UMFit_DB` ;

-- -----------------------------------------------------
-- Table `UMFit_DB`.`Codigo_Postal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Codigo_Postal` (
  `localidade` VARCHAR(80) NOT NULL,
  `codigo_postal` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`localidade`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Instrutor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Instrutor` (
  `email` VARCHAR(100) NOT NULL,
  `nif` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `hashPass` VARCHAR(65) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `genero` INT NOT NULL,
  `localidade` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`email`),
  INDEX `fk_Instrutor_Codigo_Postal1_idx` (`localidade` ASC),
  UNIQUE INDEX `nif_UNIQUE` (`nif` ASC),
  CONSTRAINT `fk_Instrutor_Codigo_Postal1`
    FOREIGN KEY (`localidade`)
    REFERENCES `UMFit_DB`.`Codigo_Postal` (`localidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Espaço_Ginasio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Espaço_Ginasio` (
  `nome` VARCHAR(45) NOT NULL,
  `lotacao_atual` INT NOT NULL,
  PRIMARY KEY (`nome`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Aula_Grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Aula_Grupo` (
  `idAula_Grupo` INT NOT NULL AUTO_INCREMENT,
  `hora` TIME NOT NULL,
  `dia` VARCHAR(10) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `lotaçao_Atual` INT NOT NULL,
  `lotaçao_Max` INT NOT NULL,
  `duraçao` VARCHAR(45) NOT NULL,
  `dificuldade` VARCHAR(45) NOT NULL,
  `Instrutor_email` VARCHAR(100) NOT NULL,
  `Espaço_Ginasio` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAula_Grupo`, `hora`, `dia`, `Instrutor_email`, `Espaço_Ginasio`),
  INDEX `fk_Aula_Grupo_Instrutor1_idx` (`Instrutor_email` ASC),
  INDEX `fk_Aula_Grupo_Espaço_Ginasio1_idx` (`Espaço_Ginasio` ASC),
  CONSTRAINT `fk_Aula_Grupo_Instrutor1`
    FOREIGN KEY (`Instrutor_email`)
    REFERENCES `UMFit_DB`.`Instrutor` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Aula_Grupo_Espaço_Ginasio1`
    FOREIGN KEY (`Espaço_Ginasio`)
    REFERENCES `UMFit_DB`.`Espaço_Ginasio` (`nome`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Avaliaçao_Realizada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Avaliaçao_Realizada` (
  `idAvaliaçao` INT NOT NULL AUTO_INCREMENT,
  `altura` INT NULL,
  `peso` DECIMAL(5,2) NULL,
  `massa_Gorda` DECIMAL(5,2) NULL,
  `massa_Magra` DECIMAL(5,2) NULL,
  `imc` DECIMAL(5,2) NULL,
  `idade_Metabolica` INT NULL,
  `cintura` DECIMAL(5,2) NULL,
  `abdomen` DECIMAL(5,2) NULL,
  `ombro` DECIMAL(5,2) NULL,
  `torax` DECIMAL(5,2) NULL,
  `braço_direito` DECIMAL(5,2) NULL,
  `braço_esquerdo` DECIMAL(5,2) NULL,
  `coxa_direita` DECIMAL(5,2) NULL,
  `coxa_esquerda` DECIMAL(5,2) NULL,
  `gemeo_direito` DECIMAL(5,2) NULL,
  `gemeo_esquerdo` DECIMAL(5,2) NULL,
  `antebraço_direito` DECIMAL(5,2) NULL,
  `antebraço_esquerdo` DECIMAL(5,2) NULL,
  PRIMARY KEY (`idAvaliaçao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Cliente` (
  `email` VARCHAR(100) NOT NULL,
  `nif` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `hashPass` VARCHAR(65) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `genero` INT NOT NULL,
  `categoria` VARCHAR(25) NOT NULL,
  `localidade` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`email`),
  INDEX `fk_Cliente_Codigo_Postal1_idx` (`localidade` ASC),
  UNIQUE INDEX `nif_UNIQUE` (`nif` ASC),
  CONSTRAINT `fk_Cliente_Codigo_Postal1`
    FOREIGN KEY (`localidade`)
    REFERENCES `UMFit_DB`.`Codigo_Postal` (`localidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Rececionista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Rececionista` (
  `email` VARCHAR(100) NOT NULL,
  `nif` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `hashPass` VARCHAR(65) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `genero` INT NOT NULL,
  `localidade` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`email`),
  INDEX `fk_Rececionista_Codigo_Postal1_idx` (`localidade` ASC),
  UNIQUE INDEX `nif_UNIQUE` (`nif` ASC),
  CONSTRAINT `fk_Rececionista_Codigo_Postal1`
    FOREIGN KEY (`localidade`)
    REFERENCES `UMFit_DB`.`Codigo_Postal` (`localidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Exercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Exercicio` (
  `idExercicio` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(65) NOT NULL,
  `repetiçoes` INT NOT NULL,
  `series` INT NOT NULL,
  PRIMARY KEY (`idExercicio`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Plano_Treino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Plano_Treino` (
  `idPlano_Treino` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `data_Fim` DATE NOT NULL,
  `grupo_muscular` VARCHAR(100) NOT NULL,
  `frequencia` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idPlano_Treino`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Exercicio_do_Plano_Treino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Exercicio_do_Plano_Treino` (
  `idExercicio` INT NOT NULL,
  `idPlano_Treino` INT NOT NULL,
  PRIMARY KEY (`idExercicio`, `idPlano_Treino`),
  INDEX `fk_Exercicio_has_Plano_Treino_Plano_Treino1_idx` (`idPlano_Treino` ASC),
  INDEX `fk_Exercicio_has_Plano_Treino_Exercicio1_idx` (`idExercicio` ASC),
  CONSTRAINT `fk_Exercicio_has_Plano_Treino_Exercicio1`
    FOREIGN KEY (`idExercicio`)
    REFERENCES `UMFit_DB`.`Exercicio` (`idExercicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Exercicio_has_Plano_Treino_Plano_Treino1`
    FOREIGN KEY (`idPlano_Treino`)
    REFERENCES `UMFit_DB`.`Plano_Treino` (`idPlano_Treino`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Refeiçao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Refeiçao` (
  `idRefeiçao` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(70) NOT NULL,
  `descriçao` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`idRefeiçao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Plano_Alimentar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Plano_Alimentar` (
  `idPlano_Alimentar` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `frequencia` VARCHAR(45) NOT NULL,
  `refeiçoes_livres` INT NOT NULL,
  `data_Fim` DATE NOT NULL,
  PRIMARY KEY (`idPlano_Alimentar`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Plano_Alimentar_Refeiçoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Plano_Alimentar_Refeiçoes` (
  `idPlano_Alimentar` INT NOT NULL,
  `idRefeiçao` INT NOT NULL,
  PRIMARY KEY (`idPlano_Alimentar`, `idRefeiçao`),
  INDEX `fk_Plano_Alimentar_has_Refeicao_Plano_Alimentar1_idx` (`idPlano_Alimentar` ASC),
  INDEX `fk_Plano_Alimentar_Refeicoes_Refeiçao1_idx` (`idRefeiçao` ASC),
  CONSTRAINT `fk_Plano_Alimentar_has_Refeicao_Plano_Alimentar1`
    FOREIGN KEY (`idPlano_Alimentar`)
    REFERENCES `UMFit_DB`.`Plano_Alimentar` (`idPlano_Alimentar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plano_Alimentar_Refeicoes_Refeiçao1`
    FOREIGN KEY (`idRefeiçao`)
    REFERENCES `UMFit_DB`.`Refeiçao` (`idRefeiçao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Avaliaçao_Agendada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Avaliaçao_Agendada` (
  `data` DATETIME NOT NULL,
  `Instrutor_email` VARCHAR(100) NOT NULL,
  `Cliente_email` VARCHAR(100) NOT NULL,
  `idAvaliaçao` INT NOT NULL,
  PRIMARY KEY (`data`, `Instrutor_email`, `Cliente_email`),
  INDEX `fk_Avaliaçao_Agendada_Instrutor1_idx` (`Instrutor_email` ASC),
  INDEX `fk_Avaliaçao_Agendada_Cliente1_idx` (`Cliente_email` ASC),
  INDEX `fk_Avaliaçao_Agendada_Avaliaçao_Realizada1_idx` (`idAvaliaçao` ASC),
  CONSTRAINT `fk_Avaliaçao_Agendada_Instrutor1`
    FOREIGN KEY (`Instrutor_email`)
    REFERENCES `UMFit_DB`.`Instrutor` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Avaliaçao_Agendada_Cliente1`
    FOREIGN KEY (`Cliente_email`)
    REFERENCES `UMFit_DB`.`Cliente` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Avaliaçao_Agendada_Avaliaçao_Realizada1`
    FOREIGN KEY (`idAvaliaçao`)
    REFERENCES `UMFit_DB`.`Avaliaçao_Realizada` (`idAvaliaçao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Cliente_no_EspaçoGinasio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Cliente_no_EspaçoGinasio` (
  `Cliente_email` VARCHAR(100) NOT NULL,
  `Espaço_Ginasio_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Cliente_email`, `Espaço_Ginasio_nome`),
  INDEX `fk_Cliente_has_Espaco_Ginasio_Espaco_Ginasio1_idx` (`Espaço_Ginasio_nome` ASC),
  INDEX `fk_Cliente_has_Espaco_Ginasio_Cliente1_idx` (`Cliente_email` ASC),
  CONSTRAINT `fk_Cliente_has_Espaco_Ginasio_Cliente1`
    FOREIGN KEY (`Cliente_email`)
    REFERENCES `UMFit_DB`.`Cliente` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cliente_has_Espaco_Ginasio_Espaco_Ginasio1`
    FOREIGN KEY (`Espaço_Ginasio_nome`)
    REFERENCES `UMFit_DB`.`Espaço_Ginasio` (`nome`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`PlanoTreino_do_Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`PlanoTreino_do_Cliente` (
  `idPlano_Treino` INT NOT NULL,
  `Cliente_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idPlano_Treino`, `Cliente_email`),
  INDEX `fk_Plano_Treino_has_Cliente_Cliente1_idx` (`Cliente_email` ASC),
  INDEX `fk_Plano_Treino_has_Cliente_Plano_Treino1_idx` (`idPlano_Treino` ASC),
  CONSTRAINT `fk_Plano_Treino_has_Cliente_Plano_Treino1`
    FOREIGN KEY (`idPlano_Treino`)
    REFERENCES `UMFit_DB`.`Plano_Treino` (`idPlano_Treino`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plano_Treino_has_Cliente_Cliente1`
    FOREIGN KEY (`Cliente_email`)
    REFERENCES `UMFit_DB`.`Cliente` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`PlanoAlimentar_do_Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`PlanoAlimentar_do_Cliente` (
  `idPlano_Alimentar` INT NOT NULL,
  `Cliente_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idPlano_Alimentar`, `Cliente_email`),
  INDEX `fk_Plano_Alimentar_has_Cliente_Cliente1_idx` (`Cliente_email` ASC),
  INDEX `fk_Plano_Alimentar_has_Cliente_Plano_Alimentar1_idx` (`idPlano_Alimentar` ASC),
  CONSTRAINT `fk_Plano_Alimentar_has_Cliente_Plano_Alimentar1`
    FOREIGN KEY (`idPlano_Alimentar`)
    REFERENCES `UMFit_DB`.`Plano_Alimentar` (`idPlano_Alimentar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plano_Alimentar_has_Cliente_Cliente1`
    FOREIGN KEY (`Cliente_email`)
    REFERENCES `UMFit_DB`.`Cliente` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`UtilizadoresOnline`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`UtilizadoresOnline` (
  `email` VARCHAR(100) NOT NULL,
  `data_expirar` DATETIME NOT NULL,
  `token` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`email`, `token`, `data_expirar`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UMFit_DB`.`Clientes_na_AulaGrupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UMFit_DB`.`Clientes_na_AulaGrupo` (
  `idAula_Grupo` INT NOT NULL,
  `hora` TIME NOT NULL,
  `dia` VARCHAR(45) NOT NULL,
  `Instrutor_email` VARCHAR(100) NOT NULL,
  `Cliente_email` VARCHAR(100) NOT NULL,
  `Espaço_Ginasio` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAula_Grupo`, `hora`, `dia`, `Instrutor_email`, `Cliente_email`, `Espaço_Ginasio`),
  INDEX `fk_Aula_Grupo_has_Cliente_Cliente1_idx` (`Cliente_email` ASC),
  INDEX `fk_Aula_Grupo_has_Cliente_Aula_Grupo1_idx` (`idAula_Grupo` ASC, `hora` ASC, `dia` ASC, `Instrutor_email` ASC, `Espaço_Ginasio` ASC),
  CONSTRAINT `fk_Aula_Grupo_has_Cliente_Aula_Grupo1`
    FOREIGN KEY (`idAula_Grupo` , `hora` , `dia` , `Instrutor_email` , `Espaço_Ginasio`)
    REFERENCES `UMFit_DB`.`Aula_Grupo` (`idAula_Grupo` , `hora` , `dia` , `Instrutor_email` , `Espaço_Ginasio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Aula_Grupo_has_Cliente_Cliente1`
    FOREIGN KEY (`Cliente_email`)
    REFERENCES `UMFit_DB`.`Cliente` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
