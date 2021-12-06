import { ComponentInternalInstance, getCurrentInstance } from 'vue'
import type { MPComponentInstance } from '@dcloudio/uni-mp-core'
import { hasOwn } from '@vue/shared'

const propsCacheMap = new Map<
  number | string | unknown,
  Record<string, any>[]
>()

export function renderProps(props: Record<string, any>) {
  const {
    ctx: { $scope },
  } = getCurrentInstance()! as ComponentInternalInstance & {
    ctx: { $scope: MPComponentInstance }
  }
  const webviewId = findWebviewId($scope)
  let propsCache = propsCacheMap.get(webviewId)!
  if (!propsCache) {
    propsCache = Object.create(null)
  }
  return propsCache.push(props)
}

let findWebviewId = (
  $scope: MPComponentInstance
): number | string | unknown => {
  if (hasOwn($scope, '__wxWebviewId__')) {
    // mp-weixin || mp-qq || mp-kuaishou
    findWebviewId = ($scope: MPComponentInstance) => {
      return $scope.__wxWebviewId__
    }
  }
  if (hasOwn($scope, '__webviewId__')) {
    // mp-toutiao || mp-lark || quickapp-webview
    findWebviewId = ($scope: MPComponentInstance) => {
      return $scope.__webviewId__
    }
  }
  if (hasOwn($scope, 'pageinstance')) {
    // mp-baidu
    findWebviewId = ($scope: MPComponentInstance) => {
      return $scope.pageinstance
    }
  }
  // mp-alipay
  findWebviewId = ($scope: MPComponentInstance) => {
    return $scope.$viewId || ($scope.$page as any).$viewId
  }
  return findWebviewId($scope)
}
