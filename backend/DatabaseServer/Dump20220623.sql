-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: geidea_database
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `cityID` int NOT NULL,
  `cityName` varchar(45) DEFAULT NULL,
  `regionID` int DEFAULT NULL,
  PRIMARY KEY (`cityID`),
  KEY `regionID_idx` (`regionID`),
  CONSTRAINT `regionID` FOREIGN KEY (`regionID`) REFERENCES `regions` (`regionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'riyad city',1),(2,'makkah',1);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operationalmanager`
--

DROP TABLE IF EXISTS `operationalmanager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operationalmanager` (
  `opManagerID` int NOT NULL,
  `opManagerName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`opManagerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operationalmanager`
--

LOCK TABLES `operationalmanager` WRITE;
/*!40000 ALTER TABLE `operationalmanager` DISABLE KEYS */;
/*!40000 ALTER TABLE `operationalmanager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regionalmanager`
--

DROP TABLE IF EXISTS `regionalmanager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regionalmanager` (
  `regManagerID` int NOT NULL,
  `regManagerName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`regManagerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regionalmanager`
--

LOCK TABLES `regionalmanager` WRITE;
/*!40000 ALTER TABLE `regionalmanager` DISABLE KEYS */;
INSERT INTO `regionalmanager` VALUES (1,'sheikh'),(2,'al beeruni');
/*!40000 ALTER TABLE `regionalmanager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `regionID` int NOT NULL,
  `regionName` varchar(45) DEFAULT NULL,
  `regManagerID` int NOT NULL,
  PRIMARY KEY (`regionID`),
  KEY `regManagerID_idx` (`regManagerID`),
  CONSTRAINT `regManagerID` FOREIGN KEY (`regManagerID`) REFERENCES `regionalmanager` (`regManagerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'North',1),(2,'west',2);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subzones`
--

DROP TABLE IF EXISTS `subzones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subzones` (
  `subZoneID` int NOT NULL,
  `zoneID` int DEFAULT NULL,
  `coordinates` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`subZoneID`),
  KEY `zoneID_idx` (`zoneID`),
  CONSTRAINT `zoneID` FOREIGN KEY (`zoneID`) REFERENCES `zones` (`zoneID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subzones`
--

LOCK TABLES `subzones` WRITE;
/*!40000 ALTER TABLE `subzones` DISABLE KEYS */;
/*!40000 ALTER TABLE `subzones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teamleaders`
--

DROP TABLE IF EXISTS `teamleaders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teamleaders` (
  `teamLeaderID` int NOT NULL,
  `teamLeaderName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`teamLeaderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamleaders`
--

LOCK TABLES `teamleaders` WRITE;
/*!40000 ALTER TABLE `teamleaders` DISABLE KEYS */;
INSERT INTO `teamleaders` VALUES (1,'Umer TL'),(2,'Akram TL');
/*!40000 ALTER TABLE `teamleaders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technicianlocations`
--

DROP TABLE IF EXISTS `technicianlocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technicianlocations` (
  `technicianID` int NOT NULL,
  `coordinates` varchar(100) DEFAULT NULL,
  KEY `technicianID_idx` (`technicianID`),
  CONSTRAINT `technicianID` FOREIGN KEY (`technicianID`) REFERENCES `technicians` (`technicianID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technicianlocations`
--

LOCK TABLES `technicianlocations` WRITE;
/*!40000 ALTER TABLE `technicianlocations` DISABLE KEYS */;
/*!40000 ALTER TABLE `technicianlocations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technicians`
--

DROP TABLE IF EXISTS `technicians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technicians` (
  `technicianID` int NOT NULL,
  `technicianName` varchar(45) DEFAULT NULL,
  `teamLeaderID` int DEFAULT NULL,
  PRIMARY KEY (`technicianID`),
  KEY `teamLeaderID_idx` (`teamLeaderID`),
  CONSTRAINT `teamLeaderID` FOREIGN KEY (`teamLeaderID`) REFERENCES `teamleaders` (`teamLeaderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technicians`
--

LOCK TABLES `technicians` WRITE;
/*!40000 ALTER TABLE `technicians` DISABLE KEYS */;
/*!40000 ALTER TABLE `technicians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zones`
--

DROP TABLE IF EXISTS `zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zones` (
  `zoneID` int NOT NULL,
  `cityID` int DEFAULT NULL,
  `coordinates` varchar(100) DEFAULT NULL,
  `zoneName` varchar(45) DEFAULT NULL,
  `teamLeaderID` int DEFAULT NULL,
  PRIMARY KEY (`zoneID`),
  KEY `cityID_idx` (`cityID`),
  CONSTRAINT `cityID` FOREIGN KEY (`cityID`) REFERENCES `cities` (`cityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones`
--

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;
INSERT INTO `zones` VALUES (1,1,'10212,30033','somalian Zone',1),(2,1,'1020,3040','faisal Zone',2),(3,2,'100,200','jabal',2);
/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-23 15:08:52