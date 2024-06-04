
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dataNascimento` date NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);


CREATE TABLE `limite_mes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valor` double(8,2) NOT NULL,
  `mes` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `despesa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarioId` int NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `valor` double(8,2) NOT NULL,
  `limite_mes_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  KEY `limite_mes_id` (`limite_mes_id`),
  CONSTRAINT `despesa_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`),
  CONSTRAINT `despesa_ibfk_2` FOREIGN KEY (`limite_mes_id`) REFERENCES `limite_mes` (`id`)
);

