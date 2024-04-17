import { onBeforeUnmount, onMounted, reactive } from 'vue'

import { passive } from '@dcloudio/uni-shared'

export interface UserActionState {
  userAction: boolean
}

const passiveOptions = /*#__PURE__*/ passive(true)
const states: UserActionState[] = []
let userInteract: number = 0
let inited: boolean
const setUserAction = (userAction: boolean) =>
  states.forEach((vm) => (vm.userAction = userAction))
export function addInteractListener(
  vm: UserActionState = { userAction: false }
) {
  if (!inited) {
    const eventNames = [
      'touchstart',
      'touchmove',
      'touchend',
      'mousedown',
      'mouseup',
    ]
    eventNames.forEach((eventName) => {
      document.addEventListener(
        eventName,
        function () {
          !userInteract && setUserAction(true)
          userInteract++

          setTimeout(() => {
            !--userInteract && setUserAction(false)
          }, 0)
        },
        passiveOptions
      )
    })
    inited = true
  }
  states.push(vm)
}
function removeInteractListener(vm: UserActionState) {
  const index = states.indexOf(vm)
  if (index >= 0) {
    states.splice(index, 1)
  }
}
export const getInteractStatus = () => !!userInteract

export function useUserAction() {
  const state: UserActionState = reactive({
    /**
     * 是否用户激活
     */
    userAction: false,
  })
  onMounted(() => {
    addInteractListener(state)
  })
  onBeforeUnmount(() => {
    removeInteractListener(state)
  })
  return {
    state,
  }
}
