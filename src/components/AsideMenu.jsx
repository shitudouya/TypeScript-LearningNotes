import { Link } from "react-router-dom";
import { Menu } from "antd";
import React from "react";

const menus = [
  { key: "/preface", title: "前言", path: "/preface" },
  { key: "/start", title: "起步", path: "/start" },
  { key: "/environment", title: "环境搭建", path: "/environment" },
  { key: "/configuration", title: "配置解析", path: "/configuration" },
  { key: "/type", title: "数据类型", path: "/type" },
  { key: "/manner", title: "声明方式", path: "/manner" },
  { key: "/function", title: "函数", path: "/function" },
  { key: "/interface", title: "接口", path: "/interface" },
  { key: "/class", title: "类", path: "/class" },
  { key: "/genericity", title: "泛型", path: "/genericity" },
  { key: "/module", title: "模块", path: "/module" },
  { key: "/namespace", title: "命名空间", path: "/namespace" },
  { key: "/merge", title: "声明合并", path: "/merge" },
  { key: "/decorator", title: "装饰器", path: "/decorator" },
  { key: "/declare", title: "声明文件", path: "/declare" },
  { key: "/recommend", title: "实战推荐", path: "/recommend" },
];

const AsideMenu = menus.map((value) => (
  <Menu.Item key={value.key}>
    <Link to={value.path}>{value.title}</Link>
  </Menu.Item>
));

export default AsideMenu;
