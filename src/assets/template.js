// ==UserScript==
// @name 全局自定义字体
// @namespace    http://tampermonkey.net/
// @version      1.20
// @description  修改为自定义字体
// @license      MIT
// @author       Lainbo
// @grant        GM_addStyle
// @updateURL    https://github.com/lainbo/global-webfont/raw/main/dist/index.user.js
// @downloadURL  https://github.com/lainbo/global-webfont/raw/main/dist/index.user.js
// @match        *://*/*
// @run-at       document-start
// @icon         {{ICON}}
// ==/UserScript==

;(function () {
  const globalCss = '{{GLOBAL_CSS}}'
  const siteStyles = [] /* SITE_STYLES */
  const hostname = window.location.hostname
  const css = [globalCss, ...siteStyles
    .filter(({ domains }) => domains.some(domain => hostname === domain || hostname.endsWith('.' + domain)))
    .map(({ css }) => css)].join('\n')

  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css)
  } else {
    const inject = () => {
      const style = document.createElement('style')
      style.textContent = css
      ;(document.head || document.documentElement).appendChild(style)
    }
    if (document.documentElement) inject()
    else document.addEventListener('DOMContentLoaded', inject, { once: true })
  }
})()
