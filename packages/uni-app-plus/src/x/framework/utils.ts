import { loadFontFace } from '../api'

/**
 * 解析 css 中的 @font-face 规则，并加载字体
 * todo: 目前 ios 中的样式后续可能会调整为 map
 * @param styles 用户自定义样式
 * @param global 是否全局生效
 */
export function loadFontFaceByStyles(
  styles: Record<string, any>,
  global: boolean
) {
  const fontFaces = styles['@FONT-FACE'] as Record<string, any> | undefined
  if (!fontFaces) return

  Object.keys(fontFaces).forEach((keys) => {
    const value = fontFaces[keys] as Record<string, any>
    const fontFamily = value['fontFamily'] as string | null
    const fontWeight = value['fontWeight'] as string | null
    const fontStyle = value['fontStyle'] as string | null
    const fontVariant = value['fontVariant'] as string | null
    const src = value['src'] as string | null

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
