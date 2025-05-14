import '../uts/index.d.ts'
import './hbuilder-x/index.d.ts'
import './vue.d.ts'
import './shims/common.d.ts'
import '@uni-x/app-ios.d.ts'
// 需要引入，目前至少需要UniElement等一系列的类型，一旦它引入，那vue也要引入，因为依赖了vue的类型
import '@dcloudio/uni-app-x/index.d.ts'
