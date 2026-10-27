@Builder
export function buildView(params: ESObject) {
  Stack({alignContent: Alignment.Center})
    .width('100%')
    .height('100%')
    .backgroundColor(params.backgroundColor)
    .attributeModifier(params.attributeUpdater)
}
