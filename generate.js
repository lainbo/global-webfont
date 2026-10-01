import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileFunction } from 'node:vm'
import * as sass from 'sass'

const root = path.dirname(fileURLToPath(import.meta.url))
const resolve = (...parts) => path.join(root, ...parts)

function compileCss (file) {
  return sass.compile(file, { charset: false, style: 'compressed' }).css
}

async function main () {
  const template = await readFile(resolve('src/assets/template.js'), 'utf8')
  const icon = (await readFile(resolve('src/assets/icon.txt'), 'utf8')).trim()
  const css = compileCss(resolve('src/scss/index.scss'))
  const folders = await readdir(resolve('src/specified'), { withFileTypes: true })
  const sites = []

  for (const folder of folders.filter(entry => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const domains = folder.name.split(',').map(domain => domain.trim())
    const siteCss = compileCss(resolve('src/specified', folder.name, 'index.scss'))
    sites.push({ domains, css: siteCss })
  }

  const replacements = {
    "'{{GLOBAL_CSS}}'": JSON.stringify(css),
    '[] /* SITE_STYLES */': JSON.stringify(sites),
    '{{ICON}}': icon
  }
  const script = template.replace(/'\{\{GLOBAL_CSS\}\}'|\[\] \/\* SITE_STYLES \*\/|\{\{ICON\}\}/g, marker => replacements[marker])

  // 在覆盖安装产物前检查生成代码，CSS 中的引号和反斜杠由 JSON 序列化处理。
  compileFunction(script, [], { filename: 'index.user.js' })
  await mkdir(resolve('dist'), { recursive: true })
  await writeFile(resolve('dist/index.user.js'), script)
  console.log('脚本已生成：', resolve('dist/index.user.js'))
}

main().catch(error => {
  console.error('生成失败：', error)
  process.exitCode = 1
})
