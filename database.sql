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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `food_name` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `owner_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'https://valentinascorner.com/wp-content/uploads/2015/05/Simple-Russian-Soup-1.jpg','Soup','9.99','It\'s a cool soup.',3),(2,'https://static.lexpress.fr/medias_12020/w_2048,h_1146,c_crop,x_0,y_154/w_1000,h_563,c_fill,g_north/v1550742170/sushi-saumon-maki-saumon-japonais_6154396.jpg','Sushi','19.99','Everyone like sushi.',3),(3,'https://offloadmedia.feverup.com/toulousesecret.com/wp-content/uploads/2020/06/19103431/KEBAB-1-1.jpg','Kebab','12.49','Mhmm kebab.',4),(4,'https://www.jessicagavin.com/wp-content/uploads/2017/07/meat-lasagna-1200.jpg','Lasagna','8.79','Here is a a whole very huge text to test a bit the limit of the application and check if everything works in order, from the database, to the frontend, passing by the backend. Lasagnas are great.',4),(5,'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/D990CCF4-0830-4357-B5F3-C28E8E184E9B/Derivates/e4dff957-d125-4f18-93f2-b1c82a36d7e0.jpg','Ramen','15.49',NULL,3),(6,'https://valentinascorner.com/wp-content/uploads/2015/05/Simple-Russian-Soup-1.jpg','Spring rolls','5.29',NULL,4),(7,'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/40530DEC-4342-4A0B-876E-A0C42AB115B9/Derivates/9F9DD632-76CC-43A6-A523-A68128626EAE.jpg','Baguette','0.89',NULL,4),(8,'https://liliebakery.fr/wp-content/uploads/2021/03/Recette-donuts-Lilie-Bakery.jpg','Donuts','1.29',NULL,4),(9,'https://www.seriouseats.com/thmb/_BkW9V2wK3Zed-zQAETkRSJS8ac=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__04__20180309-french-fries-vicky-wasik-15-5a9844742c2446c7a7be9fbd41b6e27d.jpg','Fries','59.99',NULL,3);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'client1@gmail.com','client1','password',1,NULL,NULL,NULL,NULL,NULL),(2,'client2@gmail.com','client2','password',1,NULL,NULL,NULL,NULL,NULL),(3,'restaurant1@gmail.com','restaurant1','password',2,NULL,NULL,NULL,NULL,NULL),(4,'restaurant2@gmail.com','restaurant2','password',2,NULL,NULL,NULL,NULL,NULL),(5,'zaeazeaze@aze','azeaze','greg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQ3MDk0NzQsImV4cCI6MTYyNDcwOTUzNH0.92xJMVRsSJ3OuIrwIQ0mrnNvj_aAxcBfWKiXSdIjkmU',NULL,'azeaze','aze','48484'),(6,'azeaze@azezae','azeaze','greg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQ4MDUzMzgsImV4cCI6MTYyNDgwNTM5OH0.KN7YSvVzyqIBgOQJaTlVhEThGftPG5sg8CBH6RZ402A',NULL,'azeaz','ezae','78787');
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

-- Dump completed on 2021-06-27 17:29:04
