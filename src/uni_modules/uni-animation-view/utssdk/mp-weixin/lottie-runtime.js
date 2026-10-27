import lottie from 'lottie-miniprogram'

const localAnimationDataModules = import.meta.glob([
  '/static/**/*.json',
  '/uni_modules/**/static/**/*.json'
], {
  eager: true
})

function normalizeLocalPath(path) {
  const cleanPath = path.split('?')[0].split('#')[0].replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '')
  return `/${cleanPath}`
}

function normalizeModulePath(modulePath) {
  return normalizeLocalPath(modulePath.replace(/\\/g, '/'))
}

function getModuleAnimationData(moduleValue) {
  return moduleValue != null && moduleValue.default != null ? moduleValue.default : moduleValue
}

const localAnimationDataMap = Object.keys(localAnimationDataModules).reduce((result, modulePath) => {
  result[normalizeModulePath(modulePath)] = getModuleAnimationData(localAnimationDataModules[modulePath])
  return result
}, {})

function loadAnimationData(path) {
  if (/^https?:\/\//.test(path)) {
    return Promise.resolve({ path })
  }

  const normalizedPath = normalizeLocalPath(path)
  const localAnimationData = localAnimationDataMap[normalizedPath]
  if (localAnimationData != null) {
    return Promise.resolve({ animationData: localAnimationData })
  }

  const localKeys = Object.keys(localAnimationDataMap)
  console.error('animation-view mp source local miss', normalizedPath, localKeys.length, localKeys)
  return Promise.reject(new Error(`animation-view mp-weixin local json not found: ${path}`))
}

function createListenerStore() {
  return {
    data_ready: [],
    DOMLoaded: [],
    complete: [],
    data_failed: [],
    error: []
  }
}

function emitStoredEvent(store, name, payload) {
  const listeners = store[name]
  if (!Array.isArray(listeners)) {
    return
  }
  listeners.forEach((listener) => {
    listener(payload)
  })
}

function bindInstanceListeners(target, store) {
  Object.keys(store).forEach((name) => {
    const listeners = store[name]
    listeners.forEach((listener) => {
      target.addEventListener(name, listener)
    })
  })
}

function createAnimationInstance(state) {
  return {
    get loop() {
      return state.loop
    },
    set loop(value) {
      state.loop = value
      if (state.instance != null) {
        state.instance.loop = value
      }
    },
    get currentFrame() {
      return state.instance != null ? state.instance.currentFrame : 0
    },
    get totalFrames() {
      return state.instance != null ? state.instance.totalFrames : 0
    },
    destroy() {
      state.destroyed = true
      if (state.instance != null) {
        state.instance.destroy()
        state.instance = null
      }
    },
    play() {
      state.pendingAction = 'play'
      if (state.instance != null) {
        state.instance.play()
      }
    },
    pause() {
      state.pendingAction = 'pause'
      if (state.instance != null) {
        state.instance.pause()
      }
    },
    stop() {
      state.pendingAction = 'stop'
      if (state.instance != null) {
        state.instance.stop()
      }
    },
    goToAndStop(value, isFrame) {
      state.pendingSeek = {
        value,
        isFrame
      }
      if (state.instance != null) {
        state.instance.goToAndStop(value, isFrame)
      }
    },
    setDirection(value) {
      state.pendingDirection = value
      if (state.instance != null) {
        state.instance.setDirection(value)
      }
    },
    addEventListener(name, callback) {
      if (!Array.isArray(state.listeners[name])) {
        state.listeners[name] = []
      }
      state.listeners[name].push(callback)
      if (state.instance != null) {
        state.instance.addEventListener(name, callback)
      }
    },
    removeEventListener(name, callback) {
      const listeners = state.listeners[name]
      if (Array.isArray(listeners)) {
        state.listeners[name] = listeners.filter((listener) => listener !== callback)
      }
      if (state.instance != null) {
        state.instance.removeEventListener(name, callback)
      }
    }
  }
}

function applyPendingState(state) {
  if (state.instance == null) {
    return
  }
  state.instance.loop = state.loop
  if (state.pendingDirection != null) {
    state.instance.setDirection(state.pendingDirection)
  }
  if (state.pendingSeek != null) {
    state.instance.goToAndStop(state.pendingSeek.value, state.pendingSeek.isFrame)
  }
  if (state.pendingAction == 'play') {
    state.instance.play()
  } else if (state.pendingAction == 'pause') {
    state.instance.pause()
  } else if (state.pendingAction == 'stop') {
    state.instance.stop()
  }
}

function setupCanvas(canvas, options, animationData) {
  const pixelRatio = wx.getWindowInfo().pixelRatio || 1
  const width = options.width != null && options.width > 0 ? options.width : (canvas.offsetWidth || canvas.width)
  let height = options.height != null && options.height > 0 ? options.height : (canvas.offsetHeight || 0)
  if (height <= 0 && animationData != null && animationData.w > 0 && animationData.h > 0) {
    height = width * animationData.h / animationData.w
  }
  if (height <= 0) {
    height = canvas.height / pixelRatio
  }
  canvas.width = Math.round(width * pixelRatio)
  canvas.height = Math.round(height * pixelRatio)
  const context = canvas.getContext('2d')
  lottie.setup(canvas)
  return context
}

export default {
  loadAnimation(options) {
    const state = {
      instance: null,
      destroyed: false,
      loop: options.loop,
      listeners: createListenerStore(),
      pendingAction: options.autoplay ? 'play' : 'stop',
      pendingDirection: null,
      pendingSeek: null
    }
    const animation = createAnimationInstance(state)
    loadAnimationData(options.path)
      .then((sourceOptions) => {
        if (state.destroyed) {
          return
        }
        const context = setupCanvas(options.container, options, sourceOptions.animationData)
        state.instance = lottie.loadAnimation({
          loop: state.loop,
          autoplay: state.pendingAction == 'play',
          renderer: options.renderer,
          path: sourceOptions.path,
          animationData: sourceOptions.animationData,
          rendererSettings: {
            context
          }
        })
        bindInstanceListeners(state.instance, state.listeners)
        applyPendingState(state)
      })
      .catch((error) => {
        console.error('animation-view mp-weixin load failed', options.path, error)
        emitStoredEvent(state.listeners, 'data_failed', error)
        emitStoredEvent(state.listeners, 'error', error)
      })

    return animation
  }
}
