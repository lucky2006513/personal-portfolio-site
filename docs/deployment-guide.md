# GitHub Pages 部署与维护手册

## 1. 当前部署方案

- 平台：GitHub Pages
- 发布分支：`gh-pages`
- 发布内容：Astro 构建输出 `dist/`
- 发布脚本：`scripts/publish-gh-pages.mjs`

## 2. 当前发布命令

```bash
npm run publish:pages
```

这个命令会自动完成以下动作：

1. 根据远程仓库地址推断 `owner/repo`
2. 用正确的 GitHub Pages `base` 重新构建站点
3. 把 `dist/` 发布到 `gh-pages` 分支
4. 将仓库 Pages 源保持为 `gh-pages` 分支
5. 触发一次 Pages build

## 3. base 路径策略

项目在 `astro.config.mjs` 中自动处理 GitHub Pages 的 `base`：

- 如果仓库名是 `username.github.io`，站点以根路径部署
- 如果仓库名是普通仓库，例如 `personal-portfolio-site`，站点会自动使用 `/personal-portfolio-site` 作为 base

这意味着：

- 本地开发可以直接访问 `/`
- 发布脚本构建时会自动适配仓库名

## 4. 自定义域名

v1 不启用自定义域名。如果以后需要：

- 在仓库的 Pages 设置中绑定域名
- 在 DNS 服务商处添加对应记录
- 在部署环境中设置 `SITE_URL`

## 5. 维护建议

- 每次改完内容都至少运行 `npm run check`
- 发布前再运行一次 `npm run build`
- 如果要正式发布，直接运行 `npm run publish:pages`
- 如果新增路由或资源，优先检查是否正确使用了 base 路径

## 6. 为什么不用仓库内工作流

- 当前 GitHub 认证令牌缺少修改 workflow 文件所需的额外 scope
- 为了确保这次能真实上线，仓库改为使用 `gh-pages` 分支发布
- 如果以后补齐对应 scope，可以再迁移回 GitHub Actions 自动部署

## 7. 故障排查

### 页面样式丢失

- 检查 `src/styles/global.css` 是否仍然保留 `@import "tailwindcss";`
- 检查 `astro.config.mjs` 中是否仍然注册了 `@tailwindcss/vite`

### 子路径打不开

- 检查内部链接是否通过 `withBase()` 生成
- 检查发布脚本构建时是否成功读取远程仓库名

### 项目详情页没生成

- 检查 Markdown 文件是否放在 `src/content/projects/`
- 检查文件名是否不是以下划线开头
- 检查 `draft` 是否仍为 `true`
