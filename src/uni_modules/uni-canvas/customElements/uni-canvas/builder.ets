@Builder
export function buildCanvas(params: ESObject) {
  Canvas(params.context).attributeModifier(params.modifier).clip(true)
}

export const HarmonyCanvasRenderingContext2D = CanvasRenderingContext2D
