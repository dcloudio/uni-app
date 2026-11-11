import { UIApplication } from 'UIKit'
import { URL } from 'Foundation'
import { OpenSchema, CanOpenURL } from '../interface.uts'

export const openSchema : OpenSchema = function (url : string) : void {
  if (canOpenURL(url)) {
    let uri = new URL(string = url)
    UIApplication.shared.open(uri!)
  } else {
    console.error('[uts-openSchema] url param Error: ', url)
  }
}

export const canOpenURL : CanOpenURL = function (url : string) : boolean {
  if (typeof url == 'string' && url.length > 0) {
    let uri = new URL(string = url)
    if (uri != null && UIApplication.shared.canOpenURL(uri!)) {
      return true
    }
  }
  return false
}
