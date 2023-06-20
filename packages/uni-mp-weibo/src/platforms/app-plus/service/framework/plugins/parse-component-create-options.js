export default function parseComponentCreateOptions (vm) {
  // 目前方案调整为 service 层直接处理,暂不需要同步配置到 view 层
  // if (vm.$options.mpOptions && vm.$options.mpOptions.externalClasses) {
  //   return {
  //     mpOptions: {
  //       externalClasses: vm.$options.mpOptions.externalClasses
  //     }
  //   }
  // }
}
