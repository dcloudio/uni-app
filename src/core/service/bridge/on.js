import {
  callAppHook,
  callPageHook
} from '../plugins/util'

import {
  setPullDownRefreshPageId
} from '../api/page-event'

function onError (err) {
  callAppHook(getApp(), 'onError', err)
}

function onPageNotFound (page) {
  callAppHook(getApp(), 'onPageNotFound', page)
}

function onPullDownRefresh (args, pageId) {
  const page = getCurrentPages().find(page => page.$page.id === pageId)
  if (page) {
    setPullDownRefreshPageId(pageId)
    callPageHook(page, 'onPullDownRefresh')
  }
}

function callCurrentPageHook (hook, ...args) {
  const pages = getCurrentPages()
  if (pages.length) {
    callPageHook(pages[pages.length - 1], hook, ...args)
  }
}

function createCallCurrentPageHook (hook) {
  return function (...args) {
    callCurrentPageHook(hook, ...args)
  }
}

function onAppEnterBackground () {
  callAppHook(getApp(), 'onHide')
  callCurrentPageHook('onHide')
}

function onAppEnterForeground () {
  callAppHook(getApp(), 'onShow')
  callCurrentPageHook('onShow')
}

export default function initOn (on) {
  on('onError', onError)
  on('onPageNotFound', onPageNotFound)

  on('onAppEnterBackground', onAppEnterBackground)
  on('onAppEnterForeground', onAppEnterForeground)

  on('onPullDownRefresh', onPullDownRefresh)

  on('onTabItemTap', createCallCurrentPageHook('onTabItemTap'))
  on('onNavigationBarButtonTap', createCallCurrentPageHook('onNavigationBarButtonTap'))
}
