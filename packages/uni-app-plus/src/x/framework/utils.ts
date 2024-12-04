import { loadFontFace } from '../api/ui/loadFontFace'

/**
 * 解析 css 中的 @font-face 规则，并加载字体
 * todo: 目前 ios 中的样式后续可能会调整为 map
 * @param styles 用户自定义样式
 * @param global 是否全局生效
 */
export function loadFontFaceByStyles(
  styles: Array<Record<string, any>>,
  global: boolean
) {
  // TODO will fix by otto
  styles = Array.isArray(styles) ? styles : [styles]
  // 遍历数组，找到 @font-face 规则
  const fontFaceStyle = [] as Array<Record<string, any>>
  styles.forEach((style) => {
    if (style['@FONT-FACE']) {
      fontFaceStyle.push(...style['@FONT-FACE'])
    }
  })
  if (fontFaceStyle.length === 0) return

  fontFaceStyle.forEach((style) => {
    const fontFamily = style['fontFamily'] as string | null
    const fontWeight = style['fontWeight'] as string | null
    const fontStyle = style['fontStyle'] as string | null
    const fontVariant = style['fontVariant'] as string | null
    const src = style['src'] as string | null

    if (fontFamily != null && src != null) {
      loadFontFace({
        global,
        family: fontFamily,
        source: src,
        desc: {
          style: fontStyle as string,
          weight: fontWeight as string,
          variant: fontVariant as string,
        },
      })
    } else {
      console.warn('loadFontFace: fail, font-family or src is null')
    }
  })
}
