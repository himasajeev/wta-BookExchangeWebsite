-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: new
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `Fname` varchar(255) NOT NULL,
  `Lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('gayathriiii','Gayathri','gutla','gayathrihogwarts@gmail.com','$2a$10$uMgSfHYSMk.OCXiJXhBdXOOHRjTWIZQLgm1vlWKigJ59qIqSNF25q','2020-06-12 10:03:54','2020-06-12 10:03:54'),('himaa','hima','..','himasajeev@gmail.com','$2a$10$vDIDgfgVUjuZFGydp3h4.ONWseAenRF4NJuRxIA.EWQMsYG0SHX1y','2020-06-09 19:12:19','2020-06-09 19:12:19'),('nithya','nithya','poli','dsf@dfd.com','$2a$10$ye4frfUfv8HlglGZ0Yn/Gerjy3pPXZas.Uck3evhLY6hOu.ZmyXcu','2020-06-08 16:50:25','2020-06-08 16:50:25'),('nithya0903','nithya','manoj','nithyamanoj.ms@gmail.com','$2a$10$1TABJa9vIVA9UgU92BKAMOsLIT70UEc0p/x..osLpNKVjGjSCvfk2','2020-06-03 04:33:00','2020-06-03 04:33:00'),('nithya09030','nithya','awesome','thejuggs@juggsworld.com','$2a$10$ifj4XdIfN6qq6siP6Jpy.OxmDPxz8DXm8YX6Mz0T5C42a68cQNHza','2020-06-08 16:41:43','2020-06-08 16:41:43'),('nithyaa00','nithyaaa','poliii','email.sdf@sd.com','$2a$10$pWCMD3AiPtB/H799eaAeJ.m4ST95L9CqURbQb1c1ESNI5ms8CZrQ2','2020-06-08 16:53:58','2020-06-08 16:53:58'),('nithyaa007','nithyaa','poliii','dssf@dfd.com','$2a$10$lJE.Nt9h0tVAjcb39AzcdOWX72ASOWEOj8HPIhLCe.8a1i2/7NYDG','2020-06-08 16:52:26','2020-06-08 16:52:26'),('Poojitha','Krishna','Poojitha','poojitha@gmail.com','$2a$10$r3hSm6XawAVSSGEVh7Kl7O4P6T0mOS7KCqkzjb1eHDcHg2J58VR7i','2020-06-09 19:14:54','2020-06-09 19:14:54'),('priyanka','Priyanka','b g','priyahem7@gmail.com','$2a$10$wGDGLqAnwkCVvcRQgXFiTetc98.SutN2g9QisCrijZt2RcriVqnYG','2020-06-12 10:06:59','2020-06-12 10:06:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `deleteUser` BEFORE DELETE ON `users` FOR EACH ROW begin
delete from cart where OLD.username=cart.UserUsername;
delete from book_belongs_to where OLD.username = book_belongs_to.UserUsername;
delete from cart where cart.bookId IN (Select book_belongs_to.bookId where book_belongs_to.userUsername = OLD.username);
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-14 17:29:19
