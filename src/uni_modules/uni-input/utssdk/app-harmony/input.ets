import { window } from "@kit.ArkUI";

export type DispatchInput = (value: string, cursor?: number) => void

export interface UniInputOptions {
	controller: TextInputController
  key: string
  value: string
	placeholder: string
	type?: InputType,
	enterKeyType?: EnterKeyType,
	enabled?: boolean
	maxLength?: number
	fontSize?: string
	color?: string
	height?: string
	letterSpacing?: string
	fontWeight?: FontWeight
	fontFamily?: string
	fontStyle?: FontStyle
	textAlign?: TextAlign
	caretColor?: ResourceColor
	caretPosition?: number
	confirmHold?: boolean
	handleMountedFocus?: Function
	dispatchInput?: DispatchInput
	handleFocus?: Function
	handleBlur?: Function
	dispatchConfirm?: Function
}

@Builder
export function InputBuilder(options: UniInputOptions) {
  TextInput({ text: options.value, placeholder: options.placeholder, controller: options.controller })
		.width('100%')
		.height(options.height)
		.key(options.key)
		.padding(0)
    .borderRadius(0)
		.backgroundColor(Color.Transparent)
		.type(options.type)
		.enterKeyType(options.enterKeyType)
		.enabled(options.enabled)
		.maxLength(options.maxLength)
		.caretColor(options.caretColor)
		.caretPosition(options.caretPosition)
		.fontSize(options.fontSize)
		.fontColor(options.color)
		.letterSpacing(options.letterSpacing)
		.fontWeight(options.fontWeight)
		.fontFamily(options.fontFamily)
		.fontStyle(options.fontStyle)
		.textAlign(options.textAlign)
		.showPasswordIcon(false)
		.onFocus(() => {
			options.handleFocus?.()
		})
		.onBlur(() => {
			options.handleBlur?.()
		})
		.onChange((value, previewText, opt) => {
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
