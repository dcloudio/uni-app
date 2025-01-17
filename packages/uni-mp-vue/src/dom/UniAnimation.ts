import type {
  UniAnimation as IUniAnimation,
  UniAnimationPlaybackEvent,
} from '@dcloudio/uni-app-x/types/native'

// TODO App端实现未继承自EventTarget，如果后续App端调整此处也需要同步调整
export class UniAnimation implements IUniAnimation {
  id: string
  onfinish: ((event: UniAnimationPlaybackEvent) => void) | null = null
  oncancel: ((event: UniAnimationPlaybackEvent) => void) | null = null
  constructor() {
    this.id = ''
  }

  get playState(): string {
    throw new Error('playState not implemented.')
  }

  get currentTime(): number {
    throw new Error('currentTime not implemented.')
  }

  cancel(): void {
    throw new Error('cancel not implemented.')
  }

  finish(): void {
    throw new Error('finish not implemented.')
  }

  pause(): void {
    throw new Error('pause not implemented.')
  }

  play(): void {
    throw new Error('play not implemented.')
  }
}
