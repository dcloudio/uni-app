@Builder
export function buildCanvas(params: ESObject) {
  Canvas(params.context)
    .attributeModifier(params.modifier)
    .clip(true)
    .background(params.background)
    .onReady(() => {
      params.onReady()
    })
}

export const HarmonyCanvasRenderingContext2D = CanvasRenderingContext2D
