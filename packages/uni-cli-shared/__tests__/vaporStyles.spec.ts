import fs from 'fs'
import path from 'path'
import postcss from 'postcss'

const styles = path.resolve(__dirname, '../../uni-h5/style')
const read = (file: string) => fs.readFileSync(path.join(styles, file), 'utf8')

describe('Web Vapor 独立组件样式', () => {
  test('框架入口不再全量加载组件内部样式', () => {
    const code = read('framework/uvue-vapor.css')
    expect(code).not.toMatch(/^\s*@import\b/m)
    for (const selector of [
      '.uni-input-input',
      '.uni-textarea-textarea',
      '.uni-scroll-view-content',
      '.uni-video-slots',
      '.uni-toast',
      '[uni-ad]',
      '[uni-ad-content-page',
      '[uni-ad-draw',
      '[uni-camera',
      '[uni-live-player',
      '[uni-live-pusher',
    ]) {
      expect(code).not.toContain(selector)
    }
    expect(code).toContain('div:where([uni-view])')
    expect(code).toContain('span:where([uni-text])')
    expect(code).toContain('img:where([uni-image])')
  })

  test('页面通过 flex 占满导航栏和 tabBar 剩余空间，dialogPage 覆盖窗口', () => {
    const code = read('framework/uvue-vapor.css')
    const rules = new Map<string, Record<string, string>>()
    postcss.parse(code).walkRules((rule) => {
      for (const selector of rule.selectors) {
        const normalizedSelector = selector.replace(/\s+/g, ' ')
        const declarations = rules.get(normalizedSelector) || {}
        rule.walkDecls((decl) => {
          declarations[decl.prop] = decl.value
        })
        rules.set(normalizedSelector, declarations)
      }
    })
    expect(rules.get('html')).toMatchObject({
      'overscroll-behavior': 'none',
      overflow: 'hidden',
    })
    expect(rules.get('body')).toMatchObject({
      display: 'flex',
      'flex-direction': 'column',
      'overscroll-behavior': 'none',
      overflow: 'hidden',
    })
    for (const selector of ['#app', 'uni-app', 'uni-app uni-main']) {
      expect(rules.get(selector)).toMatchObject({
        display: 'flex',
        'flex-direction': 'column',
        flex: '1',
        'min-height': '0',
      })
    }
    expect(rules.get('uni-app uni-content')).toMatchObject({
      flex: '1',
      height: 'auto',
      'min-height': '0',
    })
    expect(rules.get('uni-app uni-page-body')).toMatchObject({
      position: 'relative',
      flex: '1',
      'min-height': '0',
      'overflow-y': 'auto',
      'overflow-x': 'hidden',
    })
    for (const property of [
      'top',
      'right',
      'bottom',
      'left',
      'overscroll-behavior',
    ]) {
      expect(rules.get('uni-app uni-page-body')).not.toHaveProperty(property)
    }
    expect(rules.get('uni-app uni-page-head')).toMatchObject({
      position: 'relative',
      'flex-shrink': '0',
      'z-index': '998',
    })
    expect(rules.get('uni-app uni-page-head .uni-page-head')).toMatchObject({
      position: 'absolute',
      top: '0',
      right: '0',
      left: '0',
    })
    expect(rules.get('uni-app uni-page-refresh')).toMatchObject({
      position: 'absolute',
      'z-index': '997',
      'pointer-events': 'none',
    })
    expect(
      rules.get("uni-app uni-page-head[uni-page-head-type='default']")?.order
    ).toBe('-2')
    for (const position of ['top', 'bottom']) {
      expect(
        rules.get(`uni-app uni-tabbar.uni-tabbar-${position}`)
      ).toMatchObject({
        position: 'relative',
        'flex-shrink': '0',
      })
    }
    expect(rules.get('uni-app uni-tabbar.uni-tabbar-top')?.order).toBe('-1')
    for (const position of ['top', 'bottom']) {
      expect(
        rules.get(`uni-app uni-tabbar.uni-tabbar-${position} .uni-tabbar`)
      ).toMatchObject({
        position: 'absolute',
        right: '0',
        left: '0',
      })
    }
    expect(
      rules.get(
        'uni-app.uni-app--showtabbar.uni-app--tabbar-top uni-page-refresh:not([data-type])'
      )?.top
    ).toContain('--tab-bar-height')
    expect(rules.get('uni-app uni-page-body[data-type]')).toMatchObject({
      '--background-color-content': 'transparent',
      'background-color': 'var(--background-color-content)',
      position: 'fixed',
      'z-index': 'calc(999 + var(--uni-dialog-page-index, 0) * 3)',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    })
    expect(code).not.toContain('data-page-head')
    expect(rules.has('uni-app uni-page-head[data-type]')).toBe(false)
    expect(rules.get('uni-app uni-page-refresh[data-type]')?.position).toBe(
      'fixed'
    )
    expect(rules.get('uni-app uni-page-refresh[data-type]')?.['z-index']).toBe(
      'calc(1000 + var(--uni-dialog-page-index, 0) * 3)'
    )
    expect(code).not.toContain('uni-page-wrapper')
    expect(code).not.toContain('uni-page-body::after')
  })

  test.each(['input', 'textarea', 'video'])(
    '%s 独立样式保留旧实现的内部规则，不再依赖旧 CSS',
    (name) => {
      const oldFile =
        name === 'video'
          ? path.join(styles, 'video.css')
          : path.resolve(__dirname, '../../uni-components/style', name + '.css')
      const code = read(`vapor/${name}.css`)
      expect(code).not.toMatch(/^\s*@import\b/m)
      expect(code).not.toMatch(new RegExp(`^uni-${name}[\\s{[,:]`, 'm'))
      // 比较内部规则，防止只复制覆盖样式而遗漏控件结构、滚动条或视频控制栏。
      const selectors = new Set<string>()
      const normalize = (selector: string) =>
        selector.replace(/"/g, "'").replace(/\s+/g, ' ').trim()
      postcss.parse(code).walkRules((rule) => {
        selectors.add(normalize(rule.selector))
      })
      postcss.parse(fs.readFileSync(oldFile, 'utf8')).walkRules((rule) => {
        if (rule.selector.startsWith('.')) {
          expect(selectors.has(normalize(rule.selector))).toBe(true)
        }
      })
    }
  )

  test('单层 scroll-view 只保留滚动条样式，不覆盖宿主尺寸和 flex 布局', () => {
    const code = read('vapor/scroll-view.css')
    postcss.parse(code).walkRules((rule) => {
      if (rule.selector.includes('::')) return
      rule.walkDecls((decl) => {
        expect(decl.prop).not.toMatch(
          /^((min-|max-)?(width|height)$|display$|flex-|align-|justify-)/
        )
      })
    })
  })

  test.each(['input', 'textarea'])(
    '%s 保留选区、placeholder 和暗色样式',
    (name) => {
      const code = read(`vapor/${name}.css`)
      expect(code).toContain('@layer uni-field-selection')
      expect(code).toContain('[data-uni-selection]::selection')
      expect(code).toContain('@media (prefers-color-scheme: dark)')
      expect(code).toContain('color: #757575')
      expect(code).toContain('caret-color: inherit')
      expect(code).toContain('cursor: inherit')
    }
  )
})
