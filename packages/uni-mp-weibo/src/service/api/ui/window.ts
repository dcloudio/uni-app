import { extend } from '@vue/shared'
import { nextTick } from 'vue'
import { defineAsyncApi, defineSyncApi } from '@dcloudio/uni-api'
import { getLayoutState } from '../../../framework/components/layout'

export const showTopWindow = defineAsyncApi<typeof uni.showTopWindow>(
  'showTopWindow',
  (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowTopWindow = true
    nextTick(resolve)
  }
)

export const hideTopWindow = defineAsyncApi<typeof uni.hideTopWindow>(
  'hideTopWindow',
  (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowTopWindow = false
    nextTick(resolve)
  }
)

export const showLeftWindow = defineAsyncApi<typeof uni.showLeftWindow>(
  'showLeftWindow',
  (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowLeftWindow = true
    nextTick(resolve)
  }
)

export const hideLeftWindow = defineAsyncApi<typeof uni.hideLeftWindow>(
  'hideLeftWindow',
  (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowLeftWindow = false
    nextTick(resolve)
  }
)

export const showRightWindow = defineAsyncApi<typeof uni.showRightWindow>(
  'showRightWindow',
  (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowRightWindow = true
    nextTick(resolve)
  }
)

export const hideRightWindow = defineAsyncApi<typeof uni.hideRightWindow>(
  'hideRightWindow',
  (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowRightWindow = false
    nextTick(resolve)
  }
)

export const getTopWindowStyle = defineSyncApi<typeof uni.getTopWindowStyle>(
  'getTopWindowStyle',
  () => {
    const state = getLayoutState()
    return extend({}, state && state.topWindowStyle)
  }
)

export const setTopWindowStyle = defineSyncApi<typeof uni.setTopWindowStyle>(
  'setTopWindowStyle',
  (style) => {
    const state = getLayoutState()
    if (state) {
      state.topWindowStyle = style
    }
  }
)

export const getLeftWindowStyle = defineSyncApi<typeof uni.getLeftWindowStyle>(
  'getLeftWindowStyle',
  () => {
    const state = getLayoutState()
    return extend({}, state && state.leftWindowStyle)
  }
)

export const setLeftWindowStyle = defineSyncApi<typeof uni.setLeftWindowStyle>(
  'setLeftWindowStyle',
  (style) => {
    const state = getLayoutState()
    if (state) {
      state.leftWindowStyle = style
    }
  }
)

export const getRightWindowStyle = defineSyncApi<
  typeof uni.getRightWindowStyle
>('getRightWindowStyle', () => {
  const state = getLayoutState()
  return extend({}, state && state.rightWindowStyle)
})

export const setRightWindowStyle = defineSyncApi<
  typeof uni.setRightWindowStyle
>('setRightWindowStyle', (style) => {
  const state = getLayoutState()
  if (state) {
    state.rightWindowStyle = style
  }
})
