import Video from './video/index'
//#if _X_
// @ts-ignore
import WebView from './web-view/index-x'
//#else
// @ts-ignore
import WebView from './web-view/index'
//#endif
import Map from './map/index'
import CoverView from './cover-view'
import CoverImage from './cover-image'
import Picker from './picker/index'

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
}
