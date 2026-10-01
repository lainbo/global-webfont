const source = await (await fetch('../dist/index.user.js')).text()
const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(source))
const report = {
  date: new Date().toISOString(),
  browser: navigator.userAgent,
  scriptSha256: [...new Uint8Array(digest)].map(n => n.toString(16).padStart(2, '0')).join(''),
  checks: []
}

function check (name, passed, actual) {
  report.checks.push({ name, passed, actual })
  const item = document.createElement('li')
  item.className = passed ? 'pass' : 'fail'
  item.textContent = `${passed ? '通过' : '失败'}：${name}（${actual}）`
  document.querySelector('#results').append(item)
}

async function run (hostname, useGM, covered) {
  const frame = document.createElement('iframe')
  frame.title = `${hostname} / ${useGM ? 'GM_addStyle' : 'DOM'}`
  const loaded = new Promise(resolve => frame.addEventListener('load', resolve, { once: true }))
  frame.srcdoc = `<!doctype html><html lang="zh-CN"><style>
    body { padding: 16px; }
    .site-text, .token, input, textarea { font-family: Georgia; }
    .strong { font-weight: 700; } .italic { font-style: italic; }
    input::placeholder { font-family: Georgia; }
  </style><body>
    <p class="site-text" id="text">中文 / English @name 0123456789 !?.,:;%&amp;() — “标点” 🚀</p>
    <span class="site-text strong" id="bold">Bold 123 中文</span>
    <span class="site-text italic" id="italic">Italic 456</span>
    <span id="inline" style="font-family: Georgia">Inline 789 !@#</span>
    <input class="site-text" id="input" placeholder="搜索 Search 123"><textarea class="site-text" id="textarea">输入 Text 456</textarea>
    <pre><code><span class="token" id="code">const count = 123;</span></code></pre>
    <svg width="16" height="16"><path d="M0 0 L16 16 M16 0 L0 16" stroke="black"/></svg>
  </body></html>`
  document.querySelector('#fixtures').append(frame)
  await loaded
  const doc = frame.contentDocument
  const win = frame.contentWindow
  const inject = css => {
    const style = doc.createElement('style')
    style.textContent = css
    doc.head.append(style)
  }
  // 执行完整生成产物，只替换域名输入；样式解析、布局和字体加载由浏览器完成。
  // eslint-disable-next-line no-new-func
  const execute = new Function('window', 'document', 'GM_addStyle', source)
  execute({ location: { hostname } }, doc, useGM ? inject : undefined)
  const lateStyle = doc.createElement('style')
  lateStyle.textContent = '.site-text { font-family: Georgia; }'
  doc.head.append(lateStyle)
  const dynamic = doc.createElement('span')
  dynamic.id = 'dynamic'
  dynamic.className = 'site-text'
  dynamic.textContent = '动态内容 987,654.32%'
  doc.body.append(dynamic)
  await doc.fonts.ready
  const font = (id, pseudo) => win.getComputedStyle(doc.getElementById(id), pseudo).fontFamily
  const configured = win.getComputedStyle(doc.body).fontFamily
  const label = `${hostname} / ${useGM ? 'GM' : 'DOM'}`
  for (const id of ['text', 'bold', 'italic', 'inline', 'input', 'textarea', 'dynamic']) {
    check(`${label} ${id}`, font(id) === (covered ? configured : 'Georgia'), font(id))
  }
  check(`${label} placeholder`, font('input', '::placeholder') === (covered ? configured : 'Georgia'), font('input', '::placeholder'))
  check(`${label} 代码子节点`, font('code').startsWith('"JetBrains Mono"') || font('code').startsWith('JetBrains Mono'), font('code'))
  check(`${label} 字重与斜体`, win.getComputedStyle(doc.getElementById('bold')).fontWeight === '700' && win.getComputedStyle(doc.getElementById('italic')).fontStyle === 'italic', '700 / italic')
  check(`${label} SVG 图标`, doc.querySelector('svg path').getAttribute('d') === 'M0 0 L16 16 M16 0 L0 16', 'path 保持完整')

  if ((hostname === 'x.com' && useGM) || hostname === 'example.org') {
    try {
      const localFont = await new FontFace('FontCoverageProbe', 'local("MiSansVF")', { weight: '150 700' }).load()
      doc.fonts.add(localFont)
      check('MiSans VF 本地可变字体可加载', true, localFont.status)
      const canvas = doc.createElement('canvas')
      canvas.width = 1000
      canvas.height = 70
      const context = canvas.getContext('2d')
      for (const sample of ['0123456789', '!@#$%&*()_+-=.,:;?', 'English中文']) {
        const render = (family, weight) => {
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.font = `${weight} 32px ${family}`
          context.fillText(sample, 5, 50)
          const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
          let ink = 0
          for (let i = 3; i < pixels.length; i += 4) ink += pixels[i]
          return { image: canvas.toDataURL(), width: context.measureText(sample).width, ink }
        }
        for (const weight of [150, 300, 400, 425, 450, 500, 700]) {
          const family = covered ? font('text') : '"Microsoft YaHei"'
          await doc.fonts.load(`${weight} 32px ${family}`, sample)
          const effectiveWeight = weight === 400 ? 425 : weight
          const actual = render(family, weight)
          const expected = render('FontCoverageProbe', effectiveWeight)
          const baseline = render('FontCoverageProbe', 400)
          const heavier = render('FontCoverageProbe', 450)
          check(`${hostname} 可变字形与字重 ${weight} → ${effectiveWeight} / ${sample}`,
            actual.image === expected.image && (weight !== 400 || (actual.ink > baseline.ink && actual.ink < heavier.ink)),
            JSON.stringify({ width: actual.width, expectedWidth: expected.width, ink: actual.ink, ink400: baseline.ink, ink450: heavier.ink }))
        }
      }
    } catch (error) {
      check('MiSans VF 本地可变字体可加载', false, error.message)
    }
  }
}

try {
  for (const [hostname, useGM, covered] of [
    ['x.com', true, true], ['x.com', false, true], ['mobile.x.com', true, true],
    ['twitter.com', true, true], ['mobile.twitter.com', true, true],
    ['notx.com', true, false], ['x.com.example.org', true, false], ['example.org', false, false]
  ]) await run(hostname, useGM, covered)
} catch (error) {
  check('运行浏览器验证', false, error.stack)
}
const passed = report.checks.filter(check => check.passed).length
report.passed = passed === report.checks.length
const summary = document.querySelector('#summary')
summary.textContent = `${passed}/${report.checks.length} 项通过。脚本 SHA-256：${report.scriptSha256}`
summary.className = report.passed ? 'pass' : 'fail'
const button = document.querySelector('#download')
button.disabled = false
button.addEventListener('click', () => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' }))
  link.download = 'global-webfont-browser-report.json'
  link.click()
  URL.revokeObjectURL(link.href)
})
