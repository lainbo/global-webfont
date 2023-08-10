// ==UserScript==
// @name 全局自定义字体
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  修改为自定义字体
// @license      MIT
// @author       Lainbo
// @grant        GM_addStyle
// @match        *://*/*
// @run-at       document-start
// @icon         {$1}
// ==/UserScript==

;(function () {
  // eslint-disable-next-line prefer-const
  let cssContent = '{$2}'
  const fuzzyMatchValueOfMap = (mapMain, key) => {
    const foundEntry = Array.from(mapMain.entries()).find(([k, v]) => key.includes(k))
    return foundEntry ? foundEntry[1] : null
  }
  // {$3}

  // 通过GM_addStyle添加样式,并且返回是否成功
  function addStyleWithGM (cssText) {
    if (typeof GM_addStyle !== 'undefined') {
      GM_addStyle(cssText)
      return true
    } else {
      return false
    }
  }

  // 通过DOM添加样式
  function addStyleWithDOM (cssText) {
    const styleNode = document.createElement('style')
    styleNode.appendChild(document.createTextNode(cssText));
    (document.querySelector('head') || document.documentElement).appendChild(styleNode)
  }

  // 执行，并且判断是否成功
  const resultsOfEnforcement = addStyleWithGM(cssContent)

  // 如果不成功，则使用DOM方式
  if (!resultsOfEnforcement) {
    addStyleWithDOM(cssContent)
  }
})()