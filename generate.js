import fs from 'fs'
import path from 'path'
import * as sass from 'sass'
import { fileURLToPath } from 'url'

// 获取当前文件的目录
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 写入文件内容
function writeFileContent (filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// 编译Sass到CSS
function compileSass (sassFilePath) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: sassFilePath,
        charset: false,
        outputStyle: 'compressed' // 压缩CSS输出
      },
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.css.toString())
        }
      }
    )
  })
}

// 读取文件内容
function readFileContent (path) {
  return fs.readFileSync(path, 'utf8')
}

// 主函数
async function main () {
  // 源文件路径
  const sourcePath = path.resolve(__dirname, 'src/assets/template.js')
  // 图标路径
  const iconPath = path.resolve(__dirname, 'src/assets/icon.txt')
  // 目标文件路径
  const targetPath = path.resolve(__dirname, 'dist/index.js')
  // 主Sass文件路径
  const mainSassPath = path.resolve(__dirname, 'src/scss/index.scss')
  // 特殊处理文件夹路径
  const specifiedPath = path.resolve(__dirname, 'src/specified')

  // 如果dist目录不存在，则创建它
  const distDirPath = path.dirname(targetPath)
  if (!fs.existsSync(distDirPath)) {
    fs.mkdirSync(distDirPath, { recursive: true })
  }

  // 读取模板内容
  const sourceContent = readFileContent(sourcePath)
  // 编译主Sass文件
  const cssContent = await compileSass(mainSassPath)

  // 获取特殊处理文件夹下所有的子文件夹名称
  const specifiedFolders = await fs.promises.readdir(specifiedPath)

  // 生成特殊处理的代码
  const mapEntries = []
  for (const folder of specifiedFolders) {
    const sassFilePath = path.join(specifiedPath, folder, 'index.scss')
    const sassContent = await compileSass(sassFilePath)
    mapEntries.push(`['${folder}', '${sassContent}']`)
  }
  function createSpaces (frequency) {
    return ' '.repeat(frequency)
  }

  // 生成特殊处理网站的代码
  const mapInitCode =
`const domainCssMap = new Map([${mapEntries.join(', ')}])
${createSpaces(2)}const domainCss = fuzzyMatchValueOfMap(domainCssMap, window.location.hostname)
${createSpaces(2)}if (domainCss) cssContent += domainCss`

  // 定义替换标记，并在模板内容中替换它们
  const iconFlag = '{$1}'
  const cssTextFlag = '{$2}'
  const specifiedFlag = '// {$3}'
  const iconBase64Content = readFileContent(iconPath)
  const resultContent = sourceContent
    .replace(cssTextFlag, cssContent)
    .replace(specifiedFlag, mapInitCode)
    .replace(iconFlag, iconBase64Content)

  // 写入结果到目标文件
  await writeFileContent(targetPath, resultContent)
}

// 执行主函数
try {
  await main()
  console.log('脚本文件生成成功, 文件位于', path.resolve(__dirname, 'dist/index.js'))
} catch (error) {
  console.log('生成失败，原因是: ', error)
}
