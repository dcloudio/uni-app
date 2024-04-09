import { type Ref, computed, onMounted } from 'vue'
import { useOn } from '@dcloudio/uni-components'
import { hexToRgba } from '../../../helpers/hexToRgba'

export function usePageHeadTransparentBackgroundColor(backgroundColor: string) {
  const { r, g, b } = hexToRgba(backgroundColor)
  return `rgba(${r},${g},${b},0)`
}

export function usePageHeadTransparent(
  headRef: Ref<null>,
  {
    id,
    navigationBar: { titleColor, coverage, backgroundColor },
  }: UniApp.PageRouteMeta
) {
  let A = 0
  const rgb = computed(() => hexToRgba(backgroundColor!))
  const offset = parseInt(coverage!)
  let titleElem: HTMLDivElement
  let transparentElemStyle: CSSStyleDeclaration
  const iconElemsPaths: SVGPathElement[] = []
  const borderRadiusElemsStyles: CSSStyleDeclaration[] = []
  const oldColors: string[] = []
  onMounted(() => {
    const $el = headRef.value as unknown as HTMLDivElement
    transparentElemStyle = $el.style
    titleElem = $el.querySelector('.uni-page-head__title')!
    const borderRadiusElems = $el.querySelectorAll(
      '.uni-page-head-btn'
    ) as NodeListOf<HTMLElement>
    const iconSvgElems = $el.querySelectorAll(
      'svg path'
    ) as NodeListOf<SVGPathElement>
    for (let i = 0; i < iconSvgElems.length; i++) {
      iconElemsPaths.push(iconSvgElems[i])
    }
    for (let i = 0; i < borderRadiusElems.length; i++) {
      const borderRadiusElem = borderRadiusElems[i]
      oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor)
      borderRadiusElemsStyles.push(borderRadiusElem.style)
    }
  })
  useOn(id + '.onPageScroll', ({ scrollTop }: { scrollTop: number }) => {
    const alpha = Math.min(scrollTop / offset, 1)
    if (alpha === 1 && A === 1) {
      return
    }
    if (alpha > 0.5 && A <= 0.5) {
      iconElemsPaths.forEach(function (iconElemPath) {
        iconElemPath.setAttribute('fill', titleColor!)
      })
    } else if (alpha <= 0.5 && A > 0.5) {
      iconElemsPaths.forEach(function (iconElemPath) {
        iconElemPath.setAttribute('fill', '#fff')
      })
    }
    A = alpha
    // TODO 暂时仅处理背景色
    if (titleElem) {
      titleElem.style.opacity = alpha as unknown as string
    }
    const bg = rgb.value
    transparentElemStyle.backgroundColor = `rgba(${bg.r},${bg.g},${bg.b},${alpha})`
    borderRadiusElemsStyles.forEach(function (borderRadiusElemStyle, index) {
      const oldColor = oldColors[index]
      const rgba = oldColor.match(/[\d+\.]+/g)!
      rgba[3] = ((1 - alpha) *
        ((rgba.length === 4 ? rgba[3] : 1) as number)) as unknown as string
      borderRadiusElemStyle.backgroundColor = `rgba(${rgba})`
    })
  })
}
