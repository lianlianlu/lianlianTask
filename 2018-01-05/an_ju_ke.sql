/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : bluefirstpro

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-01-07 13:19:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table` (
  `ID` varchar(32) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `b_house` bit(1) DEFAULT NULL,
  `b_ad` bit(1) DEFAULT NULL,
  `b_link` bit(1) DEFAULT NULL,
  `b_broker` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_table
-- ----------------------------

-- ----------------------------
-- Table structure for admin_token_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_token_table`;
CREATE TABLE `admin_token_table` (
  `ID` varchar(32) NOT NULL,
  `admin_ID` varchar(32) DEFAULT NULL,
  `expires` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_token_table
-- ----------------------------

-- ----------------------------
-- Table structure for ad_table
-- ----------------------------
DROP TABLE IF EXISTS `ad_table`;
CREATE TABLE `ad_table` (
  `ID` varchar(32) NOT NULL,
  `admin_ID` varchar(32) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `img_real_path` varchar(255) DEFAULT NULL,
  `expires` int(11) DEFAULT NULL,
  `n_order` int(11) DEFAULT NULL,
  `n_show` int(11) DEFAULT NULL,
  `n_click` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ad_table
-- ----------------------------

-- ----------------------------
-- Table structure for broker_table
-- ----------------------------
DROP TABLE IF EXISTS `broker_table`;
CREATE TABLE `broker_table` (
  `ID` varchar(32) NOT NULL,
  `title` varchar(16) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `img_real_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of broker_table
-- ----------------------------

-- ----------------------------
-- Table structure for house_table
-- ----------------------------
DROP TABLE IF EXISTS `house_table`;
CREATE TABLE `house_table` (
  `ID` varchar(32) NOT NULL,
  `admin_ID` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `position_main` varchar(255) DEFAULT NULL,
  `position_second` varchar(255) DEFAULT NULL,
  `ave_price` int(11) DEFAULT NULL,
  `area_min` smallint(6) DEFAULT NULL,
  `area_max` smallint(6) DEFAULT NULL,
  `tel` varchar(16) DEFAULT NULL,
  `sale_time` int(11) DEFAULT NULL,
  `submit_time` int(11) DEFAULT NULL,
  `building_type` varchar(32) DEFAULT NULL,
  `main_img_path` varchar(255) DEFAULT NULL,
  `main_img_real_path` varchar(255) DEFAULT NULL,
  `img_paths` text,
  `img_real_paths` text,
  `property_types` text,
  `property_img_paths` text,
  `property_img_real_paths` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of house_table
-- ----------------------------

-- ----------------------------
-- Table structure for link_table
-- ----------------------------
DROP TABLE IF EXISTS `link_table`;
CREATE TABLE `link_table` (
  `ID` varchar(32) NOT NULL,
  `admin_ID` varchar(32) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `n_order` int(11) DEFAULT NULL,
  `expires` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of link_table
-- ----------------------------
