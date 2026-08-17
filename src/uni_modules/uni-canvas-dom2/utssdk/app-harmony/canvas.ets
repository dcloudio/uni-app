@Builder
export function buildCanvas(params: ESObject) {
  Canvas(params.context).attributeModifier(params.modifier).clip(true).background(params.background)
}

export const HarmonyCanvasRenderingContext2D = CanvasRenderingContext2D
