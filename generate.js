import fs from 'fs'
import path from 'path'
import * as sass from 'sass'
import { fileURLToPath } from 'url'

// 获取当前文件的目录
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 移除可能存在的BOM
function removeBOM(content) {
	if (content.charCodeAt(0) === 0xfeff) {
		return content.slice(1)
	}
	return content
}

// 写入文件内容
function writeFileContent(filePath, content) {
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
function compileSass(sassFilePath) {
	return new Promise((resolve, reject) => {
		sass.render(
			{
				file: sassFilePath,
				charset: false,
				outputStyle: 'compressed', // 压缩CSS输出
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

// 主函数
async function main() {
	// 源文件路径
	const sourcePath = path.resolve(__dirname, 'src/template.js')
	// 目标文件路径
	const targetPath = path.resolve(__dirname, 'dist/index.js')
	// 主Sass文件路径
	const mainSassPath = path.resolve(__dirname, 'src/scss/index.scss')
	// 特殊处理文件夹路径
	const specialHandlingPath = path.resolve(__dirname, 'src/specialHandling')

	try {
		// 如果dist目录不存在，则创建它
		const distDirPath = path.dirname(targetPath)
		if (!fs.existsSync(distDirPath)) {
			fs.mkdirSync(distDirPath, { recursive: true })
		}

		// 读取文件内容
		let sourceContent = fs.readFileSync(sourcePath, 'utf8')
		// 移除可能存在的BOM
		sourceContent = removeBOM(sourceContent)
		// 编译主Sass文件
		const cssContent = await compileSass(mainSassPath)

		// 获取特殊处理文件夹下所有的子文件夹名称
		const specialHandlingFolders = await fs.promises.readdir(specialHandlingPath)

		// 生成特殊处理的代码
		const specialHandlingCode = []
		for (const folder of specialHandlingFolders) {
			const sassFilePath = path.join(specialHandlingPath, folder, 'index.scss')
			const sassContent = await compileSass(sassFilePath)
			specialHandlingCode.push(
				`if (endsWithDomain("${folder}")) {\n` + `  css += \`${sassContent}\`;\n` + `}`
			)
		}

		// 替换字符串
		const resultContent = sourceContent
			.replace('_font_mian', cssContent)
			.replace(
				'@insertSpecialHandling',
				`@insertSpecialHandling\n${specialHandlingCode.join('\n')}`
			)

		// 写入结果到目标文件
		await writeFileContent(targetPath, resultContent)
	} catch (err) {
		console.error(err)
	}
}

// 执行主函数
main()
