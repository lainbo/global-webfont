// ==UserScript==
// @name 全局自定义字体
// @namespace    http://tampermonkey.net/
// @version      1.11
// @description  修改为自定义字体
// @license      MIT
// @author       Lainbo
// @grant        GM_addStyle
// @updateURL    https://github.com/lainbo/global-webfont/raw/main/dist/index.user.js
// @downloadURL  https://github.com/lainbo/global-webfont/raw/main/dist/index.user.js
// @match        *://*/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiPjxwYXRoIGQ9Ik0xNTAyLjQzIDIwMDBINDk3LjU3QzIyMi43NyAyMDAwIDAgMTc3Ny4yMyAwIDE1MDIuNDNWNDk3LjU3QzAgMjIyLjc3IDIyMi43NyAwIDQ5Ny41NyAwaDEwMDQuODdDMTc3Ny4yMyAwIDIwMDAgMjIyLjc3IDIwMDAgNDk3LjU3djEwMDQuODdjMCAyNzQuNzktMjIyLjc3IDQ5Ny41Ni00OTcuNTcgNDk3LjU2eiIvPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Ik00MTIgNjYyLjM0YzAtMTU1LjI1IDEyNC4yLTI3OS40NSAyNzkuNDUtMjc5LjQ1aDg0Mi4yMmMzMS4wNSAwIDU0LjM0IDIzLjI5IDU0LjM0IDU0LjM0cy0yMy4yOSA1NC4zNC01NC4zNCA1NC4zNGgtNDI2LjkzbC0zMS4wNSA5Ny4wMy0xMjAuMzIgMzUzLjE5LTM0LjkzIDEwOC42N0w4MDQgMTM5MmMtMzQuOTMgMTAwLjkxLTg1LjM5IDE2My4wMS0xNDMuNiAxOTQuMDYtNTguMjIgMzEuMDUtMTE2LjQ0IDMxLjA1LTE1NS4yNSAzMS4wNWgtNy43NmMtMzQuOTMgMC02Mi4xLTI3LjE3LTYyLjEtNjIuMXMyNy4xNy02Mi4xIDYyLjEtNjIuMWM0Mi42OSAwIDczLjc0IDAgMTAwLjkxLTE1LjUyIDIzLjI5LTExLjY0IDU4LjIyLTQyLjY5IDg5LjI3LTEyOC4wOCAxOS40MS01OC4yMiA1OC4yMi0xNzAuNzcgMTA0Ljc5LTI5OC44NWwzNC45My0xMDguNjcgMTMxLjk2LTM5MiAxOS40MS01OC4yMkg2OTEuNDVjLTk3LjAzIDAtMTY2Ljg5IDczLjc0LTE2Ni44OSAxNjYuODkgMCAzNC45My0yNy4xNyA2Mi4xLTU4LjIyIDYyLjFTNDEyIDY5My4zOSA0MTIgNjYyLjM0eiIvPjxwYXRoIGQ9Ik01MDUuMTUgMTY0Mi4xMWgtNy43NmMtNDguODQgMC04Ny4xLTM4LjI2LTg3LjEtODcuMXMzOC4yNi04Ny4xIDg3LjEtODcuMWM0MC40MSAwIDY3LjEgMCA4OC41MS0xMi4yM2wxLjIyLS42NWMxNi4xNC04LjA3IDQ3LjU3LTMzLjYgNzYuODQtMTEzLjk1bDkyLjc2LTI2NS42MiA1Mi40Mi0xNTguNjcgNjAuNDktMTc5LjEyIDY1Ljg0LTE5NS41OC4wNy0uMjEgOC40NC0yNS4zMUg2OTEuNDVjLTgwLjg5IDAtMTQxLjg5IDYxLTE0MS44OSAxNDEuODkgMCAyMy4xNi04LjY3IDQ0Ljk4LTI0LjQgNjEuNDMtMTUuNiAxNi4zMS0zNy4wNCAyNS42Ny01OC44MiAyNS42Ny00My43NSAwLTc5LjM0LTM3LjMzLTc5LjM0LTgzLjIyIDAtODEuNzYgMzEuNTUtMTU4LjM0IDg4LjgzLTIxNS42MnMxMzMuODYtODguODMgMjE1LjYyLTg4LjgzaDg0Mi4yMmMyMS42OSAwIDQxLjc2IDguMTEgNTYuNDkgMjIuODUgMTQuNzMgMTQuNzMgMjIuODUgMzQuNzkgMjIuODUgNTYuNDlzLTguMTEgNDEuNzYtMjIuODUgNTYuNDljLTE0LjczIDE0LjczLTM0Ljc5IDIyLjg1LTU2LjQ5IDIyLjg1aC00MDguNjhsLTI1LjU4IDc5Ljk0LTIzLjIyIDY5Ljk4LTg1LjE2IDI1MC4zMS01Mi43NSAxNTguNjctNTIuMzcgMTUzLjgtNTguMjYgMTcwLjljLTM1LjIzIDEwMS43Ny04Ny41MyAxNzEuNzMtMTU1LjQ3IDIwNy45Ny02My43NSAzMy45Ny0xMjUuOSAzMy45Ny0xNjcuMDMgMzMuOTd6bTEwNC45NS0xNDIuNjhjLTMyLjc2IDE4LjQ4LTY4LjA4IDE4LjQ4LTExMi43MSAxOC40OC0yMS4xNSAwLTM3LjEgMTUuOTUtMzcuMSAzNy4xczE1Ljk1IDM3LjEgMzcuMSAzNy4xaDcuNzZjMzguMzEgMCA5MC43OCAwIDE0My40OC0yOC4xMSA1Ni40Ni0zMC4xMSAxMDAuNzgtOTAuNzMgMTMxLjc0LTE4MC4xOGw1OC4xNy0xNzAuNjIgNTguMjYtMTcwLjkgNS44MS0xNi44NWgxODQuNzJjMTcuMjcgMCAyOS4zNC0xMi4wNiAyOS4zNC0yOS4zNHMtMTIuMDYtMjkuMzQtMjkuMzQtMjkuMzRIOTE5LjU3bDEyLjMyLTMzLjYxYzM0LjA1LTkyLjg2IDY1Ljk2LTE4OS4yMiA5Ni44Mi0yODIuNDJsMjMuMjEtNjkuOTQgMzYuNTYtMTE0LjI2aDQ0NS4xOGMxNy4yNyAwIDI5LjM0LTEyLjA2IDI5LjM0LTI5LjM0cy0xMi4wNi0yOS4zNC0yOS4zNC0yOS4zNEg2OTEuNDVDNTUxLjE0IDQwNy44OSA0MzcgNTIyLjAzIDQzNyA2NjIuMzRjMCAxOC4zMiAxMy4xNiAzMy4yMiAyOS4zNCAzMy4yMiAxOC4wMSAwIDMzLjIyLTE2Ljk5IDMzLjIyLTM3LjEgMC01Mi4wOSAxOS4yNi0xMDAuMzYgNTQuMjQtMTM1LjkxIDM1LjUyLTM2LjEgODQuNC01NS45OCAxMzcuNjUtNTUuOThoMzIxLjg5bC0zMC4zNCA5MS02Ni4wOSAxOTYuMzMtNjUuODQgMTk1LjU4LTUuNiAxNy4zSDYzNy4xMWMtMTcuMjcgMC0yOS4zNCAxMi4wNi0yOS4zNCAyOS4zNHMxMi4wNiAyOS4zNCAyOS4zNCAyOS4zNGgxOTAuOTRsLTEyLjIgMzMuNTQtMTA0LjU3IDI5OC4yMS0uMjIuNjRjLTI2LjczIDczLjUxLTYwLjcgMTIxLjE0LTEwMC45NiAxNDEuNTh6Ii8+PHBhdGggZD0iTTEzMzEgMTA3NUg2MzVjLTQ0LjE4IDAtODAtMzUuODItODAtODBzMzUuODItODAgODAtODBoNjk2YzQ0LjE4IDAgODAgMzUuODIgODAgODBzLTM1LjgyIDgwLTgwIDgweiIvPjwvZz48L3N2Zz4=

