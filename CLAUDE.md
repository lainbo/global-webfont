# 项目指南

这是一个 SCSS → CSS → Tampermonkey 用户脚本项目。字体来自本地安装，字体族名配置位于 `src/scss/var.scss`。`$english` 默认引用 `$chinese`；HONOR 各字重及 vivo、MiSans 的 `local()` 资源名转换在 `aliases.scss` 内处理。

## 命令

- 包管理器：`package.json` 固定的 pnpm 8.15.9，依赖按 `pnpm-lock.yaml` 安装。
- `pnpm run build`：生成 `dist/index.user.js`。
- `pnpm run check`：检查构建器、脚本模板和生成脚本语法。
- `pnpm run sass:watch`：只输出预览 CSS，不更新油猴产物。
- 浏览器验证方法见 `README.zh-hans.md`，结果可导出为 JSON。

## 实现

`generate.js` 使用 Sass 现代 API 编译主样式及按名称排序的站点目录，以 JSON 序列化嵌入脚本模板。生成脚本通过语法检查后才写入 dist；构建失败返回非零退出码。

`src/assets/template.js` 在 document-start 注入全局 CSS 和所有匹配域名的 CSS。匹配仅接受完整域名或点分隔子域名。优先使用 GM_addStyle，没有该 API 时通过 DOM 注入。

- `rules.scss`：去重的字体列表。
- `index.scss`：默认字体、日/韩页面规则、表单继承、代码及子节点的等宽字体。
- `aliases.scss`：常见字体名的本地替换，拉丁字符和其他字符分开声明。
- `src/specified/<域名>/index.scss`：站点覆盖，多域名以逗号分隔。

## 修改注意事项

以浏览器真实计算样式、呈现字体和 CSS 匹配结果为依据。body 的字体无法覆盖子元素自己的声明；同名 @font-face 也无法保证战胜网站的字体匹配。src 的多个 local() 是资源候选，不能提供逐字符回退。font-family 列表才提供逐字符回退。

保留代码等宽字体和图标。X 的 SVG 图标允许直接覆盖全站 font-family；其他站点采用明确的文字选择器，避免破坏图标字体。普通样式表有 Shadow DOM、Canvas、图片文字和内联 !important 等边界。

默认使用 MiSans VF，字重轴范围 150–700；`$regular-weight: 425` 将网页普通字重 400 映射到 425。HONOR 静态资源按各文件的实际字重分别声明。`$regular-weight` 仅控制可变字体的普通字重映射；font-style: normal oblique 属于无效语法。

站点需要 CSS 变量时使用 SCSS 插值：`--font-sans: #{rules.$en_zh_rules};`。

修改后重新构建并更新 `dist/index.user.js`。油猴中已安装的脚本需要单独替换、保存和刷新页面。详细说明以 `README.zh-hans.md` 为准。
