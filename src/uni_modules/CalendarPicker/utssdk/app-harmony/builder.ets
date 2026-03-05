@Builder
export function buildCalendarPicker(params: ESObject) {
  CalendarPicker({ hintRadius: params.hintRadius, selected: params.selected })
    .edgeAlign(params.alignType, { dx: params.offsetX, dy: params.offsetY })
    .textStyle({
      color: params.color,
      font: { size: params.fontSize, weight: params.fontWeight, style: params.fontStyle }
    })
    .onChange((value) => {
      params.onChange(value)
    })
    .attributeModifier(params.attributeUpdater)
}
