import { UIContext, ComponentContent } from '@kit.ArkUI';

@Component
export struct CanvasCircle {
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  private uiContext: UIContext | undefined = undefined;
  lineWidthBase: number = 16
  @Prop duration: number = 1333
  @Prop easing: string = 'linear'
  @Prop @Watch('draw') color: string | number = 0x000000
  @Prop @Watch('draw') coefficient: number = 1
  @Prop @Watch('draw') degrees: number = 270
  @Prop @Watch('pauseAnimate') paused: boolean = false
  @State rotate_: number = 0
  private animateParam: AnimateParam = {
    duration: this.duration,
    curve: this.easing,
    iterations: -1
  }

  draw() {
    const canvasWidth = this.context.width
    const canvasHeight = this.context.height
    const realSize = Math.min(canvasWidth, canvasHeight)
    const realLineWidth = (realSize / this.lineWidthBase) * this.coefficient

    const angleDegrees = this.degrees

    const angleRadians = (angleDegrees * Math.PI) / 180;

    this.context.clearRect(0, 0, canvasWidth, canvasHeight);

    this.context.strokeStyle = this.color;
    this.context.lineWidth = realLineWidth;

    this.context.beginPath();

    const centerX = canvasWidth / 2; // 圆心 X 坐标
    const centerY = canvasHeight / 2; // 圆心 Y 坐标
    const radius = realSize / 2 - realLineWidth / 2; // 半径

    // 使用 arc() 方法绘制弧线
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    // x, y: 圆心坐标
    // radius: 半径
    // startAngle: 起始弧度 (0 度在 3 点钟方向)
    // endAngle: 结束弧度
    // anticlockwise: 是否逆时针 (false 为顺时针)
    this.context.arc(centerX, centerY, radius, 0, angleRadians, false);

    this.context.stroke();
  }

  play() {
    animateToImmediately(this.animateParam, () => {
      this.rotate_ = 360;
    })
  }

  pause() {
    animateToImmediately({ duration: 0 }, () => {
      this.rotate_ = 0;
    })
  }

  pauseAnimate() {
    if (this.paused) {
      this.pause()
    } else {
      this.play()
    }
  }

  build() {
    Canvas(this.context)
      .rotate({
        angle: this.rotate_
      })
      .width('100%')
      .height('100%')
      .onAppear(() => {
        this.uiContext = this.getUIContext();
        if (!this.uiContext) {
          return;
        }
      })
      .onReady(() => {
        this.draw()
        setTimeout(() => {
          if (this.rotate_ === 0 && !this.paused) {
            this.play()
          }
        }, 0)
      })
  }
}

@Component
struct Toast {
    @Prop title: string
    @Prop icon: string
    @Prop image: string

    private hasIcon(): boolean {
        if (this.image !== '') {
            return true
        }
        return this.icon === 'loading' || this.icon === 'success' || this.icon === 'error' || this.icon === 'exception' || this.icon === 'fail'
    }

    build() {
        if (this.hasIcon()) {
            Column() {
                if (this.image) {
                    Image(this.image)
                        .width('36vp')
                        .height('36vp')
                        .objectFit(ImageFit.Contain)
                } else {
                    if (this.icon === 'loading') {
                        Column() {
                            CanvasCircle({
                                color: '#FFFFFF',
                                degrees: 270,
                                duration: 1333,
                                easing: 'linear'
                            })
                        }
                        .width('36vp')
                        .height('36vp')
                    } else if (this.icon === 'success') {
                        Text('\uEA08')
                            .fontSize('36vp')
                            .fontColor(Color.White)
                            .fontFamily('uni-icon')
                    } else if (this.icon === 'error' || this.icon === 'exception') {
                        Text('\uEA03')
                            .fontSize('36vp')
                            .fontColor(Color.White)
                            .fontFamily('uni-icon')
                    } else if (this.icon === 'fail') {
                        Text('\uEA14')
                            .fontSize('36vp')
                            .fontColor(Color.White)
                            .fontFamily('uni-icon')
                    }
                }
                if (this.title) {
                    Text(this.title)
                        .fontColor(Color.White)
                        .fontSize('16vp')
                        .maxLines(2)
                        .textOverflow({ overflow: TextOverflow.Ellipsis })
                        .textAlign(TextAlign.Center)
                        .margin({ top: '16vp' })
                        .padding({ left: '8vp', right: '8vp' })
                }
            }
            .alignItems(HorizontalAlign.Center)
            .justifyContent(FlexAlign.Center)
            .width('140vp')
            .height('140vp')
            .backgroundColor('#f24c4c4c')
            .borderRadius('10vp')
        } else {
            Column() {
                if (this.title) {
                    Text(this.title)
                        .fontColor(Color.White)
                        .fontSize('16vp')
                        .maxLines(2)
                        .textOverflow({ overflow: TextOverflow.Ellipsis })
                        .textAlign(TextAlign.Center)
                }
            }
            .alignItems(HorizontalAlign.Center)
            .justifyContent(FlexAlign.Center)
            .padding({ top: '12vp', bottom: '12vp', left: '20vp', right: '20vp' })
            .backgroundColor('#f24c4c4c')
            .borderRadius('10vp')
            .constraintSize({ maxWidth: '200vp' })
        }
    }
}

interface ToastOptions {
    title: string
    icon: string
    image: string
}

@Builder
function ToastBuilder(options: ToastOptions) {
    Toast({
        title: options.title,
        icon: options.icon,
        image: options.image
    })
}

let currentToast: ComponentContent<ToastOptions> | null = null
let currentTimer: number | null = null

export interface ShowToastOptions {
    title?: string,
    icon?: string,
    image?: string,
    mask?: boolean,
    duration?: number
}

export function showToast(uiContext: UIContext, options: ShowToastOptions) {
    hideToast(uiContext)

    const promptAction = uiContext.getPromptAction()
    const toastOptions: ToastOptions = {
        title: options.title || '',
        icon: options.icon || 'success',
        image: options.image || ''
    }

    const toast = new ComponentContent(
        uiContext,
        wrapBuilder(ToastBuilder),
        toastOptions
    )
    currentToast = toast

    promptAction.openCustomDialog(toast, {
        alignment: DialogAlignment.Center,
        isModal: options.mask == undefined ? false : options.mask,
        maskColor: '#00000000',
        autoCancel: false,
        transition: TransitionEffect.IDENTITY,
        onWillDismiss: (action: DismissDialogAction) => {
            if (action.reason === DismissReason.PRESS_BACK) {
                promptAction.closeCustomDialog(toast)
            }
            return false
        }
    })

    const duration = options.duration || 1500
    currentTimer = setTimeout(() => {
        currentTimer = null
        if (currentToast == toast) {
            currentToast = null
        }
        promptAction.closeCustomDialog(toast)
    }, duration)
}

export function hideToast(uiContext: UIContext) {
    const promptAction = uiContext.getPromptAction()
    if (currentToast != null) {
        promptAction.closeCustomDialog(currentToast)
        currentToast = null
    }
    if (currentTimer != null) {
        clearTimeout(currentTimer)
        currentTimer = null
    }
}
