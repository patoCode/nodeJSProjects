-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 29, 2019 at 03:44 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comunidad`
--

-- --------------------------------------------------------

--
-- Table structure for table `ANUNCIO`
--

CREATE TABLE `ANUNCIO` (
  `ID_TABLON` int(11) NOT NULL,
  `ID_ANUNCIO` int(11) NOT NULL,
  `ID_CARGO` int(11) NOT NULL,
  `ID` int(11) NOT NULL,
  `TITULO` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `DETALLE` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ESTADO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CARGO`
--

CREATE TABLE `CARGO` (
  `ID_CARGO` int(11) NOT NULL,
  `NOMBRE_UNIDAD` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ESTADO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `COMUNIDAD`
--

CREATE TABLE `COMUNIDAD` (
  `ID_COMUNIDAD` int(11) NOT NULL,
  `NOMBRE_SITIO` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `LOGO` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  `SIGLA` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `COPYRIGHT` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DOCUMENTO`
--

CREATE TABLE `DOCUMENTO` (
  `ID_DOCUMENTO` int(11) NOT NULL,
  `ID_PUBLICACION` int(11) DEFAULT NULL,
  `TITULO` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `DESCRIPCION` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ESTADO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `PATH` char(10) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `EXTENSION` char(10) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `FRASES_DEL_DIA`
--

CREATE TABLE `FRASES_DEL_DIA` (
  `ID_FRASE` int(11) NOT NULL,
  `ID_COMUNIDAD` int(11) NOT NULL,
  `CUERPO` char(10) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_PUBLICACION` date DEFAULT NULL,
  `AUTOR` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PUBLICACION`
--

CREATE TABLE `PUBLICACION` (
  `ID_PUBLICACION` int(11) NOT NULL,
  `ID_SECCION` int(11) DEFAULT NULL,
  `TITULO` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `DETALLE` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ESTADO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ROL`
--

CREATE TABLE `ROL` (
  `ID_ROL` int(11) NOT NULL,
  `NOMBRE` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `DESCRIPCION` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ESTADO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SECCION`
--

CREATE TABLE `SECCION` (
  `ID_SECCION` int(11) NOT NULL,
  `ID_COMUNIDAD` int(11) DEFAULT NULL,
  `CODIGO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TABLON_ANUNCIOS`
--

CREATE TABLE `TABLON_ANUNCIOS` (
  `ID_TABLON` int(11) NOT NULL,
  `MES` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `TITULO` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ESTADO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UNIDAD`
--

CREATE TABLE `UNIDAD` (
  `ID_UNIDAD` int(11) NOT NULL,
  `UNI_ID_UNIDAD` int(11) DEFAULT NULL,
  `NOMBRE_UNIDAD` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `UNIDAD_PADRE` int(11) DEFAULT NULL,
  `ESTADO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `USUARIO`
--

CREATE TABLE `USUARIO` (
  `ID_CARGO` int(11) NOT NULL,
  `ID` int(11) NOT NULL,
  `ID_UNIDAD` int(11) NOT NULL,
  `ID_COMUNIDAD` int(11) NOT NULL,
  `USERNAME` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `PASSWORD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `NOMBRES` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `APELLIDO_PAT` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `APELLIDO_MAT` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `CELULAR_CORP` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `INTERNO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `CELULAR_PERSONAL` varchar(25) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `TELEFONO_FIJO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `CORREO_EMPRESA` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `CORREO_PERSONAL` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `DOMICILIO` varchar(400) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `TIPO_SANGRE` varchar(10) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `CUMPLEANO` date DEFAULT NULL,
  `FOTOGRAFIA` text COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ESTADO` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `LDAP` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `USUARIO_REG` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_REG` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USUARIO_MOD` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `FECHA_MOD` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ESTADO_REG` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `USUARIO_ROL`
--

CREATE TABLE `USUARIO_ROL` (
  `ID_CARGO` int(11) NOT NULL,
  `ID` int(11) NOT NULL,
  `ID_ROL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ANUNCIO`
--
ALTER TABLE `ANUNCIO`
  ADD PRIMARY KEY (`ID_TABLON`,`ID_ANUNCIO`),
  ADD KEY `AK_KID_ANUNCIO` (`ID_ANUNCIO`),
  ADD KEY `FK_RELATIONSHIP_5` (`ID_CARGO`,`ID`);

--
-- Indexes for table `CARGO`
--
ALTER TABLE `CARGO`
  ADD PRIMARY KEY (`ID_CARGO`);

--
-- Indexes for table `COMUNIDAD`
--
ALTER TABLE `COMUNIDAD`
  ADD PRIMARY KEY (`ID_COMUNIDAD`);

--
-- Indexes for table `DOCUMENTO`
--
ALTER TABLE `DOCUMENTO`
  ADD PRIMARY KEY (`ID_DOCUMENTO`),
  ADD KEY `FK_RELATIONSHIP_4` (`ID_PUBLICACION`);

--
-- Indexes for table `FRASES_DEL_DIA`
--
ALTER TABLE `FRASES_DEL_DIA`
  ADD PRIMARY KEY (`ID_FRASE`),
  ADD KEY `FK_RELATIONSHIP_8` (`ID_COMUNIDAD`);

--
-- Indexes for table `PUBLICACION`
--
ALTER TABLE `PUBLICACION`
  ADD PRIMARY KEY (`ID_PUBLICACION`),
  ADD KEY `FK_RELATIONSHIP_3` (`ID_SECCION`);

--
-- Indexes for table `ROL`
--
ALTER TABLE `ROL`
  ADD PRIMARY KEY (`ID_ROL`);

--
-- Indexes for table `SECCION`
--
ALTER TABLE `SECCION`
  ADD PRIMARY KEY (`ID_SECCION`),
  ADD KEY `FK_RELATIONSHIP_2` (`ID_COMUNIDAD`);

--
-- Indexes for table `TABLON_ANUNCIOS`
--
ALTER TABLE `TABLON_ANUNCIOS`
  ADD PRIMARY KEY (`ID_TABLON`);

--
-- Indexes for table `UNIDAD`
--
ALTER TABLE `UNIDAD`
  ADD PRIMARY KEY (`ID_UNIDAD`),
  ADD KEY `FK_RELATIONSHIP_11` (`UNI_ID_UNIDAD`);

--
-- Indexes for table `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`ID_CARGO`,`ID`),
  ADD KEY `AK_KID` (`ID`),
  ADD KEY `FK_RELATIONSHIP_1` (`ID_COMUNIDAD`),
  ADD KEY `FK_RELATIONSHIP_9` (`ID_UNIDAD`);

--
-- Indexes for table `USUARIO_ROL`
--
ALTER TABLE `USUARIO_ROL`
  ADD KEY `FK_RELATIONSHIP_6` (`ID_CARGO`,`ID`),
  ADD KEY `FK_RELATIONSHIP_7` (`ID_ROL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ANUNCIO`
--
ALTER TABLE `ANUNCIO`
  MODIFY `ID_ANUNCIO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CARGO`
--
ALTER TABLE `CARGO`
  MODIFY `ID_CARGO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `COMUNIDAD`
--
ALTER TABLE `COMUNIDAD`
  MODIFY `ID_COMUNIDAD` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DOCUMENTO`
--
ALTER TABLE `DOCUMENTO`
  MODIFY `ID_DOCUMENTO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `FRASES_DEL_DIA`
--
ALTER TABLE `FRASES_DEL_DIA`
  MODIFY `ID_FRASE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PUBLICACION`
--
ALTER TABLE `PUBLICACION`
  MODIFY `ID_PUBLICACION` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ROL`
--
ALTER TABLE `ROL`
  MODIFY `ID_ROL` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `SECCION`
--
ALTER TABLE `SECCION`
  MODIFY `ID_SECCION` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TABLON_ANUNCIOS`
--
ALTER TABLE `TABLON_ANUNCIOS`
  MODIFY `ID_TABLON` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `UNIDAD`
--
ALTER TABLE `UNIDAD`
  MODIFY `ID_UNIDAD` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USUARIO`
--
ALTER TABLE `USUARIO`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ANUNCIO`
--
ALTER TABLE `ANUNCIO`
  ADD CONSTRAINT `FK_RELATIONSHIP_12` FOREIGN KEY (`ID_TABLON`) REFERENCES `TABLON_ANUNCIOS` (`ID_TABLON`),
  ADD CONSTRAINT `FK_RELATIONSHIP_5` FOREIGN KEY (`ID_CARGO`,`ID`) REFERENCES `USUARIO` (`ID_CARGO`, `ID`);

--
-- Constraints for table `DOCUMENTO`
--
ALTER TABLE `DOCUMENTO`
  ADD CONSTRAINT `FK_RELATIONSHIP_4` FOREIGN KEY (`ID_PUBLICACION`) REFERENCES `PUBLICACION` (`ID_PUBLICACION`);

--
-- Constraints for table `FRASES_DEL_DIA`
--
ALTER TABLE `FRASES_DEL_DIA`
  ADD CONSTRAINT `FK_RELATIONSHIP_8` FOREIGN KEY (`ID_COMUNIDAD`) REFERENCES `COMUNIDAD` (`ID_COMUNIDAD`);

--
-- Constraints for table `PUBLICACION`
--
ALTER TABLE `PUBLICACION`
  ADD CONSTRAINT `FK_RELATIONSHIP_3` FOREIGN KEY (`ID_SECCION`) REFERENCES `SECCION` (`ID_SECCION`);

--
-- Constraints for table `SECCION`
--
ALTER TABLE `SECCION`
  ADD CONSTRAINT `FK_RELATIONSHIP_2` FOREIGN KEY (`ID_COMUNIDAD`) REFERENCES `COMUNIDAD` (`ID_COMUNIDAD`);

--
-- Constraints for table `UNIDAD`
--
ALTER TABLE `UNIDAD`
  ADD CONSTRAINT `FK_RELATIONSHIP_11` FOREIGN KEY (`UNI_ID_UNIDAD`) REFERENCES `UNIDAD` (`ID_UNIDAD`);

--
-- Constraints for table `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD CONSTRAINT `FK_RELATIONSHIP_1` FOREIGN KEY (`ID_COMUNIDAD`) REFERENCES `COMUNIDAD` (`ID_COMUNIDAD`),
  ADD CONSTRAINT `FK_RELATIONSHIP_10` FOREIGN KEY (`ID_CARGO`) REFERENCES `CARGO` (`ID_CARGO`),
  ADD CONSTRAINT `FK_RELATIONSHIP_9` FOREIGN KEY (`ID_UNIDAD`) REFERENCES `UNIDAD` (`ID_UNIDAD`);

--
-- Constraints for table `USUARIO_ROL`
--
ALTER TABLE `USUARIO_ROL`
  ADD CONSTRAINT `FK_RELATIONSHIP_6` FOREIGN KEY (`ID_CARGO`,`ID`) REFERENCES `USUARIO` (`ID_CARGO`, `ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_7` FOREIGN KEY (`ID_ROL`) REFERENCES `ROL` (`ID_ROL`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
