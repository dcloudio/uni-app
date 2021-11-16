export const forcePatchProps = {
  AD: ['data'],
  'AD-DRAW': ['data'],
  'LIVE-PLAYER': ['picture-in-picture-mode'],
  MAP: [
    'markers',
    'polyline',
    'circles',
    'controls',
    'include-points',
    'polygons',
  ],
  PICKER: ['range', 'value'],
  'PICKER-VIEW': ['value'],
  'RICH-TEXT': ['nodes'],
  VIDEO: ['danmu-list', 'header'],
  'WEB-VIEW': ['webview-styles'],
}

export const forcePatchPropKeys = ['animation']
