import { shallowRef } from 'vue'
import type { renderDialogPages } from './dialogPages-vapor'

// 这里只保存渲染入口，类型导入不会引入列表、动态组件等实现。
// 首次打开可能发生在页面挂载后，需通知已有 Page 创建渲染区域。
export const dialogPageRenderer =
  /*#__PURE__*/ shallowRef<typeof renderDialogPages>()
