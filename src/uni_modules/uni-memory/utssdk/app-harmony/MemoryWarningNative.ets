import { AbilityConstant, EnvironmentCallback, common } from '@kit.AbilityKit'

export class MemoryWarningEvent {
  level: number = 0
}

type MemoryWarningListener = (event: MemoryWarningEvent) => void

export class MemoryWarningNative {
  private static listeners: MemoryWarningListener[] = []
  private static environmentCallbackId: number = -1
  private static environmentCallback: EnvironmentCallback | null = null

  static addListener(listener: MemoryWarningListener): void {
    if (MemoryWarningNative.listeners.indexOf(listener) != -1) {
      return
    }
    MemoryWarningNative.listeners.push(listener)
  }

  static removeListener(listener: MemoryWarningListener | null): void {
    if (listener == null) {
      MemoryWarningNative.listeners = []
      return
    }
    const index = MemoryWarningNative.listeners.indexOf(listener)
    if (index != -1) {
      MemoryWarningNative.listeners.splice(index, 1)
    }
  }

  static startListen(uiAbilityContext: common.UIAbilityContext): void {
    if (MemoryWarningNative.environmentCallbackId != -1) {
      return
    }

    const applicationContext = uiAbilityContext.getApplicationContext()
    const environmentCallback: EnvironmentCallback = {
      onConfigurationUpdated(config): void {
      },
      onMemoryLevel(level: AbilityConstant.MemoryLevel): void {
        MemoryWarningNative.emitMemoryLevel(Number(level))
      }
    }

    MemoryWarningNative.environmentCallbackId = applicationContext.on('environment', environmentCallback)
    MemoryWarningNative.environmentCallback = environmentCallback
  }

  static stopListen(uiAbilityContext: common.UIAbilityContext): void {
    if (MemoryWarningNative.environmentCallbackId == -1) {
      MemoryWarningNative.environmentCallback = null
      return
    }

    const applicationContext = uiAbilityContext.getApplicationContext()
    applicationContext.off('environment', MemoryWarningNative.environmentCallbackId)
    MemoryWarningNative.environmentCallbackId = -1
    MemoryWarningNative.environmentCallback = null
  }

  static emitMemoryLevel(level: number): void {
    const event = new MemoryWarningEvent()
    event.level = MemoryWarningNative.normalizeLevel(level)
    MemoryWarningNative.listeners.forEach((listener) => {
      listener(event)
    })
  }

  static normalizeLevel(level: number): number {
    if (level == AbilityConstant.MemoryLevel.MEMORY_LEVEL_MODERATE) {
      return 5
    }
    if (level == AbilityConstant.MemoryLevel.MEMORY_LEVEL_LOW) {
      return 10
    }
    if (level == AbilityConstant.MemoryLevel.MEMORY_LEVEL_CRITICAL) {
      return 15
    }
    return Number(level)
  }
}
