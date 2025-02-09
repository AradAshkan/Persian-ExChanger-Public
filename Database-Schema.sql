-- Persian ExChanger Database Schema (Public Version)

-- Table: Identifier
CREATE TABLE IF NOT EXISTS `idf` (
  `GuildID` char(50) NOT NULL,
  `Coins` int(11) DEFAULT 0,
  `DailyReward` char(50) DEFAULT NULL,
  `Verify` char(50) DEFAULT NULL,
  `ChannelID` char(50) DEFAULT NULL,
  `Premium` char(50) DEFAULT NULL,
  `OwnerID` char(50) DEFAULT NULL,
  `Content` longtext DEFAULT NULL,
  `Banner` text DEFAULT NULL,
  `LastSendID` int(11) DEFAULT NULL,
  PRIMARY KEY (`GuildID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table: Count
CREATE TABLE IF NOT EXISTS `Count` (
  `GuildID` char(50) NOT NULL,
  `ClientID` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Likes` int(11) DEFAULT 0,
  `DisLike` int(11) DEFAULT 0,
  PRIMARY KEY (`GuildID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Example data (for reference only)
INSERT INTO `idf` (`GuildID`, `Coins`, `DailyReward`, `Verify`, `ChannelID`, `Premium`, `OwnerID`, `Content`, `Banner`, `LastSendID`) 
VALUES ('1234567890', 100, 'yes', 'verified', '9876543210', 'no', '5432109876', 'Sample Content', 'sample_banner.png', 1);

INSERT INTO `Count` (`GuildID`, `ClientID`, `Likes`, `DisLike`) 
VALUES ('1234567890', '9876543210', 10, 2);
