import { renderSSRTemplate } from '../src/cli/server'

describe('renderSSRTemplate', () => {
  test('仅替换原模板中的标记，保留占位样式和应用内容中的字面值', () => {
    const headMeta =
      '<style>input::placeholder{--label:"<!--preload-links--> <!--app-html--> <!--app-context--> $&"}</style>'
    const preloadLinks = '<link rel="stylesheet" href="/main.css">'
    const appHtml = '<div>$& <!--app-context--></div>'
    const appContext = '<script>window.__uniSSR = {}</script>'
    const template =
      '<head><title></title><!--head-meta--><!--preload-links--></head><body><!--app-html--><!--app-context--></body>'

    expect(
      renderSSRTemplate(template, {
        title: '示例',
        headMeta,
        preloadLinks,
        appHtml,
        appContext,
      })
    ).toBe(
      `<head><link rel="icon" href="data:," />\n<title>示例</title>${headMeta}${preloadLinks}</head><body>${appHtml}${appContext}</body>`
    )
  })

  test('保留模板现有图标，各标记仅替换首次出现的位置', () => {
    const template =
      '<link rel="icon" href="/favicon.ico"><title>原标题</title><!--head-meta--><!--head-meta-->'

    expect(
      renderSSRTemplate(template, {
        title: '新标题',
        headMeta: '',
        preloadLinks: '',
        appHtml: '',
        appContext: '',
      })
    ).toBe(
      '<link rel="icon" href="/favicon.ico"><title>新标题</title><!--head-meta-->'
    )
  })
})
