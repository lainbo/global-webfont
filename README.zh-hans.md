# Global-webfont
一个生成JavaScript代码的工具，用于生成一段固执己见的Tampermonkey脚本代码，以用来改变网站的默认字体
+ 不加载任何网络字体，只进行CSS声明上的修改
+ 所有声明的字体，需要保证自己电脑中已经正确安装了这个字体，否则不会生效

### 使用
1. 在`src/scss/var.scss`文件中，将各种语种所对应的字体名称，修改为你喜欢的
2. 执行`npm run build`
3. 将`dist`目录下的index.js内容，复制到Tampermonkey的代码框中

### 处理特殊情况
一些网站可能对某些DOM强行写了样式，导致默认的全局处理CSS优先级不够而无法覆盖字体。

对于这些无法生效的网站，可以在`specified`文件夹里面新建一个子文件夹，子文件夹的名称为无法生效网站的域名。

比如: Youtube的所有评论字体不生效，此时我们需要
1. 在`specified`文件夹下新建文件夹并起名为`youtube.com`，这将匹配`*.youtube.com`
2. 在`youtube.com`文件夹中新建`index.scss`
3. 多个网站若使用相同的样式，可以将它们的网址字符列在一起，并以英文逗号分隔来命名文件夹，例如用“youtube.com,google.com”作为文件夹名
4. 使用浏览器的开发工具来确定，是哪个特定DOM的CSS导致全局字体无效
5. 在刚才新建的`index.scss`中写能够覆盖其本身样式的css/scss代码
6. 执行`npm run build`
7. 将`dist`目录下的index.js内容，复制到Tampermonkey的代码框中

### 如果你恰好喜欢我的字体方案，那么你需要安装var.scss中的字体以保证最佳使用体验
