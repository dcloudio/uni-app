import {
  getRealPath
} from '../util'

import {
  invoke
} from '../../bridge'

export function saveImageToPhotosAlbum ({
  filePath
} = {}, callbackId) {
  plus.gallery.save(getRealPath(filePath), e => {
    invoke(callbackId, {
      errMsg: 'saveImageToPhotosAlbum:ok'
    })
  }, e => {
    invoke(callbackId, {
      errMsg: 'saveImageToPhotosAlbum:fail'
    })
  })
}
