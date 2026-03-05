import { window } from "@kit.ArkUI";

export type DispatchInput = (value: string, cursor?: number) => void

export interface UniTextareaOptions {
	controller: TextAreaController
  key: string
  value: string
	placeholder: string
	enterKeyType?: EnterKeyType,
	enabled?: boolean
	maxLength?: number
	fontSize?: string
	color?: string
	lineHeight?: string
	letterSpacing?: string
	fontWeight?: FontWeight
	fontFamily?: string
	fontStyle?: FontStyle
	textAlign?: TextAlign
	caretColor?: ResourceColor
	confirmHold?: boolean
	autoHeight?: boolean
	textAreaHeight: number,
	handleMountedFocus?: Function
	dispatchInput?: DispatchInput
	handleFocus?: Function
	handleBlur?: Function
	dispatchConfirm?: Function
}

@Builder
export function TextareaBuilder(options: UniTextareaOptions) {
  TextArea({ text: options.value, placeholder: options.placeholder, controller: options.controller })
		.width('100%')
		.height('100%')
		.key(options.key)
		.padding(0)
    .borderRadius(0)
		.backgroundColor(Color.Transparent)
		.enterKeyType(options.enterKeyType)
		.enabled(options.enabled)
		.maxLength(options.maxLength)
		.caretColor(options.caretColor)
		.barState(options.autoHeight ? BarState.Off : BarState.Auto)
		.fontSize(options.fontSize)
		.fontColor(options.color)
		.lineHeight(options.lineHeight)
		.letterSpacing(options.letterSpacing)
		.fontWeight(options.fontWeight)
		.fontFamily(options.fontFamily)
		.fontStyle(options.fontStyle)
		.textAlign(options.textAlign)
		.onFocus(() => {
			options.handleFocus?.()
		})
		.onBlur(() => {
			options.handleBlur?.()
		})
		.onChange((value: string, previewText: PreviewText, opt: TextChangeOptions) => {
			options.dispatchInput?.(value, opt?.rangeAfter?.end)
		})
		.onAppear(() => {
			options.handleMountedFocus?.()
		})
		.onSubmit((_: EnterKeyType, event: SubmitEvent) => {
      if (options.confirmHold) {
        event.keepEditableState()
      }
      options.dispatchConfirm?.(event.text)
    })
}
