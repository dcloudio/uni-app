export interface LayoutState {
  topWindowMediaQuery: boolean
  showTopWindow: boolean
  apiShowTopWindow: boolean
  leftWindowMediaQuery: boolean
  showLeftWindow: boolean
  apiShowLeftWindow: boolean
  rightWindowMediaQuery: boolean
  showRightWindow: boolean
  apiShowRightWindow: boolean
  topWindowHeight: number
  marginWidth: number
  leftWindowWidth: number
  rightWindowWidth: number
  navigationBarTitleText: string
  topWindowStyle: unknown
  leftWindowStyle: unknown
  rightWindowStyle: unknown
}

let globalLayoutState: LayoutState | undefined

export function getLayoutState() {
  return globalLayoutState
}

export function setLayoutState(state: LayoutState) {
  globalLayoutState = state
}
