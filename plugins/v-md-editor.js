// markdown轉html套件: v-md-editor
// import VMdEditor from '@kangc/v-md-editor'; //編輯器
// import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'

// 套件 Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-cshtml'

VMdPreview.use(vuepressTheme, {
  Prism
})

// 顯示代碼行數
VMdPreview.use(createLineNumbertPlugin())
// 快速複製代碼
VMdPreview.use(createCopyCodePlugin())
// emoji
VMdPreview.use(createEmojiPlugin())

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VMdPreview)
})