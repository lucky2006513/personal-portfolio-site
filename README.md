# 个人作品集网站

这是一个基于 `Astro + TypeScript + Tailwind CSS` 的个人作品集网站 v1，用于展示真实项目、技能结构和静态联系方式。当前版本优先完成结构、视觉系统、内容接口、协作文档和 GitHub Pages 自动部署。

## 快速开始

```bash
npm install
npm run dev
```

默认页面：

- `/` 首页
- `/about` 关于我
- `/projects` 作品集
- `/projects/[slug]` 项目详情页
- `/contact` 联系我

## 内容维护方式

- 站点全局信息：`src/data/site.json`
- 个人信息：`src/data/profile.json`
- 项目内容：`src/content/projects/*.md`
- 项目模板：`src/content/projects/_project-template.md`

新增项目时，复制项目模板并去掉文件名前的下划线即可。页面模板会自动读取并生成详情页。

## 常用命令

```bash
npm run dev
npm run build
npm run preview
npm run check
```

## 协作文档

- [产品与信息架构说明](./docs/product-spec.md)
- [内容结构与录入规范](./docs/content-guide.md)
- [GitHub Pages 部署与维护手册](./docs/deployment-guide.md)

## 目录结构

```text
.
├─ .github/workflows/      # GitHub Pages 工作流
├─ docs/                   # 面向协作的文档
├─ public/                 # 静态资源
├─ src/
│  ├─ components/          # 页面组件
│  ├─ content/             # Markdown 项目内容
│  ├─ data/                # JSON 内容源
│  ├─ layouts/             # 布局
│  ├─ lib/                 # 内容与路径工具
│  ├─ pages/               # 路由页面
│  └─ styles/              # 全局样式
└─ astro.config.mjs        # Astro 配置，含 GitHub Pages base 处理
```

## 当前边界

- v1 不做后台 CMS
- v1 不做博客
- v1 不做联系表单
- v1 不做多语言
- v1 默认使用 GitHub Pages 域名

后续如果需要加自定义域名、CMS 或博客，请先更新 `docs/product-spec.md` 再动手实现，避免协作时偏离当前版本目标。
