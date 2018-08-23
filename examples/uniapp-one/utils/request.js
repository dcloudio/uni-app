import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

const errorPrompt = (err) => {
  wx.showToast({
    title: err.message || 'fetch data error.',
    icon: 'none'
  })
}

request.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()
  return request
})

request.interceptors.response.use((response, promise) => {
  wx.hideNavigationBarLoading()
  // if (!(response && response.data && response.data.res === 0)) {
  //   errorPrompt(response)
  // }
  return promise.resolve(response.data)
}, (err, promise) => {
  wx.hideNavigationBarLoading()
  errorPrompt(err)
  return promise.reject(err)
})

export default request
