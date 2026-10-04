---
title: "技术分享：Hexo 主题开发实践"
date: 2026-08-30 16:20:00
categories:
  - 技术随笔
tags:
  - Hexo
  - 前端
excerpt: "以 Xongyi 主题为例，介绍 Hexo 主题开发的目录结构、EJS 模板组织、主题配置设计与多平台部署的实践经验。"
---

本文以 Xongyi 主题为例，分享 Hexo 主题开发中的一些实践经验。

## 目录组织

```
themes/hexo-theme-xongyi/
├── _config.yml      # 主题配置（用户唯一需要关心的文件）
├── layout/          # EJS 布局与 partial
│   └── _partial/    # 头部、页脚与首页各板块
├── scripts/         # 自定义 helper（图标库等）
├── source/          # 样式、脚本与静态资源
└── languages/       # 国际化文案
```

## 配置驱动

官网类主题的关键是"内容与样式分离"：首页所有板块由 `sections` 数组控制顺序，每个板块的文案与数据放在 `_config.yml` 对应节点，用户无需改动模板即可完成整站搭建。

## 多平台部署

静态站点的部署非常简单：`hexo generate` 输出 `public/` 目录，交给任意静态托管平台即可。Xongyi 仓库内置了 GitHub Actions、Vercel、Netlify、Cloudflare Pages、EdgeOne Pages 的配置文件，推送代码即自动发布。
