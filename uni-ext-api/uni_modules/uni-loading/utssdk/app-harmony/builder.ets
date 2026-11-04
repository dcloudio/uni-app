@Component
struct CanvasCircle {
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

// 计算粗细的倍数 (最小边 / 16 * coefficient)
function getLineCoefficient(borderWidth: string | undefined) {
  if (borderWidth == null) {
    return 1
  }
  // TODO 不支持具体 px 值
  /* if (borderWidth.endsWith('px')) {
    const num = parseFloat(borderWidth.replace('px', ''))
    return isNaN(num) ? 1 : num
  } */
  switch (borderWidth) {
    case 'medium':
    case 'normal':
      return 1
    case 'thick':
    case 'bold':
      return 2
  }
  return 1
}

@Builder
export function buildLoading(params: ESObject) {
  Flex({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
    CanvasCircle({
      degrees: params.degrees ?? 270,
      color: params.color as number | string, //formatColorSync(params.color) as string,
      coefficient: getLineCoefficient(params.borderWidth),
      duration: params.duration ?? 1333,
      easing: params.animationTimingFunction,
      paused: params.paused
    })
  }
  .width('100%')
  .height('100%')
}
