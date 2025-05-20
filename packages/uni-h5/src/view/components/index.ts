import Video, { UniVideoElement } from './video/index'
//#if _X_
// @ts-expect-error
import WebView, { UniWebViewElement } from './web-view/index-x'
//#else
// @ts-expect-error
import WebView from './web-view/index'
//#endif
import Map, { UniMapElement } from './map/index'
import CoverView, { UniCoverViewElement } from './cover-view'
import CoverImage, { UniCoverImageElement } from './cover-image'
import Picker, { UniPickerElement } from './picker/index'

import Ad from './ad/index'
import AdContentPage from './ad-content-page/index'
import AdDraw from './ad-draw/index'
import Camera from './camera/index'
import LivePlayer from './live-player/index'
import LivePusher from './live-pusher/index'
export {
  Video,
  WebView,
  Map,
  CoverView,
  CoverImage,
  Picker,
  //Unsupported
  Ad,
  AdContentPage,
  AdDraw,
  Camera,
  LivePlayer,
  LivePusher,
  //#if _X_ && !_NODE_JS_
  UniVideoElement,
  UniWebViewElement,
  UniMapElement,
  UniCoverViewElement,
  UniCoverImageElement,
  UniPickerElement,
  //#endif
}
//#if _X_
export * from '../../x/view/components/customElements'
//#endif
