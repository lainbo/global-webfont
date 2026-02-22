# 项目指南

## 概述

这是一个 Tampermonkey（油猴）用户脚本项目，用于在所有网站上将字体替换为用户自定义的本地字体。不加载任何网络字体，仅通过 CSS 声明重新映射本地已安装的字体。

## 技术栈

- SCSS → CSS（通过 `sass` 编译）
- 无打包工具，构建脚本为 `generate.js`
- 包管理器：**pnpm**

## 构建命令

```bash
pnpm run build          # 编译 SCSS 并生成 dist/index.user.js
pnpm run sass:watch     # 开发时监视 SCSS 变化，输出到 dist/index.css（仅预览用）
```

`dist/index.css` 是 `sass:watch` 的产物，可能与 `dist/index.user.js` 不同步，以 `pnpm run build` 的输出为准。

## 项目结构

```
src/
├── scss/
│   ├── var.scss          # 字体变量定义（用户在此修改字体名）
│   ├── rules.scss        # 字体规则链组合
│   ├── languages.scss    # 语言选择器生成（html:lang(xx) body）
│   └── index.scss        # 主入口：全局规则 + @font-face 劫持 mixin
├── specified/            # 站点特定覆盖（每个子文件夹名 = 域名）
│   ├── douyin.com/
│   ├── bilibili.com/
│   └── ...
└── assets/
    ├── template.js       # 用户脚本模板（含 {$1} {$2} // {$3} 占位符）
    └── icon.txt          # 图标 base64
dist/
├── index.user.js         # 最终产物（安装到 Tampermonkey 的脚本）
└── index.css             # sass:watch 预览产物（gitignore）
generate.js               # 构建脚本
```

## 构建流程

`generate.js` 执行以下步骤：
1. 编译 `src/scss/index.scss` → 压缩 CSS 字符串
2. 遍历 `src/specified/` 下所有子文件夹，逐个编译为压缩 CSS
3. 读取 `src/assets/template.js`
4. 替换占位符：`{$1}` → 图标 base64，`{$2}` → 主 CSS，`// {$3}` → 域名 CSS Map 代码
5. 写入 `dist/index.user.js`

## 字体替换的三层机制

### 第一层：全局 font-family 声明

在 `index.scss` 中对 `body`、`html` 和所有语言选择器直接设置 `font-family`。

### 第二层：@font-face 劫持（核心机制）

通过 `$replace-chinese-font-list` 和 `generate-font-faces` mixin，为常见字体名（微软雅黑、PingFang SC 等）生成同名 `@font-face`，将 `src` 指向用户的目标字体。浏览器解析到这些字体名时，会通过劫持的 `@font-face` 加载用户字体。

这个机制在**字体解析层**工作，不受 CSS 优先级影响——即使网站用 `!important` 声明了 `font-family: "Microsoft YaHei"`，劫持仍然生效。

### 第三层：站点特定覆盖

对于第一层和第二层都无法覆盖的网站（如加载了 web font 的站点），在 `src/specified/` 下编写针对性 CSS。运行时通过域名模糊匹配追加注入。

## 重要的 CSS 知识点

### @font-face 劫持的局限性

- `@font-face` 劫持**无法对抗**网站自己通过 `url()` 加载的 web font。如果网站定义了自己的 `@font-face` 并通过网络加载字体文件，该 `@font-face` 可能覆盖劫持规则。
- 遇到这种情况，必须使用站点特定覆盖（第三层），用 `font-family: ... !important` 在 CSS 属性层面直接替换。

### @font-face 中 local() 的限制

- `local()` 只查找**系统安装的字体**，不能引用同一样式表中其他 `@font-face` 定义的虚拟字体。
- 因此 `rules.scss` 中有两套规则：`$chinese_rules`（用于 `font-family` 属性，可包含 `Cus_Emoji`）和 `$chinese_rules_for_src`（用于 `@font-face` 的 `src`，排除了 `Cus_Emoji` 和 `sans-serif`）。

### 可变字体的 font-weight 声明

`generate-font-faces` mixin 默认添加 `font-weight: 1 999` 和 `font-style: normal oblique`。这是因为目标字体 MiSans VF 是可变字体。如果不声明 `font-weight` 范围，浏览器只认为该 font face 覆盖 weight 400，粗体文字会使用合成加粗而非原生字重。如果未来更换为非可变字体，需要调整 mixin 调用时传入的参数。

### CSS 自定义属性的 SCSS 插值

在 SCSS 中给 CSS 自定义属性（`--xxx`）赋值时，必须使用插值语法 `#{}`，否则 SCSS 变量会被当作字面字符串输出：
```scss
// 错误：输出字面量 "rules.$en_zh_rules"
--fr-font-family: rules.$en_zh_rules;

// 正确：输出变量的实际值
--fr-font-family: #{rules.$en_zh_rules};
```

## 添加站点特定覆盖

1. 在 `src/specified/` 下创建以域名命名的文件夹（多域名用逗号+空格分隔，如 `taobao.com, tmall.com`）
2. 在该文件夹中创建 `index.scss`
3. 引入规则：`@use "../../scss/rules.scss" as rules;`
4. 编写覆盖 CSS，根据需要使用 `!important`
5. 运行 `pnpm run build` 重新构建

对于使用哈希类名的 SPA 站点（如抖音），推荐使用 `* { font-family: rules.$en_zh_rules !important; }` 全局覆盖。

## 修改字体

编辑 `src/scss/var.scss` 中的变量即可。所有规则和输出都会自动更新。
