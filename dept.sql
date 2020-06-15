/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50527
 Source Host           : localhost:3306
 Source Schema         : eladmin

 Target Server Type    : MySQL
 Target Server Version : 50527
 File Encoding         : 65001

 Date: 15/06/2020 17:58:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '部门编号',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `pid` bigint(20) NOT NULL COMMENT '上级部门',
  `enabled` bigint(1) NOT NULL COMMENT '状态',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 308 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '部门' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES (1, '0', '全国合计', 0, 1, '2019-03-01 12:07:37');
INSERT INTO `dept` VALUES (18, '001', '中央本级', 1, 1, '2020-04-22 16:57:32');
INSERT INTO `dept` VALUES (19, '009', '地方合计', 1, 1, '2020-04-22 17:02:26');
INSERT INTO `dept` VALUES (20, '001001', '中央本级', 18, 1, '2020-04-22 17:02:58');
INSERT INTO `dept` VALUES (21, '001002', '新疆生产建设兵团', 18, 1, '2020-04-22 17:03:27');
INSERT INTO `dept` VALUES (22, '009001', '北京市', 19, 1, '2020-04-22 17:37:53');
INSERT INTO `dept` VALUES (23, '0090011', '北京市本级', 22, 1, '2020-04-22 17:38:32');
INSERT INTO `dept` VALUES (24, '0090019', '北京市区县合计', 22, 1, '2020-04-22 17:38:54');
INSERT INTO `dept` VALUES (25, '0090019101', '东城区', 24, 1, '2020-04-22 17:39:54');
INSERT INTO `dept` VALUES (26, '0090019102', '西城区', 24, 1, '2020-04-22 17:40:12');
INSERT INTO `dept` VALUES (27, '0090019103', '崇文区', 24, 1, '2020-04-22 17:40:29');
INSERT INTO `dept` VALUES (28, '0090019104', '宣武区', 24, 1, '2020-04-22 17:40:45');
INSERT INTO `dept` VALUES (29, '0090019105', '朝阳区', 24, 1, '2020-04-22 17:41:05');
INSERT INTO `dept` VALUES (30, '0090019106', '海淀区', 24, 1, '2020-04-22 17:44:17');
INSERT INTO `dept` VALUES (31, '0090019107', '石景山区', 24, 1, '2020-04-22 17:44:37');
INSERT INTO `dept` VALUES (32, '0090019108', '丰台区', 24, 1, '2020-04-22 17:45:12');
INSERT INTO `dept` VALUES (33, '0090019109', '门头沟区', 24, 1, '2020-04-22 17:45:45');
INSERT INTO `dept` VALUES (34, '0090019111', '房山区', 24, 1, '2020-04-22 17:46:03');
INSERT INTO `dept` VALUES (35, '0090019112', '通州区', 24, 1, '2020-04-22 17:46:23');
INSERT INTO `dept` VALUES (36, '0090019113', '昌平区', 24, 1, '2020-04-22 17:46:39');
INSERT INTO `dept` VALUES (37, '0090019114', '顺义区', 24, 1, '2020-04-22 17:46:58');
INSERT INTO `dept` VALUES (38, '0090019115', '大兴区', 24, 1, '2020-04-22 17:47:46');
INSERT INTO `dept` VALUES (39, '0090019116', '怀柔区', 24, 1, '2020-04-22 17:47:58');
INSERT INTO `dept` VALUES (40, '0090019117', '平谷区', 24, 1, '2020-04-22 17:48:15');
INSERT INTO `dept` VALUES (41, '0090019228', '密云区', 24, 1, '2020-04-22 17:48:37');
INSERT INTO `dept` VALUES (42, '0090019229', '延庆区', 24, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (43, '009002', '天津市', 19, 1, '2020-04-22 17:49:26');
INSERT INTO `dept` VALUES (44, '0090021', '天津市本级', 43, 1, '2020-04-22 17:58:29');
INSERT INTO `dept` VALUES (45, '0090029', '天津市区县合计', 43, 1, '2020-04-22 17:58:32');
INSERT INTO `dept` VALUES (46, '0090029001', '和平区', 45, 1, '2020-04-22 17:58:57');
INSERT INTO `dept` VALUES (47, '0090029001', '和平区', 45, 1, '2020-04-22 17:58:57');
INSERT INTO `dept` VALUES (48, '0090029002', '河北区', 45, 1, '2020-04-22 17:59:21');
INSERT INTO `dept` VALUES (49, '0090029002', '河北区', 45, 1, '2020-04-22 17:59:21');
INSERT INTO `dept` VALUES (50, '0090029003', '河东区', 45, 1, '2020-04-22 17:59:43');
INSERT INTO `dept` VALUES (51, '0090029004', '河西区', 45, 1, '2020-04-22 18:00:10');
INSERT INTO `dept` VALUES (52, '0090029005', '南开区', 45, 1, '2020-04-22 18:00:31');
INSERT INTO `dept` VALUES (53, '0090029006', '红桥区', 45, 1, '2020-04-22 18:06:17');
INSERT INTO `dept` VALUES (54, '0090029007', '塘沽区', 45, 1, '2020-04-22 18:06:43');
INSERT INTO `dept` VALUES (55, '0090029008', '汉沽区', 45, 1, '2020-04-22 18:07:08');
INSERT INTO `dept` VALUES (56, '0090029009', '大港区', 45, 1, '2020-04-22 18:07:32');
INSERT INTO `dept` VALUES (57, '0090029010', '东丽区', 45, 1, '2020-04-22 18:07:52');
INSERT INTO `dept` VALUES (58, '0090029011', '西青区', 45, 1, '2020-04-22 18:08:11');
INSERT INTO `dept` VALUES (59, '0090029012', '津南区', 45, 1, '2020-04-22 18:08:32');
INSERT INTO `dept` VALUES (60, '0090029013', '北辰区', 45, 1, '2020-04-22 18:09:02');
INSERT INTO `dept` VALUES (61, '0090029014', '武清区', 45, 1, '2020-04-22 18:09:27');
INSERT INTO `dept` VALUES (62, '0090029015', '宝坻区', 45, 1, '2020-04-22 18:09:47');
INSERT INTO `dept` VALUES (63, '0090029016', '蓟州区', 45, 1, '2020-04-22 18:10:10');
INSERT INTO `dept` VALUES (64, '0090029017', '宁河区', 45, 1, '2020-04-22 18:10:36');
INSERT INTO `dept` VALUES (65, '0090029018', '静海区', 45, 1, '2020-04-22 18:10:56');
INSERT INTO `dept` VALUES (66, '0090029019', '开发区', 45, 1, '2020-04-22 18:11:22');
INSERT INTO `dept` VALUES (67, '0090029020', '保税区', 45, 1, '2020-04-22 18:11:42');
INSERT INTO `dept` VALUES (68, '0090029021', '园区', 45, 1, '2020-04-22 18:11:57');
INSERT INTO `dept` VALUES (69, '0090029022', '滨海新区', 45, 1, '2020-04-22 18:12:14');
INSERT INTO `dept` VALUES (70, '009003', '河北省', 19, 1, '2020-05-13 09:40:13');
INSERT INTO `dept` VALUES (71, '0090031', '河北省本级', 70, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (72, '0090039', '河北省地市合计', 70, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (73, '0090039001', '石家庄市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (74, '00900390011', '石家庄市本级', 73, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (75, '00900390019', '石家庄市区县合计', 73, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (76, '00900390019001', '赞皇县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (77, '00900390019002', '平山县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (78, '00900390019003', '灵寿县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (79, '00900390019004', '行唐县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (80, '00900390019005', '井陉县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (81, '00900390019006', '鹿泉区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (82, '00900390019007', '正定县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (83, '00900390019008', '栾城区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (84, '00900390019009', '辛集市', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (85, '00900390019010', '晋州市', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (86, '00900390019011', '深泽县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (87, '00900390019012', '无极县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (88, '00900390019013', '藁城区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (89, '00900390019014', '赵县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (90, '00900390019015', '新乐市', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (91, '00900390019016', '高邑县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (92, '00900390019017', '元氏县', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (93, '00900390019018', '长安区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (94, '00900390019019', '桥东区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (95, '00900390019020', '桥西区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (96, '00900390019021', '新华区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (97, '00900390019022', '裕华区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (98, '00900390019023', '矿区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (99, '00900390019024', '高新区', 75, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (100, '0090039002', '唐山市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (101, '00900390021', '唐山市本级', 100, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (102, '00900390029', '唐山市区县合计', 100, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (103, '00900390029001', '滦州市', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (104, '00900390029002', '滦南县', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (105, '00900390029003', '乐亭县', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (106, '00900390029004', '迁西县', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (107, '00900390029005', '唐海县', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (108, '00900390029006', '迁安市', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (109, '00900390029007', '玉田县', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (110, '00900390029008', '遵化市', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (111, '00900390029009', '路南区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (112, '00900390029010', '路北区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (113, '00900390029011', '古冶区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (114, '00900390029012', '开平区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (115, '00900390029013', '丰润区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (116, '00900390029014', '丰南区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (117, '00900390029015', '高新开发区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (118, '00900390029016', '海港开发区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (119, '00900390029017', '南堡开发区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (120, '00900390029018', '芦台开发区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (121, '00900390029019', '汉沽管理区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (122, '00900390029020', '曹妃甸区', 102, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (123, '0090039003', '邯郸市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (124, '00900390031', '邯郸市本级', 123, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (125, '00900390039', '邯郸市区县合计', 123, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (126, '00900390039001', '大名县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (127, '00900390039002', '魏县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (128, '00900390039003', '曲周县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (129, '00900390039004', '邱县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (130, '00900390039005', '鸡泽县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (131, '00900390039006', '肥乡区', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (132, '00900390039007', '广平县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (133, '00900390039008', '成安县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (134, '00900390039009', '临漳县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (135, '00900390039010', '馆陶县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (136, '00900390039011', '磁县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (137, '00900390039012', '涉县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (138, '00900390039013', '永年区', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (139, '00900390039014', '邯郸县', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (140, '00900390039015', '武安市', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (141, '00900390039016', '邯山区', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (142, '00900390039017', '丛台区', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (143, '00900390039018', '复兴区', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (144, '00900390039019', '峰峰矿区', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (145, '00900390039020', '开发区', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (146, '00900390039021', '马头工业园区', 125, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (147, '0090039004', '张家口市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (148, '00900390041', '张家口市本级', 147, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (149, '00900390049', '张家口市区县合计', 147, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (150, '00900390049001', '蔚县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (151, '00900390049002', '阳原县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (152, '00900390049003', '张北县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (153, '00900390049004', '康保县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (154, '00900390049005', '沽源县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (155, '00900390049006', '尚义县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (156, '00900390049007', '怀安县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (157, '00900390049008', '赤城县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (158, '00900390049009', '崇礼区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (159, '00900390049010', '万全区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (160, '00900390049011', '宣化县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (161, '00900390049012', '怀来县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (162, '00900390049013', '涿鹿县', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (163, '00900390049014', '宣化区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (164, '00900390049015', '下花园区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (165, '00900390049016', '桥东区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (166, '00900390049017', '桥西区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (167, '00900390049018', '高新区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (168, '00900390049019', '察北区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (169, '00900390049020', '塞北区', 149, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (170, '0090039005', '保定市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (171, '00900390051', '保定市本级', 170, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (172, '00900390059', '保定市区县合计', 170, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (173, '00900390059001', '清苑区', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (174, '00900390059002', '满城区', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (175, '00900390059003', '安新县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (176, '00900390059004', '唐县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (177, '00900390059005', '顺平县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (178, '00900390059006', '博野县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (179, '00900390059007', '曲阳县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (180, '00900390059008', '涞源县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (181, '00900390059009', '阜平县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (182, '00900390059010', '易县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (183, '00900390059011', '定兴县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (184, '00900390059012', '徐水区', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (185, '00900390059013', '容城县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (186, '00900390059014', '涿州市', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (187, '00900390059015', '涞水县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (188, '00900390059016', '高碑店市', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (189, '00900390059017', '雄县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (190, '00900390059018', '望都县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (191, '00900390059019', '高阳县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (192, '00900390059020', '蠡县', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (193, '00900390059021', '安国市', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (194, '00900390059022', '定州市', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (195, '00900390059023', '南市区', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (196, '00900390059024', '莲池区', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (197, '00900390059025', '竞秀区', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (198, '00900390059026', '高新区', 172, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (199, '0090039006', '沧州市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (200, '00900390061', '沧州市本级', 199, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (201, '00900390069', '沧州市区县合计', 199, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (202, '00900390069001', '肃宁县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (203, '00900390069002', '献县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (204, '00900390069003', '盐山县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (205, '00900390069004', '孟村县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (206, '00900390069005', '沧县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (207, '00900390069006', '青县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (208, '00900390069007', '南皮县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (209, '00900390069008', '河间市', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (210, '00900390069009', '任丘市', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (211, '00900390069010', '海兴县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (212, '00900390069011', '东光县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (213, '00900390069012', '泊头市', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (214, '00900390069013', '吴桥县', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (215, '00900390069014', '黄骅市', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (216, '00900390069015', '新华区', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (217, '00900390069016', '运河区', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (218, '00900390069017', '开发区', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (219, '00900390069018', '港口区', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (220, '00900390069019', '南大港区', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (221, '00900390069020', '临港区', 201, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (222, '0090039007', '秦皇岛市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (223, '00900390071', '秦皇岛市本级', 222, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (224, '00900390079', '秦皇岛市区县合计', 222, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (225, '00900390079001', '青龙满族自治县', 224, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (226, '00900390079002', '昌黎县', 224, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (227, '00900390079003', '卢龙县', 224, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (228, '00900390079004', '抚宁区', 224, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (229, '00900390079005', '山海关区', 224, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (230, '00900390079006', '海港区', 224, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (231, '00900390079007', '北戴河区', 224, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (232, '00900390079008', '秦皇岛经济技术开发区', 224, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (233, '0090039008', '邢台市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (234, '00900390081', '邢台市本级', 233, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (235, '00900390089', '邢台市区县合计', 233, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (236, '00900390089001', '南宫市', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (237, '00900390089002', '沙河市', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (238, '00900390089003', '邢台县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (239, '00900390089004', '临城县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (240, '00900390089005', '内丘县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (241, '00900390089006', '柏乡县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (242, '00900390089007', '隆尧县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (243, '00900390089008', '任县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (244, '00900390089009', '南和县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (245, '00900390089010', '宁晋县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (246, '00900390089011', '巨鹿县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (247, '00900390089012', '新河县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (248, '00900390089013', '广宗县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (249, '00900390089014', '平乡县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (250, '00900390089015', '威县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (251, '00900390089016', '清河县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (252, '00900390089017', '临西县', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (253, '00900390089018', '桥东区', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (254, '00900390089019', '桥西区', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (255, '00900390089020', '高开区', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (256, '00900390089021', '大曹庄管理区', 235, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (257, '0090039009', '廊坊市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (258, '00900390091', '廊坊市本级', 257, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (259, '00900390099', '廊坊市区县合计', 257, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (260, '00900390099001', '三河市', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (261, '00900390099002', '大厂县', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (262, '00900390099003', '香河县', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (263, '00900390099004', '永清县', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (264, '00900390099005', '固安县', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (265, '00900390099006', '霸州市', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (266, '00900390099007', '文安县', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (267, '00900390099008', '大城县', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (268, '00900390099009', '安次区', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (269, '00900390099010', '广阳区', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (270, '00900390099011', '开发区', 259, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (271, '0090039010', '承德市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (272, '00900390101', '承德市本级', 271, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (273, '00900390109', '承德市区县合计', 271, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (274, '00900390109001', '宽城县', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (275, '00900390109002', '滦平县', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (276, '00900390109003', '丰宁县', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (277, '00900390109004', '隆化县', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (278, '00900390109005', '围场县', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (279, '00900390109006', '承德县', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (280, '00900390109007', '兴隆县', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (281, '00900390109008', '平泉市', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (282, '00900390109009', '双桥区', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (283, '00900390109010', '双滦区', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (284, '00900390109011', '营子区', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (285, '00900390109012', '开发区', 273, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (286, '0090039011', '衡水市', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (287, '00900390111', '衡水市本级', 286, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (288, '00900390119', '衡水市区县合计', 286, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (289, '00900390119001', '武邑县', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (290, '00900390119002', '饶阳县', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (291, '00900390119003', '安平县', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (292, '00900390119004', '冀州区', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (293, '00900390119005', '枣强县', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (294, '00900390119006', '深州市', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (295, '00900390119007', '武强县', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (296, '00900390119008', '故城县', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (297, '00900390119009', '景县', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (298, '00900390119010', '阜城县', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (299, '00900390119011', '桃城区', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (300, '00900390119012', '高开区', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (301, '00900390119013', '滨湖新区', 288, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (302, '0090039012', '雄安新区', 72, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (303, '00900390121', '雄安新区本级', 302, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (304, '00900390129', '雄安新区区县合计', 302, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (305, '00900390129001', '雄县', 304, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (306, '00900390129002', '安新县', 304, 1, '2020-04-22 17:48:54');
INSERT INTO `dept` VALUES (307, '00900390129003', '容城县', 304, 1, '2020-04-22 17:48:54');

SET FOREIGN_KEY_CHECKS = 1;
