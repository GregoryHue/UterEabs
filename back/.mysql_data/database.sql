-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: uber_eats
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int NOT NULL,
  `token` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `zip_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'client1@gmail.com','client1','$2a$10$9ReE9j1hXE0KJgCTcM6Gg.DhHv3Q2ndQLhzBwdOQFFFPIGWdiIx/C',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQ5NjE0MjAsImV4cCI6MTYyNTA0NzgyMH0.D80HUJD2-XQVnKheG8BJjNqAIqSXMRBzctdJmQ3KKyM',NULL,'AMIENS','60, rue de Geneves','80090 '),(2,'client2@gmail.com','client2','$2a$10$9ReE9j1hXE0KJgCTcM6Gg.DhHv3Q2ndQLhzBwdOQFFFPIGWdiIx/C',1,NULL,NULL,'VILLENEUVE-LA-GARENNE','35, place de Miremont','92390 '),(3,'restaurant1@gmail.com','restaurant1','$2a$10$9ReE9j1hXE0KJgCTcM6Gg.DhHv3Q2ndQLhzBwdOQFFFPIGWdiIx/C',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwNzc5MzQsImV4cCI6MTYyNTE2NDMzNH0.uO8FNyI5N-y1rTlLARllMtM9K5jdGMUZbKldPpPNHvE',NULL,'Kenner','663 Paul Wayne Haggerty Road','70065'),(4,'restaurant2@gmail.com','restaurant2','$2a$10$9ReE9j1hXE0KJgCTcM6Gg.DhHv3Q2ndQLhzBwdOQFFFPIGWdiIx/C',2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwNzIyMDUsImV4cCI6MTYyNTE1ODYwNX0.JXSuG5M60mtrtiiDNOOuypGDFb-luY3hNXOKDKgnuDs',NULL,'BAGNEUX','56, Rue Joseph Vernet','92220 '),(9,'delivery1@gmail.com','delivery1','$2a$10$9ReE9j1hXE0KJgCTcM6Gg.DhHv3Q2ndQLhzBwdOQFFFPIGWdiIx/C',4,NULL,NULL,'MONTLUÇON','39, Avenue des Près','15154'),(12,'encrypt1@gmail.com','encrypt1','$2a$10$9ReE9j1hXE0KJgCTcM6Gg.DhHv3Q2ndQLhzBwdOQFFFPIGWdiIx/C',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwNzcyNjksImV4cCI6MTYyNTE2MzY2OX0.dL4dGzU0ilQtfJo0E4nNgvdco2aeJO9B4GxsAomULW4',NULL,'rouen','15 rue bidule','76000'),(13,'encrypt2@gmail.com','encrypt2','$2a$10$VjVffZOvwqMQeiETwu.HV.weGP8cWUYmDaQeDCA3hVs1JtFsYwbqG',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwNzc0NTgsImV4cCI6MTYyNTE2Mzg1OH0.2-yOl1xUvXiEKRZzNOCkBvOZAI7Speh4WvJBjy4N_l0',NULL,'azeaze','popop','76000');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'mdptrocool';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mdptrocool';                            FLUSH PRIVILEGES;

-- Dump completed on 2021-07-01 18:08:22
