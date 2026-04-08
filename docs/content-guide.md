# 内容结构与录入规范

## 1. 内容源总览

### `src/data/site.json`

负责站点级配置：

- 标题
- 描述
- 主题色
- 导航
- 首页 CTA
- 页脚文案

### `src/data/profile.json`

负责个人信息：

- 姓名
- 标题与副标题
- 所在地
- 求职状态
- 邮箱
- GitHub
- 社交链接
- 个人介绍段落
- 能力聚焦
- 技能分组
- 经历
- 教育
- 联系提示

### `src/content/projects/*.md`

负责项目内容。每个 Markdown 文件会生成一个项目详情页。

## 2. 项目文件字段

参考模板：`src/content/projects/_project-template.md`

必填字段：

- `slug`
- `title`
- `summary`
- `role`
- `status`
- `year`
- `stack`
- `challenge`
- `solution`
- `outcome`

可选字段：

- `featured`
- `draft`
- `highlights`
- `links`

说明：

- `slug` 用于生成 URL，必须唯一
- `draft: true` 的项目不会展示在网站上
- `featured: true` 的项目会优先出现在首页
- `links.url` 必须是完整 URL

## 3. 新增项目的推荐流程

1. 复制 `src/content/projects/_project-template.md`
2. 改名为真实项目文件，例如 `todo-dashboard.md`
3. 去掉 `draft: true` 或改成 `false`
4. 将所有占位文案替换为真实信息
5. 运行 `npm run check`
6. 运行 `npm run build`

## 4. 真实性规则

- 不填虚构公司名、岗位名、项目数据
- 没有的内容宁可留空，也不要“看起来像有”
- 如果项目仍在整理，可设置为 `draft: true`
- 占位内容必须让协作者一眼看出它是占位

## 5. 协作约束

- 补内容优先改 `site.json`、`profile.json` 和项目 Markdown
- 不要为了新增一个项目去修改页面模板
- 如果字段结构要变更，先更新本文件和 `docs/product-spec.md`
