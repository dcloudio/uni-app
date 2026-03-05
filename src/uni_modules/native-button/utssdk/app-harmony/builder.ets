@Builder
export function buildButton(params: ESObject) {
  Button(params.text, { type: ButtonType.Normal, stateEffect: true })
    .borderRadius(8)
    .backgroundColor(0x317aff)
    .onClick(() => {
        params.onClick()
    })
    .attributeModifier(params.attributeUpdater)
}
