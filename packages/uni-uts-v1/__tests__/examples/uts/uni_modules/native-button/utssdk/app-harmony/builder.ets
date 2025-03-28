@Builder
export function buildButton(params: ESObject) {
  Button(params.text, { type: ButtonType.Normal, stateEffect: true })
    .borderRadius(8)
    .backgroundColor(0x317aff)
    .onClick(() => {
        console.log('params 123',params)
        param.onClick()
    })
    .attributeModifier(params.modifier)
}
