import { LottieController, LottieListener } from '@ohos/lottie-turbo'
import { display, NodeContent } from '@kit.ArkUI'
import { util } from '@kit.ArkTS'
import nativeNode from 'liblottie-turbo.so'
import { AnimationConfig } from '@ohos/lottie-turbo/src/main/ets/model/Animation'

@ObservedV2
export class LottieBuildParams {
	@Trace lottieId: string = ''
	@Trace loop: boolean = false
	@Trace autoplay: boolean = false
	@Trace autoSkip: boolean = true
	@Trace useCache: boolean = true
	@Trace playing: boolean = false
	@Trace path: string | null = null
	@Trace animationData: string | null = null
	controller: LottieController = new LottieController()
	listener: LottieListener | null = null
}

@ComponentV2
struct ManagedLottieView {
	@Require @Param params: LottieBuildParams = new LottieBuildParams()
	private rootSlot: NodeContent = new NodeContent()
	private runOnce: boolean = false
	private visible: boolean = false

	setData(): void {
		if (this.runOnce) {
			return
		}
		this.runOnce = true
		if (this.params.lottieId == '') {
			this.params.lottieId = util.generateRandomUUID(true).toString()
		}
		this.params.controller.lottieId = this.params.lottieId
		const displayInfo = display.getDefaultDisplaySync()
		const config: AnimationConfig = {
			loop: this.params.loop,
			autoplay: this.params.autoplay,
			autoSkip: this.params.autoSkip,
			useCache: this.params.useCache,
			path: normalizeLottiePath(this.params.path != null ? this.params.path! : ''),
			animationData: this.params.animationData != null ? this.params.animationData! : undefined,
			listener: this.params.listener != null ? this.params.listener! : undefined,
			controller: this.params.controller,
			contentMode: 'Contain',
			density: displayInfo.densityDPI,
		}
		nativeNode.createNativeRoot(this.rootSlot, this.params.lottieId, config)
		if (this.params.autoSkip) {
			nativeNode.lottieSetVisible(this.params.lottieId, this.visible)
		}
	}

	aboutToDisappear(): void {
		this.params.controller.destroy()
	}

	private refreshCurrentFrame(): void {
		if (!this.runOnce || !this.params.controller.isLoaded) {
			return
		}
		const currentFrame = this.params.controller.currentFrame as number
		if (this.params.playing) {
			this.params.controller.goToAndPlay(currentFrame, true)
		} else {
			this.params.controller.goToAndStop(currentFrame, true)
		}
	}

	build(): void {
		Column() {
			ContentSlot(this.rootSlot)
		}
		.width('100%')
		.height('100%')
		.onAppear(() => {
			this.setData()
		})
		.onSizeChange((_oldSize: SizeOptions, _newSize: SizeOptions) => {
			this.refreshCurrentFrame()
		})
		.onVisibleAreaChange([0.0, 1.0], (isVisible: boolean, currentRatio: number) => {
			if (isVisible && this.params.autoSkip && currentRatio >= 0.0) {
				nativeNode.lottieSetVisible(this.params.lottieId, true)
				this.visible = true
			} else if (!isVisible && this.params.autoSkip && currentRatio <= 0.0) {
				nativeNode.lottieSetVisible(this.params.lottieId, false)
				this.visible = false
			}
		})
	}
}

export function normalizeLottiePath(path: string): string {
	if (path == '') {
		return path
	}
	if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/') || path.startsWith('file://')) {
		return path
	}
	return 'file://' + path
}

@Builder
export function buildLottieView(params: LottieBuildParams): void {
	if (params.path != null || params.animationData != null) {
		Column() {
			ManagedLottieView({
				params: params,
			})
			.width('100%')
			.height('100%')
		}
		.width('100%')
		.height('100%')
	}
}

export function createLottieController(): LottieController {
	return new LottieController()
}

export function reloadLottieWithAnimationData(
	controller: LottieController,
	animationData: string,
	autoplay: boolean,
	loop: boolean
): void {
	controller.reload({
		animationData,
		autoplay,
		loop,
		contentMode: 'Contain',
	})
}

export function reloadLottieWithPath(
	controller: LottieController,
	path: string,
	autoplay: boolean,
	loop: boolean
): void {
	controller.reload({
		path,
		autoplay,
		loop,
		contentMode: 'Contain',
	})
}

export function createLottieListener(
	onLoopComplete: () => void,
	onComplete: () => void,
	onDestroy: () => void,
	onDOMLoaded: () => void,
	onDataReady: () => void,
	onDataFailed: () => void,
	onConfigReady: () => void,
	onLoadedImages: () => void
): LottieListener {
	return new LottieListener({
		onLoopComplete,
		onComplete,
		onDestroy,
		onDOMLoaded,
		onDataReady,
		onDataFailed,
		onConfigReady,
		onLoadedImages,
	})
}
