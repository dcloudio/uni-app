// Vapor 独立入口只保留尚未替换的组件，不通过旧入口加载 Picker 和 customElements。
export { default as Video } from './video/index-vapor'
export { default as WebView } from './web-view/index-vapor'
export { default as Map } from './map/index-vapor'
export { default as Ad } from './ad/index-vapor'
export { default as AdContentPage } from './ad-content-page/index'
export { default as AdDraw } from './ad-draw/index'
export { default as Camera } from './camera/index'
export { default as LivePlayer } from './live-player/index'
export { default as LivePusher } from './live-pusher/index'

//#if !_NODE_JS_
export { UniVideoElement } from './video/index-vapor'
export { UniWebViewElement } from './web-view/index-vapor'
export { UniMapElement } from './map/index-vapor'
//#endif
