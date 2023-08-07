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
  let css = ''
  css += '{$1}'
  const endsWithDomain = domain => {
    const url = window.location.hostname
    return url.endsWith(domain)
  }
  // {$2}

  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(css)
  } else {
    const styleNode = document.createElement('style')
    styleNode.appendChild(document.createTextNode(css))
    ;(document.querySelector('head') || document.documentElement).appendChild(styleNode)
  }
})()