// ==/UserScript==

;(function () {
  // eslint-disable-next-line prefer-const
  let cssContent = '@font-face{font-family:Cus_Emoji;src:local("Twemoji Mozilla"),local("Segoe UI Emoji"),local("Segoe UI Symbol"),local("Apple Color Emoji"),local("Noto Color Emoji");unicode-range:U+1F000-1F644,U+203C-3299}html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}body,html,html:lang(zh) body,html:lang(cmn) body,html:lang(de) body,html:lang(nl) body,html:lang(en) body,html:lang(nb) body,html:lang(no) body,html:lang(is) body,html:lang(da) body,html:lang(sv) body,html:lang(pt) body,html:lang(es) body,html:lang(fr) body,html:lang(it) body,html:lang(ro) body,html:lang(lv) body,html:lang(lt) body,html:lang(pl) body,html:lang(cs) body,html:lang(sk) body,html:lang(bs) body,html:lang(hr) body,html:lang(sr) body,html:lang(bg) body,html:lang(sl) body,html:lang(ru) body,html:lang(uk) body,html:lang(be) body,html:lang(el) body,html:lang(hu) body,html:lang(et) body,html:lang(fi) body,html:lang(tr) body,html:lang(id) body,html:lang(ms) body{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}html:lang(ja) body{font-family:"Inter Variable Text","Noto Sans JP","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}html:lang(ko) body{font-family:"Inter Variable Text","Noto Sans KR","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}pre,code,kbd,samp{font-family:"JetBrainsMono Nerd Font Mono","Cascadia Mono",Menlo,Monaco,Consolas,"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}button,input,keygen,optgroup,select,textarea{font-family:inherit}@font-face{font-family:"verdana";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"Microsoft YaHei";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"微软雅黑";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"-apple-system";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"TwitterChirp";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"PingFang SC";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}@font-face{font-family:"Helvetica";src:local("HarmonyOS Sans SC"),local("Cus_Emoji"),local("Noto Sans SC"),local("Noto Sans JP"),local("Noto Sans KR"),local("Noto Naskh Arabic"),local("Segoe UI"),local("Roboto"),local("Helvetica"),local("Arial"),local("sans-serif")}'
  const fuzzyMatchValueOfMap = (mapMain, key) => {
    const foundEntry = Array.from(mapMain.entries()).find(([k]) => key.includes(k))
    return foundEntry ? foundEntry[1] : null
  }
  const domainCssMap = new Map([['baidu.com', '*{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}'], ['bilibili.com', '.lite-room,.header-channel,.channel-menu-mini,.bb-comment,.list-item .user .text-con,.video-page-card-small .card-box .info .title,.video-info-v1 .video-title,.carousel-tool,.bili-comment.browser-pc *,.bili-dyn-content,.bili-rich-text,.bili-dyn-item,.bili-video-card__info--bottom,.bili-header,.bili-video-card__info--tit,.bili-video-card__info--tit a,.browser-pc *,.video-page-card-small .card-box .info .title,.up-info-v1 .up-info_right .name,.first-line-title,.pl__head,.pl__title{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['bing.com', 'h1,h2,h3,.b_searchboxForm{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['feishu.cn', '#zh-CN button,#zh-CN input,#zh-CN select,#zh-CN textarea,.markdown-body{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}.code-block-content,.markdown-body code,.markdown-body pre{font-family:"JetBrainsMono Nerd Font Mono","Cascadia Mono",Menlo,Monaco,Consolas,"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['google.com', '*{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif}h3,textarea,#result-stats{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['jd.com', '.itemInfo-wrap .sku-name{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['jd.hk', '.itemInfo-wrap .sku-name{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['mail.qq.com', 'td,input,button,select,body,.qm_con_body_content,.tcolor,.sub_title{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['miit.gov.cn', '*{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['mp.weixin.qq.com', '.wx_wap_page{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['nxboom.com', 'body,h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['outlook.live.com', '[class*=body-],[class*=root-],[class*=link-],[class*=title-],[class*=subText-],[class*=linkIsSelected-]{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif,controlIcons !important}'], ['taobao.com', 'body,button,input,select,textarea{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['tmall.com', 'body,button,input,select,textarea{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}'], ['vercel.com', '[class^=__variable]{--font-sans: Inter Variable Text, HarmonyOS Sans SC !important;--font-mono: JetBrainsMono Nerd Font Mono !important}'], ['wikiwand.com', '#article-root{--font-sans: HarmonyOS Sans SC !important;--font-serif: Noto Serif SC !important}'], ['yuque.com', '.doc-title,.ne-engine,.ne-viewer-body,.ne-toc-view,.DocReader-module_title_fXOQi>h1,.catalogTreeItem-module_title_snpKw{font-family:"Inter Variable Text","HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}.cm-line,ne-code-content{font-family:"JetBrainsMono Nerd Font Mono","Cascadia Mono",Menlo,Monaco,Consolas,"HarmonyOS Sans SC",Cus_Emoji,"Noto Sans SC","Noto Sans JP","Noto Sans KR","Noto Naskh Arabic","Segoe UI",Roboto,Helvetica,Arial,sans-serif !important}']])
  const domainCss = fuzzyMatchValueOfMap(domainCssMap, window.location.hostname)
  if (domainCss) cssContent += domainCss

  // 通过GM_addStyle添加样式,并且返回是否成功
  function addStyleWithGM (cssText) {
    const isGMAddStyleAvailable = typeof GM_addStyle !== 'undefined'
    if (isGMAddStyleAvailable) {
      GM_addStyle(cssText)
    }
    return isGMAddStyleAvailable
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
