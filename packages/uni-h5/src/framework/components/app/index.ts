import {
  ref,
  onMounted,
  computed,
  openBlock,
  createBlock,
  createVNode,
  defineComponent,
} from 'vue'

import Layout from './layout'

import { updateCssVar } from '../../../helpers/dom'

const CSS_VARS = [
  '--status-bar-height',
  '--top-window-height',
  '--window-left',
  '--window-right',
  '--window-margin',
]

export default defineComponent({
  name: 'App',
  setup() {
    useCssVar()
    useAppLifecycle()
    const { appClass, onLayoutChange } = useAppClass()

    return () => (
      openBlock(),
      createBlock(
        'uni-app',
        {
          class: appClass.value,
        },
        [
          createVNode(
            Layout,
            {
              onChange: onLayoutChange,
            },
            null,
            8 /* PROPS */,
            ['onChange']
          ),
        ],
        2 /* CLASS */
      )
    )
  },
})

function useCssVar() {
  CSS_VARS.forEach((name) => updateCssVar(name, '0px'))
}

function useAppLifecycle() {
  onMounted(() => {
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        UniServiceJSBridge.emit('onAppEnterForeground')
      } else {
        UniServiceJSBridge.emit('onAppEnterBackground')
      }
    })
  })
}

function useAppClass() {
  const showTabBar = ref(false)
  const showMaxWidth = ref(false)
  function onLayoutChange(type: string, value: boolean) {
    if (type === 'showTabBar') {
      showTabBar.value = value
    } else if (type === 'showMaxWidth') {
      showMaxWidth.value = value
    }
  }
  const appClass = computed(() => {
    return {
      'uni-app--showtabbar': showTabBar.value,
      'uni-app--maxwidth': showMaxWidth.value,
    }
  })
  return {
    appClass,
    onLayoutChange,
  }
}
