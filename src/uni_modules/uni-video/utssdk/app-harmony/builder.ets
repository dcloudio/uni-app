import { AVVolumePanel, AVVolumePanelParameter } from '@kit.AudioKit';

const createVolumeParameter = (x ?: Length, y ?: Length): AVVolumePanelParameter | undefined => {
  if (typeof x === 'number' || typeof y === 'number') {
    return {
      position: {
        x,
        y
      }
    } as AVVolumePanelParameter
  }
  return undefined
}

export interface AVVolumePanelOptions {
  show?: boolean;
  volumeLevel?: number;
  positionX?: number;
  positionY?: number;
}

@Component
export struct VolumePanel {
  @Prop volumeLevel: number = 0;
  @Prop volumeParameter?: AVVolumePanelParameter;
  onAboutToAppear?: (instance: VolumePanel) => void

  build() {
    AVVolumePanel({
      volumeLevel: this.volumeLevel,
      volumeParameter: this.volumeParameter
    })
  }

  aboutToAppear(): void {
    this.onAboutToAppear?.(this)
  }
}

@Builder
export function buildVideo(params: ESObject) {
  Stack() {
    Video(params.options)
      .attributeModifier(params.modifier)
      .width('100%')
      .height('100%')
      .objectFit(params.objectFit ?? ImageFit.Contain)
      .muted(params.muted)
      .autoPlay(params.autoplay)
      .loop(params.loop)
      .controls(params.controls ?? false)
      .onStart(params?.event?.onPlay)
      .onPause(params?.event?.onPause)
      .onFinish(params?.event?.onEnded)
      .onStop(params?.event?.onStop)
      .onPrepared(params?.event?.onPrepared)
      .onSeeking(params?.event?.onSeeking)
      .onSeeked(params?.event?.onSeeked)
      .onUpdate(params?.event?.onTimeUpdate)
      .onFullscreenChange(params?.event?.onFullscreenChange)
      .onError(params?.event?.onError)
    if (params.volumeOptions.show === true) {
      VolumePanel({
        volumeLevel: params.volumeOptions.volumeLevel ?? 0,
        volumeParameter: createVolumeParameter(
          params.volumeOptions.positionX,
          params.volumeOptions.positionY
        )
      })
    }
  }
}
