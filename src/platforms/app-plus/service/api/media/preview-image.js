import {
  getRealPath
} from '../util'

import {
  publish
} from '../../bridge'

export function previewImagePlus ({
  current = 0,
  background = '#000000',
  indicator = 'number',
  loop = false,
  urls,
  longPressActions
} = {}) {
  urls = urls.map(url => getRealPath(url))

  const index = Number(current)
  if (isNaN(index)) {
    current = urls.indexOf(getRealPath(current))
    current = current < 0 ? 0 : current
  } else {
    current = index
  }

  plus.nativeUI.previewImage(urls, {
    current,
    background,
    indicator,
    loop,
    onLongPress: function (res) {
      let itemList = []
      let itemColor = ''
      let title = ''
      const hasLongPressActions = longPressActions && longPressActions.callbackId
      if (!hasLongPressActions) {
        itemList = ['保存相册']
        itemColor = '#000000'
        title = ''
      } else {
        itemList = longPressActions.itemList ? longPressActions.itemList : []
        itemColor = longPressActions.itemColor ? longPressActions.itemColor : '#000000'
        title = longPressActions.title ? longPressActions.title : ''
      }

      const options = {
        buttons: itemList.map(item => ({
          title: item,
          color: itemColor
        })),
        cancel: '取消'
      }
      if (title) {
        options.title = title
      }
      // if (plus.os.name === 'iOS') {
      //   options.cancel = '取消'
      // }
      plus.nativeUI.actionSheet(options, (e) => {
        if (e.index > 0) {
          if (hasLongPressActions) {
            publish(longPressActions.callbackId, {
              errMsg: 'showActionSheet:ok',
              tapIndex: e.index - 1,
              index: res.index
            })
            return
          }
          plus.gallery.save(res.url, function (GallerySaveEvent) {
            plus.nativeUI.toast('保存图片到相册成功')
          })
        } else if (hasLongPressActions) {
          publish(longPressActions.callbackId, {
            errMsg: 'showActionSheet:fail cancel'
          })
        }
      })
    }
  })
  return {
    errMsg: 'previewImage:ok'
  }
}
