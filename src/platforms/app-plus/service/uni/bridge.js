import initOn from 'uni-core/service/bridge/on'

export function initServiceJSBridge (Vue) {
  const Emitter = new Vue()

  const bridge = {
    on: Emitter.$on.bind(Emitter),
    off: Emitter.$off.bind(Emitter),
    once: Emitter.$once.bind(Emitter),
    emit: Emitter.$emit.bind(Emitter)
  }

  initOn(bridge.on)

  return bridge
}
