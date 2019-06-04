import {
  noop
} from './util'
export function initTitleNView (nvue) {
  const eventMaps = {
    onNavigationBarButtonTap: noop,
    onNavigationBarSearchInputChanged: noop,
    onNavigationBarSearchInputConfirmed: noop,
    onNavigationBarSearchInputClicked: noop
  }
  nvue.requireModule('globalEvent').addEventListener('plusMessage', e => {
    if (eventMaps[e.data.type]) {
      eventMaps[e.data.type](e.data.data)
    }
  })
  const ret = Object.create(null)
  Object.keys(eventMaps).forEach(eventType => {
    ret[eventType] = function (callback) {
      eventMaps[eventType] = callback
    }
  })
  return ret
}
