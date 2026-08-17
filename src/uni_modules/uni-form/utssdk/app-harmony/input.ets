import { window } from "@kit.ArkUI";
import type {UniInputFileOptions} from "./index"

export interface UniInputOptions extends UniInputFileOptions {
	controller: TextInputController
	type?: InputType,
	height?: string
	caretPosition?: number
	customKeyboard: ESObject
}

@Builder
function CustomKeyboardBuilder() {
  Column() {}.height(0)
}

export const wrapBuilderCustomKeyboard = wrapBuilder(CustomKeyboardBuilder)

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
		.customKeyboard(options.customKeyboard)
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
