export function triggerLink (mpInstance) {
  const baiduComponentInstances = mpInstance.pageinstance.$baiduComponentInstances

  baiduComponentInstances[mpInstance.id] = mpInstance
  if (mpInstance.ownerId) { // 组件嵌组件
    const parentBaiduComponentInstance = baiduComponentInstances[mpInstance.ownerId]
    if (parentBaiduComponentInstance) {
      handleLink.call(parentBaiduComponentInstance, {
        detail: mpInstance
      })
    } else {
      console.error(`查找父组件失败${mpInstance.ownerId}`)
    }
  } else { // 页面直属组件
    handleLink.call(mpInstance.pageinstance, {
      detail: mpInstance
    })
  }
}

export function handleLink (event) {
  if (!event.detail.$parent) {
    event.detail.$parent = this.$vm
    event.detail.$parent.$children.push(event.detail)

    event.detail.$root = this.$vm.$root
  }
}
