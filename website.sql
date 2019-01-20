/*
Navicat MySQL Data Transfer

Source Server         : fyh
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : website

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2019-01-20 22:22:17
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
INSERT INTO `admin` VALUES ('1', 'admin', '123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJpYXQiOjE1NDc5ODgzOTcsImV4cCI6MTU0Nzk5OTE5N30.VtDn5gaIYXhANE_ifKgyzkmauWqKNNPZWce9U8WoyK0', '2019-1-20 下午8:46:37');

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `article_id` varchar(10) CHARACTER SET utf8 NOT NULL,
  `article_title` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `article_introduce` varchar(400) CHARACTER SET utf8 DEFAULT '',
  `article_pass` tinyint(4) NOT NULL DEFAULT '0',
  `article_author` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `article_path` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `article_assist` tinyint(10) NOT NULL DEFAULT '0',
  `article_read` int(11) NOT NULL DEFAULT '0',
  `article_img` varchar(255) CHARACTER SET utf8 DEFAULT '',
  `article_time` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  `tags_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `tags_id` (`tags_id`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('0652309127', '清除浮动的六种方式', '', '1', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/清除浮动的六种方式.md', '23', '0', '', '2019-1-16 下午6:19:54', 'f11d873b99');
INSERT INTO `articles` VALUES ('06b49d8513', 'js实现插入排序', '', '1', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/js实现插入排序.md', '0', '0', '', '2019-1-16 下午6:19:54', '3a868d8e6b');
INSERT INTO `articles` VALUES ('6ad6bf1cb4', '动手实现一个简单的Promise', '', '1', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/动手实现一个简单的Promise.md', '0', '0', '', '2019-1-16 下午6:19:54', '15f50360a3');
INSERT INTO `articles` VALUES ('95e00e13fa', 'Vue生命周期函数', '', '1', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/Vue生命周期函数.md', '4', '0', '', '2019-1-16 下午6:19:54', '6df93151c8');
INSERT INTO `articles` VALUES ('d04eac5996', 'JS类型判断', '', '1', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/JS类型判断.md', '3', '0', '', '2019-1-16 下午6:19:54', '8bb9eea07c');
INSERT INTO `articles` VALUES ('e01622ffe5', 'BFS求图的最短路径', '', '1', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/BFS求图的最短路径.md', '0', '0', '', '2019-1-16 下午6:19:54', '3a868d8e6b');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` varchar(10) NOT NULL,
  `parent_id` varchar(10) DEFAULT '',
  `article_id` varchar(10) DEFAULT '',
  `comment_name` varchar(255) DEFAULT NULL,
  `comment_touxiang` varchar(40) DEFAULT NULL,
  `comment_content` varchar(600) DEFAULT '',
  `comment_email` varchar(50) DEFAULT '',
  `comment_agree` int(10) unsigned DEFAULT '0',
  `comment_create_time` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('0d9252bfa8', '660c4ddcc0', '0652309127', 'admin', '#icon-default', '11', '', '0', '1547653147656');
INSERT INTO `comments` VALUES ('1cd84387e1', '65cb082b26', '0652309127', 'admin', '#icon-default', 'sdasadasd', '', '0', '1547652904008');
INSERT INTO `comments` VALUES ('2a29fe882c', '', '0652309127', 'ad', '#icon-default11', '456688587', '1131153523@qq.com', '0', '1547651197323');
INSERT INTO `comments` VALUES ('3f96186c92', '660c4ddcc0', '0652309127', 'admin', '#icon-default', '2', '', '0', '1547653296129');
INSERT INTO `comments` VALUES ('65cb082b26', '', '0652309127', 'ad', '#icon-default14', '14235235', '1131153523@qq.com', '0', '1547651195846');
INSERT INTO `comments` VALUES ('660c4ddcc0', '', '0652309127', 'ad', '#icon-default14', 'sadasdasd', '1131153523@qq.com', '1', '1547651192602');
INSERT INTO `comments` VALUES ('72a5dcad7e', 'cd7b30269a', '0652309127', 'admin', '#icon-default', 'asdasd', '', '0', '1547653037546');
INSERT INTO `comments` VALUES ('837c4dc439', '2a29fe882c', '0652309127', 'admin', '#icon-default', 'asdasd', '', '0', '1547652991687');
INSERT INTO `comments` VALUES ('a321c6c937', '', '95e00e13fa', '１２３１２３', '#icon-default8', '１２３１２４１２４', '', '0', '1547818151630');
INSERT INTO `comments` VALUES ('a7dc59462b', 'cd7b30269a', '0652309127', 'admin', '#icon-default', 'sadasdasd', '', '0', '1547652930354');
INSERT INTO `comments` VALUES ('c0fd181a31', '2a29fe882c', '0652309127', 'admin', '#icon-default', 'sadasdasd', '', '0', '1547652851920');
INSERT INTO `comments` VALUES ('cd7b30269a', '', '0652309127', 'ad', '#icon-default10', 'asdasd', '1131153523@qq.com', '0', '1547651194291');
INSERT INTO `comments` VALUES ('d3f52423e4', '660c4ddcc0', '0652309127', 'admin', '#icon-default', '3333', '', '3', '1547653380420');
INSERT INTO `comments` VALUES ('e93d84718e', '', '95e00e13fa', '１２３１２３', '#icon-default7', '１２３１２４１２４ｓａｄａｓ', '', '0', '1547818167367');

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
INSERT INTO `draft` VALUES ('# dasasdasdasd112');

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
INSERT INTO `tags` VALUES ('15f50360a3', 'ES6');
INSERT INTO `tags` VALUES ('324ac48b35', 'Python');
INSERT INTO `tags` VALUES ('3a868d8e6b', '算法');
INSERT INTO `tags` VALUES ('3e683567f8', '项目');
INSERT INTO `tags` VALUES ('5cc303136b', 'Webpack');
INSERT INTO `tags` VALUES ('6df93151c8', 'Vue');
INSERT INTO `tags` VALUES ('7148d4c1b2', 'HTML');
INSERT INTO `tags` VALUES ('8bb9eea07c', 'Javascript');
INSERT INTO `tags` VALUES ('cdaa231199', 'NodeJS');
INSERT INTO `tags` VALUES ('d8f4816c34', '数据库');
INSERT INTO `tags` VALUES ('f11d873b99', 'CSS');

-- ----------------------------
-- Table structure for tools
-- ----------------------------
DROP TABLE IF EXISTS `tools`;
CREATE TABLE `tools` (
  `tool_id` varchar(10) NOT NULL,
  `tool_name` varchar(100) DEFAULT '',
  `tool_url` varchar(255) DEFAULT '',
  `tool_type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`tool_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tools
-- ----------------------------
INSERT INTO `tools` VALUES ('1', '一套绝佳的图标字体库和CSS框架', 'http://fontawesome.dashgame.com/', '前端');
INSERT INTO `tools` VALUES ('2', 'CSS3兼容代码自动补全', 'http://pleeease.io/play', '前端');
INSERT INTO `tools` VALUES ('3', '鸠摩搜书', 'https://www.jiumodiary.com/', '工具');
