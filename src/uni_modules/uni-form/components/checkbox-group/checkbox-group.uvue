<template>
  <view flatten>
    <slot></slot>
  </view>
</template>

<script lang="uts" setup>
  import { CHECKBOX_GROUP_KEY, FORM_KEY } from '../common.uts'
  import { UniCheckboxGroupElement } from './global.uts'
  import { CheckboxGroupContext, FormContext } from '../types.uts'

  interface CheckboxGroupProps {
    /**
     * 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
    name?: string;
  }

  const props = withDefaults(defineProps<CheckboxGroupProps>(), {
    name: ''
  })

  defineOptions({
    name: 'checkbox-group',
    // @ts-ignore
    rootElement: {
      class: UniCheckboxGroupElement
    }
  })

    // #ifdef WEB
    class UniCustomEvent<T> {
      detail : T
      constructor(type : string, detail : T) {
        // this.type = type
        this.detail = detail
      }
    }
    // #endif

  type UniCheckboxGroupChangeEventDetail = {
    value : Array<string>
  }

  class UniCheckboxGroupChangeEvent extends UniCustomEvent<UniCheckboxGroupChangeEventDetail> {
    constructor(value : Array<string>) {
      super('change', { value } as UniCheckboxGroupChangeEventDetail)
    }
  }

  const emit = defineEmits<{
    change: [event: UniCheckboxGroupChangeEvent]
  }>()

  // selected values maintained by group
  const selectedValues = ref<Array<string>>([])
  // Track initial selection and child setters for reset
  const initialSelected = ref<Array<string>>([])
  const childSetters = new Map<string, (checked : boolean) => void>()
  // Track selection order to maintain correct sequence
  let elementOrderCounter = 0
  const elementOrderMap = new Map<string, number>()

  const ensureIncluded = (value : string) => {
    if (selectedValues.value.indexOf(value) === -1) {
      selectedValues.value.push(value)
    }
  }

  const ensureExcluded = (value : string) => {
    const i = selectedValues.value.indexOf(value)
    if (i !== -1) {
      selectedValues.value.splice(i, 1)
    }
  }

  const updateSelection = (value : string, checked : boolean) => {
    if (checked) {
      ensureIncluded(value)
    } else {
      ensureExcluded(value)
    }
  }

  const dispatchEvent = () => {
    // Sort by element order to maintain sequence
    const sortedValues = selectedValues.value.slice().sort((a, b) => {
      const orderA = elementOrderMap.get(a) ?? 0
      const orderB = elementOrderMap.get(b) ?? 0
      return orderA - orderB;
    });
    emit('change', new UniCheckboxGroupChangeEvent(sortedValues))
  }

  const ctx : CheckboxGroupContext = {
    register: (value : string, checked : boolean, setChecked : (checked : boolean) => void) => {
      childSetters.set(value, setChecked)
      elementOrderMap.set(value, elementOrderCounter++)
      updateSelection(value, checked)
      // record initial snapshot on first register per value
      if (initialSelected.value.indexOf(value) === -1 && checked) {
        initialSelected.value.push(value)
      }
    },
    unregister: (value : string) => {
      ensureExcluded(value)
      childSetters.delete(value)
      elementOrderMap.delete(value)
    },
    toggle: (value : string, checked : boolean, emitChange : boolean) => {
      updateSelection(value, checked)
      if (emitChange) {
        dispatchEvent()
      }
    },
    isChecked: (value : string) : boolean => {
      return selectedValues.value.indexOf(value) !== -1
    },
    name: props.name
  }

  provide(CHECKBOX_GROUP_KEY, ctx)

  const formCtx = inject<FormContext | null>(FORM_KEY, null)

  onMounted(() => {
    if (formCtx && props.name) {
      // Initialize initialSelected after all children mounted (best-effort)
      // Using a microtask to let children register first
      initialSelected.value = selectedValues.value.slice()
      formCtx.registerField({
        name: props.name,
        getValue: () => selectedValues.value.slice(),
        reset: () => {
          // reset children via stored setters
          const initial = new Set<string>(initialSelected.value)
          // Update selectedValues first to avoid thrashing
          selectedValues.value = initialSelected.value.slice()
          childSetters.forEach((setChecked, val) => {
            setChecked(initial.has(val))
          })
          dispatchEvent()
        }
      })
    }
  })

  onUnmounted(() => {
    if (formCtx && props.name) {
      formCtx.unregisterField(props.name)
    }
    elementOrderMap.clear()
    elementOrderCounter = 0
  })
</script>