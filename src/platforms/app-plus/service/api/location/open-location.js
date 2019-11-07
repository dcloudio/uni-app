import {
  showPage
} from '../page.js'

export function openLocation(data) {
  showPage({
    url: '__uniappopenlocation',
    data,
    style: {
      titleNView: {
        type: "transparent"
      }
    }
  })
  return {
    errMsg: 'openLocation:ok'
  }
}
