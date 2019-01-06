/*
Navicat MySQL Data Transfer

Source Server         : fanyihui
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : website

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2019-01-06 17:25:00
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
INSERT INTO `admin` VALUES ('1', 'admin', '123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJpYXQiOjE1NDY3NjUxMTIsImV4cCI6MTU0Njc3NTkxMn0.uFhFM9UPYkP4PmifV3MoIRtWKzxsQh9wHi4Q1MPmfsA', '2019-1-6 下午4:58:32');

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
  `article_assist` int(11) NOT NULL DEFAULT '0',
  `article_read` int(11) NOT NULL DEFAULT '0',
  `article_img` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `article_time` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  `tags_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `tags_id` (`tags_id`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1498c1846a', 'sasdadasasd', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/sasdadasasd.md', '0', '0', null, '2019-1-1 下午1:05:46', '6df93151c8');
INSERT INTO `articles` VALUES ('1ca72989dc', 'asdasdas', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/asdasdas.md', '0', '0', '/uploads/articleTumbImg/1546745702445-深度截图_选择区域_20190105213624.png', '2019-1-1 下午1:21:52', '6df93151c8');
INSERT INTO `articles` VALUES ('63a67e7376', ' JS防抖', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/JS防抖.md', '0', '0', '/uploads/articleTumbImg/1546755341894-深度截图_选择区域_20190105213624.png', '2019-1-6 下午2:05:52', '8bb9eea07c');
INSERT INTO `articles` VALUES ('767b7adc0f', ' 爬虫1', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/爬虫1.md', '0', '0', '/uploads/articleTumbImg/1546745674719-深度截图_选择区域_20190105213624.png', '2019-1-1 下午3:08:34', '324ac48b35');
INSERT INTO `articles` VALUES ('9b450f229e', ' JS节流函数', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/JS节流函数.md', '0', '0', '', '2019-1-5 下午7:07:12', '8bb9eea07c');
INSERT INTO `articles` VALUES ('aed1c3d1c5', ' JS防抖函数', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/JS防抖函数.md', '0', '0', '', '2019-1-5 下午7:08:17', '8bb9eea07c');
INSERT INTO `articles` VALUES ('c24ab6c8c0', 'xscdsfdsfdfs', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/xscdsfdsfdfs.md', '0', '0', '/uploads/articleTumbImg/1546745839039-深度截图_选择区域_20190105213624.png', '2019-1-3 下午2:39:28', '6df93151c8');
INSERT INTO `articles` VALUES ('deb1a93216', ' 爬虫', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/爬虫.md', '0', '0', '/uploads/articleTumbImg/1546745966743-深度截图_选择区域_20190105213624.png', '2019-1-1 下午2:39:35', '324ac48b35');
INSERT INTO `articles` VALUES ('eea31b9ea3', 'sadfdgrrthrh', '0', 'admin', '/home/fanyihui/Desktop/web-demo/server/static/articles/sadfdgrrthrh.md', '0', '0', '/uploads/articleTumbImg/1546746530101-深度截图_选择区域_20190105213624.png', '2019-1-1 下午4:06:47', '8bb9eea07c');

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
INSERT INTO `draft` VALUES ('# JS防抖\n\n\n```javascript\nfunction debounce(func, wait, immediate) {\n    var timeout, result;\n    var debounced = function () {\n        var context = this;            //保存this，否则在回调函数中访问的将会是window\n        var args = arguments;　　//获取事件对象\n        if (timeout) clearTimeout(timeout);　　//只要没有停止触发实践，就会不断清除定时器\n        if (immediate) {            //判断是否立即执行\n            // 如果已经执行过，不再执行\n            var callNow = !timeout;　//　false\n            timeout = setTimeout(function(){\n                timeout = null;        //清除定时器\n            }, wait)\n            if (callNow) result = func.apply(context, args)    //如果执行过就不会进行这一步\n        }　else {\n            timeout = setTimeout(function(){\n                func.apply(context, args)　　//调用回调函数，并改变this指向，传入事件对象\n            }, wait);\n        }\n        return result;\n    };\n    debounced.cancel = function() {\n        clearTimeout(timeout);\n        timeout = null;\n    };\n    return debounced;\n}\n```\n![深度截图_选择区域_20190105213624.png](http://127.0.0.1:3000/uploads/articleImg/深度截图_选择区域_20190105213624.png)\n\n\n\n\n\n\n\n');

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
INSERT INTO `tags` VALUES ('324ac48b35', 'Python');
INSERT INTO `tags` VALUES ('6df93151c8', 'Vue');
INSERT INTO `tags` VALUES ('8bb9eea07c', 'JS');
