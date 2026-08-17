import { window } from "@kit.ArkUI";
import type {UniInputFileOptions} from "./index"

export interface UniTextareaOptions extends UniInputFileOptions {
	controller: TextAreaController
	lineHeight?: string
	autoHeight?: boolean
	height: number | string
	padding?: UniTextareaPadding
}

export interface UniTextareaPadding {
	top: string
	right: string
	bottom: string
	left: string
}

@Builder
export function TextareaBuilder(options: UniTextareaOptions) {
  TextArea({ text: options.value, placeholder: options.placeholder, controller: options.controller })
		.width('100%')
		.height(options.height)
		.key(options.key)
		.padding(options.padding ?? 0)
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
