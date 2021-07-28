import { extend } from '@vue/shared'
import { nextTick } from 'vue'
import { defineAsyncApi, defineSyncApi } from '@dcloudio/uni-api'
import { getLayoutState } from '../../../framework/components/layout'

export const showTopWindow = <typeof uni.showTopWindow>(
  defineAsyncApi('showTopWindow', (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowTopWindow = true
    nextTick(resolve)
  })
)

export const hideTopWindow = <typeof uni.hideTopWindow>(
  defineAsyncApi('hideTopWindow', (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowTopWindow = false
    nextTick(resolve)
  })
)

export const showLeftWindow = <typeof uni.showLeftWindow>(
  defineAsyncApi('showLeftWindow', (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowLeftWindow = true
    nextTick(resolve)
  })
)

export const hideLeftWindow = <typeof uni.hideLeftWindow>(
  defineAsyncApi('hideLeftWindow', (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowLeftWindow = false
    nextTick(resolve)
  })
)

export const showRightWindow = <typeof uni.showRightWindow>(
  defineAsyncApi('showRightWindow', (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowRightWindow = true
    nextTick(resolve)
  })
)

export const hideRightWindow = <typeof uni.hideRightWindow>(
  defineAsyncApi('hideRightWindow', (_, { resolve, reject }) => {
    const state = getLayoutState()
    if (!state) {
      reject()
      return
    }
    state.apiShowRightWindow = false
    nextTick(resolve)
  })
)

export const getTopWindowStyle = <typeof uni.getTopWindowStyle>(
  defineSyncApi('getTopWindowStyle', () => {
    const state = getLayoutState()
    return extend({}, state && state.topWindowStyle)
  })
)

export const setTopWindowStyle = <typeof uni.setTopWindowStyle>(
  defineSyncApi('setTopWindowStyle', (style) => {
    const state = getLayoutState()
    if (state) {
      state.topWindowStyle = style
    }
  })
)

export const getLeftWindowStyle = <typeof uni.getLeftWindowStyle>(
  defineSyncApi('getLeftWindowStyle', () => {
    const state = getLayoutState()
    return extend({}, state && state.leftWindowStyle)
  })
)

export const setLeftWindowStyle = <typeof uni.setLeftWindowStyle>(
  defineSyncApi('setLeftWindowStyle', (style) => {
    const state = getLayoutState()
    if (state) {
      state.leftWindowStyle = style
    }
  })
)

export const getRightWindowStyle = <typeof uni.getRightWindowStyle>(
  defineSyncApi('getRightWindowStyle', () => {
    const state = getLayoutState()
    return extend({}, state && state.rightWindowStyle)
  })
)

export const setRightWindowStyle = <typeof uni.setRightWindowStyle>(
  defineSyncApi('setRightWindowStyle', (style) => {
    const state = getLayoutState()
    if (state) {
      state.rightWindowStyle = style
    }
  })
)
