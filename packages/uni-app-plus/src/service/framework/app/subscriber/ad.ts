import { registerServiceMethod } from '@dcloudio/uni-core'

export function subscribeAd() {
  // view 层通过 UniViewJSBridge.invokeServiceMethod('getAdData', args, function({data})=>{console.log(data)})
  registerServiceMethod('getAdData', (args, resolve) => {
    // TODO args: view 层传输的参数，处理完之后，resolve:回传给 service，如resolve({data})
  })
}
