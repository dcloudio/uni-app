import { ref, computed, onMounted, defineComponent } from 'vue'

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
    const { clazz, onChange } = useAppClass()

    return () => (
      <uni-app class={clazz.value}>
        <Layout onChange={onChange} />
      </uni-app>
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
  function onChange(type: string, value: boolean) {
    if (type === 'showTabBar') {
      showTabBar.value = value
    } else if (type === 'showMaxWidth') {
      showMaxWidth.value = value
    }
  }
  const clazz = computed(() => {
    return {
      'uni-app--showtabbar': showTabBar.value,
      'uni-app--maxwidth': showMaxWidth.value,
    }
  })
  return {
    clazz,
    onChange,
  }
}
