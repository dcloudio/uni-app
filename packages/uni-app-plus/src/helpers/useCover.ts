import { type Ref, computed, onBeforeUnmount, reactive, watch } from 'vue'
import type { CustomEventTrigger } from '@dcloudio/uni-components'
import { type Position, useNative } from './useNative'
import { formatLog } from '@dcloudio/uni-shared'

let id = 0

export function useCover(
  rootRef: Ref<HTMLElement | null>,
  trigger: CustomEventTrigger,
  content: { src?: string; text?: string }
) {
  const { position, hidden, onParentReady } = useNative(rootRef)
  let cover: PlusNativeObjView
  let requestStyleUpdate: () => void
  onParentReady((parentPosition) => {
    const viewPosition = computed(() => {
      const object: Position = {} as Position
      for (const key in position) {
        let val = position[key as keyof Position]
        const valNumber = parseFloat(val)
        const parentValNumber = parseFloat(
          parentPosition[key as keyof Position]
        )
        if (key === 'top' || key === 'left') {
          val = Math.max(valNumber, parentValNumber) + 'px'
        } else if (key === 'width' || key === 'height') {
          const base = key === 'width' ? 'left' : 'top'
          const parentStart = parseFloat(parentPosition[base])
          const viewStart = parseFloat(position[base])
          const diff1 = Math.max(parentStart - viewStart, 0)
          const diff2 = Math.max(
            viewStart + valNumber - (parentStart + parentValNumber),
            0
          )
          val = Math.max(valNumber - diff1 - diff2, 0) + 'px'
        }
        object[key as keyof Position] = val as any
      }
      return object
    })

    const baseStyle: Array<keyof CSSStyleDeclaration> = [
      'borderRadius',
      'borderColor',
      'borderWidth',
      'backgroundColor',
    ]
    const textStyle: Array<keyof CSSStyleDeclaration> = [
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'color',
      'textAlign',
      'lineHeight',
      'fontSize',
      'fontWeight',
      'textOverflow',
      'whiteSpace',
    ]
    const imageStyle: Array<keyof CSSStyleDeclaration> = []
    const textAlign = { start: 'left', end: 'right' }
    function updateStyle(style: Record<keyof CSSStyleDeclaration, any>) {
      const computedStyle = getComputedStyle(rootRef.value as HTMLElement)
      baseStyle.concat(textStyle, imageStyle).forEach((key) => {
        style[key] = computedStyle[key]
      })
      return style
    }
    const style = reactive(updateStyle({} as CSSStyleDeclaration))
    let request: null | number = null
    requestStyleUpdate = function () {
      if (request) {
        cancelAnimationFrame(request)
      }
      request = requestAnimationFrame(() => {
        request = null
        updateStyle(style)
      })
    }
    window.addEventListener('updateview', requestStyleUpdate)

    function getTagPosition() {
      const position: Partial<Position> = {}
      for (const key in position) {
        let val = position[key as keyof Position]!
        if (key === 'top' || key === 'left') {
          val =
            Math.min(parseFloat(val) - parseFloat(parentPosition[key]), 0) +
            'px'
        }
        position[key as keyof Position] = val as any
      }
      return position
    }

    const tags = computed(() => {
      const position: Position = getTagPosition() as Position
      const tags: PlusNativeObjViewDrawTagStyles[] = [
        {
          tag: 'rect',
          position,
          rectStyles: {
            color: style.backgroundColor,
            radius: style.borderRadius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
          },
        },
      ]

      if ('src' in content) {
        if (content.src) {
          tags.push({
            tag: 'img',
            position,
            src: content.src,
          })
        }
      } else {
        const lineSpacing =
          parseFloat(style.lineHeight) - parseFloat(style.fontSize)
        let width =
          parseFloat(position.width) -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight)
        width = width < 0 ? 0 : width
        let height =
          parseFloat(position.height) -
          parseFloat(style.paddingTop) -
          lineSpacing / 2 -
          parseFloat(style.paddingBottom)
        height = height < 0 ? 0 : height
        tags.push({
          tag: 'font',
          position: {
            top: `${
              parseFloat(position.top) +
              parseFloat(style.paddingTop) +
              lineSpacing / 2
            }px`,
            left: `${
              parseFloat(position.left) + parseFloat(style.paddingLeft)
            }px`,
            width: `${width}px`,
            height: `${height}px`,
          },
          textStyles: {
            align:
              textAlign[style.textAlign as keyof typeof textAlign] ||
              style.textAlign,
            color: style.color,
            decoration: 'none',
            lineSpacing: `${lineSpacing}px`,
            margin: '0px',
            overflow: style.textOverflow,
            size: style.fontSize,
            verticalAlign: 'top',
            weight: style.fontWeight,
            whiteSpace: style.whiteSpace,
          },
          text: content.text,
        })
      }

      return tags
    })

    cover = new plus.nativeObj.View!(
      `cover-${Date.now()}-${id++}`,
      viewPosition.value,
      tags.value
    )
    if (__DEV__) {
      console.log(formatLog('Cover', cover.id, viewPosition.value, tags.value))
    }
    plus.webview.currentWebview().append(cover)
    if (hidden.value) {
      cover.hide()
    }

    cover.addEventListener('click', () => {
      trigger('click', {} as Event, {})
    })

    watch(
      () => hidden.value,
      (val) => {
        cover[val ? 'hide' : 'show']()
      }
    )
    watch(
      () => viewPosition.value,
      (val) => {
        cover.setStyle(val)
      },
      { deep: true }
    )
    watch(
      () => tags.value,
      () => {
        cover.reset()
        cover.draw(tags.value)
      },
      { deep: true }
    )
  })
  onBeforeUnmount(() => {
    if (cover) {
      cover.close()
    }
    if (requestStyleUpdate) {
      window.removeEventListener('updateview', requestStyleUpdate)
    }
  })
}
