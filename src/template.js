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
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDE1IDE1Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0yLjUgNC41QzIuNSAzLjA5OSAzLjU5OSAyIDUgMmg3LjQ5OWEuNS41IDAgMCAxIC4wMDEgMUg4LjY5MmwtLjI4Ny44NTVBMTg4Ny4zOSAxODg3LjM5IDAgMCAxIDcuMzQzIDdIOC41YS41LjUgMCAwIDEgMCAxSDcuMDA0YTI4Ni4xMiAyODYuMTIgMCAwIDEtMS4wNDYgMy4wMzljLS4zMjIuOS0uNzUgMS40NDctMS4yOSAxLjczOWMtLjUwNS4yNzMtMS4wMjYuMjcyLTEuMzg0LjI3MkgzLjI1YS41NS41NSAwIDAgMSAwLTEuMWMuMzkyIDAgLjY1NC0uMDEuODk0LS4xNGMuMjItLjExOS41MTEtLjM5NS43NzgtMS4xNDJjLjE4NS0uNTE3LjUzMi0xLjUyNy45Mi0yLjY2OEg0LjVhLjUuNSAwIDAgMSAwLTFoMS42ODJhMTM1MC4xMTggMTM1MC4xMTggMCAwIDAgMS4xOC0zLjQ5Nkw3LjUzMyAzSDVjLS44NDkgMC0xLjUuNjUxLTEuNSAxLjVhLjUuNSAwIDAgMS0xIDBaIi8+PC9zdmc+
// ==/UserScript==

;(function () {
  // eslint-disable-next-line prefer-const
  let cssContent = '{$1}'
  const fuzzyMatchValueOfMap = (mapMain, key) => {
    const foundEntry = Array.from(mapMain.entries()).find(([k, v]) => key.includes(k))
    return foundEntry ? foundEntry[1] : null
  }
  // {$2}

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
