import {
  getRealPath
} from '../util'

import {
  invoke
} from '../../bridge'

export function saveVideoToPhotosAlbum ({
  filePath
} = {}, callbackId) {
  plus.gallery.save(getRealPath(filePath), e => {
    invoke(callbackId, {
      errMsg: 'saveVideoToPhotosAlbum:ok'
    })
  }, e => {
    invoke(callbackId, {
      errMsg: 'saveVideoToPhotosAlbum:fail'
    })
  })
}
