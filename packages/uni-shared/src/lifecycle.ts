import {
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_PULL_DOWN_REFRESH,
  ON_REACH_BOTTOM,
  ON_TAB_ITEM_TAP,
} from './constants'

const PAGE_HOOKS = [
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
]

export function isRootHook(name: string) {
  return PAGE_HOOKS.indexOf(name) > -1
}
