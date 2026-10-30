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

  test.each(['input', 'textarea', 'scroll-view', 'video'])(
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
