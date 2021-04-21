import { onMounted, onBeforeUnmount, reactive } from 'vue'

import { passive } from '@dcloudio/uni-shared'

export interface UserActionState {
  userAction: boolean
}

const passiveOptions = passive(true)
const states: UserActionState[] = []
let userInteract: number = 0
let inited: boolean
function addInteractListener(vm: UserActionState) {
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
          states.forEach((vm) => {
            vm.userAction = true
            userInteract++
            setTimeout(() => {
              userInteract--
              if (!userInteract) {
                vm.userAction = false
              }
            }, 0)
          })
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
