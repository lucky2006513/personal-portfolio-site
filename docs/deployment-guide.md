# GitHub Pages 部署与维护手册

## 1. 当前部署方案

- 平台：GitHub Pages
- 构建方式：GitHub Actions
- 发布目录：Astro 构建输出 `dist/`
- 工作流文件：`.github/workflows/deploy.yml`

## 2. 首次发布步骤

1. 确保代码已推送到 GitHub 仓库默认分支 `main`
2. 打开仓库 `Settings -> Pages`
3. 将 Source 设置为 `GitHub Actions`
4. 等待 `Deploy to GitHub Pages` 工作流执行完成

## 3. base 路径策略

项目在 `astro.config.mjs` 中自动处理 GitHub Pages 的 `base`：

- 如果仓库名是 `username.github.io`，站点以根路径部署
- 如果仓库名是普通仓库，例如 `personal-portfolio-site`，站点会自动使用 `/personal-portfolio-site` 作为 base

这意味着：

- 本地开发可以直接访问 `/`
- GitHub Pages 构建时会自动适配仓库名

## 4. 自定义域名

v1 不启用自定义域名。如果以后需要：

- 在仓库的 Pages 设置中绑定域名
- 在 DNS 服务商处添加对应记录
- 在部署环境中设置 `SITE_URL`

## 5. 维护建议

- 每次改完内容都至少运行 `npm run check`
- 发布前再运行一次 `npm run build`
- 如果新增路由或资源，优先检查是否正确使用了 base 路径

## 6. 故障排查

### 页面样式丢失

- 检查 `src/styles/global.css` 是否仍然保留 `@import "tailwindcss";`
- 检查 `astro.config.mjs` 中是否仍然注册了 `@tailwindcss/vite`

### 子路径打不开

- 检查内部链接是否通过 `withBase()` 生成
- 检查 GitHub Actions 构建时是否带上了仓库环境变量

### 项目详情页没生成

- 检查 Markdown 文件是否放在 `src/content/projects/`
- 检查文件名是否不是以下划线开头
- 检查 `draft` 是否仍为 `true`
