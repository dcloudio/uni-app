import {
  hasOwn,
  isPlainObject
} from 'uni-shared'
/**
 * mpvue event
 */
export function wrapperMPEvent (event) {
  return Object.assign({
    mp: event,
    _processed: true
  }, event)
}
/**
 * app-plus titleNView
 */
export function mergeTitleNView (navigationBar, titleNView) {
  if (isPlainObject(titleNView)) {
    if (hasOwn(titleNView, 'backgroundColor')) {
      navigationBar.backgroundColor = titleNView.backgroundColor
    }
    if (hasOwn(titleNView, 'buttons')) {
      navigationBar.buttons = titleNView.buttons
    }
    if (hasOwn(titleNView, 'titleColor')) {
      navigationBar.textColor = titleNView.titleColor
    }
    if (hasOwn(titleNView, 'titleText')) {
      navigationBar.titleText = titleNView.titleText
    }
    if (hasOwn(titleNView, 'titleSize')) {
      navigationBar.titleSize = titleNView.titleSize
    }
    if (hasOwn(titleNView, 'type')) {
      navigationBar.type = titleNView.type
    }
  }
  return navigationBar
}
