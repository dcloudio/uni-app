import {
  preloadWebview,
  createPreloadWebview,
  registerWebviewReady
} from './webview'

let todoNavigator = false

function setTodoNavigator (path, callback, msg) {
  todoNavigator = {
    path: path,
    nvue: __uniRoutes.find(route => route.path === path).meta.isNVue,
    navigate: callback
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log(`todoNavigator:${todoNavigator.path} ${msg}`)
  }
}

export function navigate (path, callback, isAppLaunch) {
  if (__PLATFORM__ === 'app-plus') {
    if (isAppLaunch && __uniConfig.splashscreen && __uniConfig.splashscreen.autoclose && (!__uniConfig.splashscreen.alwaysShowBeforeRender)) {
      plus.navigator.closeSplashscreen()
    }
    if (!isAppLaunch && todoNavigator) {
      return console.error(`已存在待跳转页面${todoNavigator.path},请不要连续多次跳转页面${path}`)
    }
    if (__uniConfig.renderer === 'native') { // 纯原生无需wait逻辑
      // 如果是首页还未初始化，需要等一等，其他无需等待
      if (getCurrentPages().length === 0) {
        return setTodoNavigator(path, callback, 'waitForReady')
      }
      return callback()
    }
    // 未创建 preloadWebview 或 preloadWebview 已被使用
    const waitPreloadWebview = !preloadWebview || (preloadWebview && preloadWebview.__uniapp_route)
    // 已创建未 loaded
    const waitPreloadWebviewReady = preloadWebview && !preloadWebview.loaded

    if (waitPreloadWebview || waitPreloadWebviewReady) {
      setTodoNavigator(path, callback, waitPreloadWebview ? 'waitForCreate' : 'waitForReady')
    } else {
      callback()
    }
    if (waitPreloadWebviewReady) {
      registerWebviewReady(preloadWebview.id, todoNavigate)
    }
  }
}

function todoNavigate () {
  if (!todoNavigator) {
    return
  }
  const {
    navigate
  } = todoNavigator
  if (process.env.NODE_ENV !== 'production') {
    console.log(`todoNavigate:${todoNavigator.path}`)
  }
  todoNavigator = false
  return navigate()
}

export function navigateFinish () {
  if (__PLATFORM__ === 'app-plus') {
    if (__uniConfig.renderer === 'native') {
      if (!todoNavigator) {
        return
      }
      if (todoNavigator.nvue) {
        return todoNavigate()
      }
      return
    }
    // 创建预加载
    const preloadWebview = createPreloadWebview()
    if (process.env.NODE_ENV !== 'production') {
      console.log(`navigateFinish.preloadWebview:${preloadWebview.id}`)
    }
    if (!todoNavigator) {
      return
    }
    if (todoNavigator.nvue) {
      return todoNavigate()
    }
    preloadWebview.loaded
      ? todoNavigator.navigate()
      : registerWebviewReady(preloadWebview.id, todoNavigate)
  }
}
