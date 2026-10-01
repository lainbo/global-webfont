# Global-webfont

生成使用本地字体的 Tampermonkey（油猴）脚本。字体名称在 `src/scss/var.scss` 配置，安装产物为 `dist/index.user.js`。脚本本身不下载字体，所选字体需要先安装到电脑上。

## 使用

1. 修改 `src/scss/var.scss` 中的字体族名。当前 `$chinese` 为 `MiSans VF`，`$english: $chinese` 默认跟随中文字体，代码为 `JetBrains Mono`。中英文一起换字体时只需修改 `$chinese`；需要不同的英文字体时再单独设置 `$english`。
2. 使用项目指定的 pnpm 8：`pnpm install --frozen-lockfile`。
3. 执行 `pnpm run build` 和 `pnpm run check`。
4. 将 `dist/index.user.js` 的完整内容替换到油猴编辑器中并保存。
5. 刷新目标网页。编辑源码、执行构建都不会自动更新浏览器中已安装的脚本。

`package.json` 的 `packageManager` 固定了 pnpm 版本。支持该字段的 pnpm/Corepack 会选择对应版本；也可执行 `pnpm dlx pnpm@8.15.9 install --frozen-lockfile`。`pnpm run sass:watch` 仅生成 `dist/index.css` 预览，不更新安装产物。

MiSans VF 的字重轴支持 150–700 之间的连续值。当前 `$regular-weight: 425` 将网页普通字重 400 映射到实际字重 425，其他字重保持原值，超出范围时限制在字体支持的边界。设为 400 可恢复按 400 渲染。HONOR Sans CN 按已安装的九个静态字重文件匹配，`$regular-weight` 仅用于可变字体。

## 字体规则

- `var.scss`：配置本地字体名称。
- `rules.scss`：组装去重后的正文、代码和回退字体列表。
- `index.scss`：页面默认字体、语言规则、表单继承和代码字体。
- `aliases.scss`：为既有站点使用的常见字体名提供本地替换资源。
- `src/specified/`：按完整域名或子域名追加站点覆盖。

X 的规则同时匹配 `x.com`、`twitter.com` 及其子域名。正文、用户名、数字、标点、输入框和占位符直接使用配置的字体列表；后来加载的帖子也会自动匹配。`pre/code/kbd/samp` 及其子节点使用代码字体。站点覆盖设置 `font-family`，保留字号、斜体和 SVG 图形；MiSans 普通正文通过字体资源映射到 425，粗体继续匹配其原有字重。

## CSS 的几个边界

1. **继承只在元素没有自己的声明时起作用。** 设置 `body` 的字体，甚至在 `body` 上加 `!important`，都不能覆盖子元素自己声明的字体。站点规则需要匹配实际文字元素。
2. **`font-family` 按字符回退。** 浏览器从前往后寻找包含所需字形的字体。`$english` 排在 `$chinese` 前面；如果英文字体也包含汉字，它同样可能负责显示汉字。字体名称出现在计算样式中也不代表该字体真的被加载，需检查开发者工具中的“呈现的字体”。
3. **`local()` 使用字体全名或 PostScript 名。** 它和 `font-family` 的族名查找不同。MiSans 配置使用族名 `MiSans VF`，`aliases.scss` 使用 PostScript 名 `MiSansVF` 加载本地可变字体。vivo 的资源名和 HONOR 各静态字重的名称也在内部处理。
4. **`@font-face src` 是资源候选列表。** 浏览器选择首个可用资源，不会把多个 `local()` 的字形合并。替换规则为拉丁字符、数字和常用西文标点单独声明范围，使它们使用英文字体配置。
5. **同名 `@font-face` 会参与字体匹配。** 站点与脚本的定义可能因字重、样式、字符范围和声明顺序选择不同资源，不能靠同名替换保证覆盖所有网站。X 使用直接的 `font-family: … !important` 覆盖。
6. **`font-style: normal oblique` 无效。** 样式描述符需要选择 `normal`、`italic` 或合法的 `oblique` 角度范围。替换规则使用 `normal`。HONOR 静态字体逐字重声明资源；可变字体使用字重范围声明，实际值限制在字体支持的轴范围内。可变字体的普通字重由 `$regular-weight` 定义；网页显式设置 `font-variation-settings` 时会覆盖资源中的轴值。新增其他静态字体时，同样需要按其实际文件定义各字重。

全局规则保留常见字体替换和已有站点适配。所有网站使用 `* !important` 容易破坏图标字体，所以强制覆盖限定在相应站点。网页中的图片文字、Canvas、封闭 Shadow DOM，以及内联 `font-family: … !important` 不保证被普通样式表覆盖。

## 添加站点规则

在 `src/specified/` 下创建域名目录并添加 `index.scss`。多个域名用逗号分隔，例如 `x.com, twitter.com`。匹配采用域名边界，`x.com.example.org` 和 `notx.com` 不会匹配 `x.com`。多个目录匹配时按目录名排序追加。

```scss
@use "../../scss/rules.scss" as rules;

.article-text {
  font-family: rules.$en_zh_rules !important;
}
```

CSS 自定义属性需要插值，例如 `--font-sans: #{rules.$en_zh_rules};`。添加规则后重新构建、替换油猴脚本并刷新网页。

## 浏览器验证

构建完成后，在项目根目录执行：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

用 Chrome 打开 `http://127.0.0.1:8765/tests/font-coverage.html`。页面执行完整生成脚本，在真实 iframe 中检查 CSS 覆盖、动态内容、表单、代码和域名匹配，并比较中英文、数字、标点在 150、300、400、425、450、500、700 字重下的像素和宽度，核验普通正文映射到 425，并且其笔画覆盖量介于 400 与 450 之间。域名由测试参数提供；这部分验证不代表已经访问过对应网站。字形验证要求安装 MiSans VF，并使用默认的 `$regular-weight: 425`。

点击“下载验证报告”可保存带脚本 SHA-256、浏览器版本和每项结果的 JSON 工件。真实 X 页面还应检查开发者工具中的计算样式和呈现字体，并在刷新及站内导航后观察效果。

CSS 字体匹配依据：[W3C CSS Fonts](https://www.w3.org/TR/css-fonts-4/)。构建使用项目锁定的 Sass 1.69.5 [现代 JS API](https://sass-lang.com/documentation/js-api/)。
