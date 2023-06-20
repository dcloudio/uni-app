import {
  hasOwn,
  isPlainObject
} from 'uni-shared'
/**
 * mpvue event
 */
export function wrapperMPEvent (event) {
  event.mp = Object.assign({
    '@warning': 'mp is deprecated'
  }, event)
  event._processed = true
  return event
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
    if (hasOwn(titleNView, 'searchInput') && typeof titleNView.searchInput === 'object') {
      navigationBar.searchInput = Object.assign({
        autoFocus: false,
        align: 'center',
        color: '#000000',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: '0px',
        placeholder: '',
        placeholderColor: '#CCCCCC',
        disabled: false
      }, titleNView.searchInput)
    }
  }
  return navigationBar
}
