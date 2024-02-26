export const _style_picker_view = {
  'uni-picker-view': { '': { position: 'relative' } },
  'uni-picker-view-wrapper': {
    '': {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      overflow: 'hidden',
    },
  },
}

export const _style_picker_column = {
  'uni-picker-view-column': {
    '': {
      flex: '1',
      position: 'relative',
      alignItems: 'stretch',
      overflow: 'hidden',
    },
  },
  'uni-picker-view-mask': {
    '': {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      pointerEvents: 'none',
    },
  },
  'uni-picker-view-mask-top': {
    '': {
      bottom: '0',
      backgroundImage:
        'linear-gradient(to bottom,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))',
    },
  },
  'uni-picker-view-mask-bottom': {
    '': {
      top: '0',
      backgroundImage:
        'linear-gradient(to top,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))',
    },
  },
  'uni-picker-view-group': {
    '': {
      flexDirection: 'column',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    },
  },
  'uni-picker-view-content': {
    '': {
      flexDirection: 'column',
      paddingTop: '0',
      paddingRight: '0',
      paddingBottom: '0',
      paddingLeft: '0',
    },
  },
  'uni-picker-view-indicator': {
    '': {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      height: '34px',
      borderColor: '#e5e5e5',
      borderTopWidth: '1px',
      borderBottomWidth: '1px',
      pointerEvents: 'none',
    },
  },
}
