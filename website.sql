/*
Navicat MySQL Data Transfer

Source Server         : fyh
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : website

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-12-29 22:02:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` varchar(33) CHARACTER SET utf8 NOT NULL,
  `admin_name` varchar(20) DEFAULT NULL,
  `admin_password` varchar(33) DEFAULT NULL,
  `admin_token` varchar(254) DEFAULT NULL,
  `admin_login_time` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJpYXQiOjE1NDYwODU5NzcsImV4cCI6MTU0NjA5Njc3N30.0XpNl9z1AlA8-bzBLUKy74tYL1B9IYvXwa1173OLcUI', '2018-12-29 20:19:37');

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `article_id` varchar(10) CHARACTER SET utf8 NOT NULL,
  `article_title` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `article_pass` tinyint(4) NOT NULL DEFAULT '0',
  `article_author` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `article_path` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `article_assist` int(11) DEFAULT NULL,
  `article_read` int(11) DEFAULT NULL,
  `article_img` varchar(255) DEFAULT NULL,
  `article_time` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  `tags_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `tags_id` (`tags_id`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of articles
-- ----------------------------

-- ----------------------------
-- Table structure for draft
-- ----------------------------
DROP TABLE IF EXISTS `draft`;
CREATE TABLE `draft` (
  `draft_content` longtext CHARACTER SET utf8
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of draft
-- ----------------------------
INSERT INTO `draft` VALUES ('# 广度优先搜索4444\nasdasdsadadsadasd\nasdasdsad\nasdasdasasd\nasdasd\n```javascript\nlet a = document.querySelector(\'div\')\nasdasdasd\n\n```\nasdasdasfassf');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `tags_id` varchar(10) NOT NULL,
  `tags_name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('6df93151c8', 'Vue');
INSERT INTO `tags` VALUES ('8bb9eea07c', 'JS');
