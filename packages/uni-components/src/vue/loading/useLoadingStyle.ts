import { type Ref, onMounted, ref, watchEffect } from 'vue'

const coefficientMap: Record<string, number> = {
  medium: 1,
  thick: 2,
}

export function useLoadingStyle(
  targetElement: Ref<HTMLElement | null>,
  bold: Ref<boolean>
) {
  const loadingSize = ref('16px')
  const loadingBorderWidth = ref('0px')

  const calculateLoadingWidth = (element: HTMLElement, bold: boolean) => {
    if (!element) return

    const computedStyle = window.getComputedStyle(element)

    const width = parseFloat(computedStyle.width)
    const height = parseFloat(computedStyle.height)

    const coefficient = coefficientMap[bold ? 'thick' : 'medium']
    const minSide = Math.min(width, height)

    // (最小边 / 16) * 系数
    const calculatedWidth = (minSide / 16) * coefficient

    loadingSize.value = `${minSide}px`
    loadingBorderWidth.value = `${calculatedWidth}px`
  }

  onMounted(() => {
    watchEffect(() => {
      calculateLoadingWidth(targetElement.value, bold.value)
    })
  })

  return {
    size: loadingSize,
    borderWidth: loadingBorderWidth,
  }
}
