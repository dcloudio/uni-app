import {
  preloadWebview,
  createPreloadWebview,
  registerWebviewReady
} from './webview'

let todoNavigator = false

export function navigate (path, callback) {
  if (__PLATFORM__ === 'app-plus') {
    if (todoNavigator) {
      return console.error(`已存在待跳转页面${todoNavigator.path},请不要连续多次跳转页面`)
    }
    // 未创建 preloadWebview 或 preloadWebview 已被使用
    const waitPreloadWebview = !preloadWebview || (preloadWebview && preloadWebview.__uniapp_route)
    // 已创建未 loaded
    const waitPreloadWebviewReady = preloadWebview && !preloadWebview.loaded

    if (waitPreloadWebview || waitPreloadWebviewReady) {
      todoNavigator = {
        path: path,
        nvue: __uniRoutes.find(route => route.path === path).meta.isNVue,
        navigate: callback
      }
      if (process.env.NODE_ENV !== 'production') {
        console.log(`todoNavigator:${todoNavigator.path} ${waitPreloadWebview ? 'waitForCreate' : 'waitForReady'}`)
      }
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
    // 创建预加载
    const preloadWebview = createPreloadWebview()
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
