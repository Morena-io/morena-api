
--
-- Table structure for table `emails`
--

CREATE TABLE `emails` (
  `email_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `dateAdded` (`dateAdded`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `schemaversion`. Indicates which schema migrations
-- have been completed.
--

CREATE TABLE `schemaversion` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `version` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
