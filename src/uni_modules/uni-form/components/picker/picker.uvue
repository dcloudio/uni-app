<template>
    <view @click="handleClick">
        <slot></slot>
    </view>
</template>

<script setup lang="uts">
    import { FORM_KEY } from '../common.uts'
    import { UniPickerElement } from './global.uts'
    import { FormContext } from '../types.uts'
	
    const uuid = `${Date.now()}${Math.floor(Math.random() * 1e7)}`
    const baseEventName = `uni_picker_${uuid}`
    const readyEventName = `${baseEventName}_ready`
    const optionsEventName = `${baseEventName}_options`
    const selectorChangeEventName = `${baseEventName}_selector_change`
    const cancelEventName = `${baseEventName}_cancel_change`
    const multiSelectorChangeEventName = `${baseEventName}_multiSelector_change`
    const timeChangeEventName = `${baseEventName}_time_change`
    const columnChangeEventName = `${baseEventName}_column_change`

    type UniPickerCancelEventDetail = {}

    type UniPickerChangeEventDetail = {
        value : number | string | number[]
    }

    type UniPickerColumnChangeEventDetail = {
        value : number
        column : number
    }

    /**
     * 取消事件触发
     */
    class UniPickerCancelEvent extends UniCustomEvent<UniPickerCancelEventDetail> {
        constructor() {
            super('cancel', {
                detail: {}
            } as UniCustomEventOptions<UniPickerCancelEventDetail>)
        }
    }

    /**
     * change 事件触发
     */
    class UniPickerChangeEvent extends UniCustomEvent<UniPickerChangeEventDetail> {
        constructor(value : number | string | number[]) {
            super('change', {
                detail: { value } as UniPickerChangeEventDetail
            } as UniCustomEventOptions<UniPickerChangeEventDetail>)
        }
    }

    /**
     * 列改变 columnchange 事件触发
     */
    class UniPickerColumnChangeEvent extends UniCustomEvent<UniPickerColumnChangeEventDetail> {
        constructor(column : number, value : number) {
            super('columnchange', {
                detail: { value, column } as UniPickerColumnChangeEventDetail
            } as UniCustomEventOptions<UniPickerColumnChangeEventDetail>)
        }
    }


    type Mode = 'selector' | 'multiSelector' | 'time' | 'date'

    type Fields = 'year' | 'month' | 'day'

	defineOptions({
		name: 'picker',
		// @ts-ignore
		rootElement: {
			class: UniPickerElement
		}
	})

    interface PickerProps {
        /**
         * 是否禁用
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }
         */
        disabled ?: boolean
        /**
         * 选择器类型
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }    
         */
        mode ?: Mode
        /**
         * mode为 selector 或 multiSelector 时，range 有效
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }    
         */
        range ?: string[]
        /**
         * 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }    
         */
        rangeKey ?: string
        /**
         * 表示选择了 range 中的第几个（下标从 0 开始）
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }    
         */
        value ?: number | string | number[]
        /**
         * 表示有效时间范围的开始
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }    
         */
        start ?: string
        /**
         * 表示有效时间范围的结束
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }    
         */
        end ?: string   
        /**
         * 有效值 year,month,day，表示选择器的粒度
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }    
         */
        fields ?: Fields
        /**
         * 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交
         * @uniPlatform {
         *   "app": {
         *     "harmony": {
         *       "unixvVer": "5.0"
         *     }
         *   }
         * }    
         */
        name ?: string
    }

    const props = withDefaults(defineProps<PickerProps>(), {
        disabled: false,
        mode: 'selector',
        range: [],
        rangeKey: '',
        value: '',
        start: '',
        end: '',
        fields: 'day',
        name: ''
    })

    const emit = defineEmits<{
        change : UniPickerChangeEvent
        columnchange : UniPickerColumnChangeEvent
        cancel : UniPickerCancelEvent
    }>()

    const formCtx = inject<FormContext | null>(FORM_KEY, null)

    const innerValue = ref<any>(props.value)
    const initialValue = ref<any>('')
    const isOpening = ref(false)
    const OPEN_LOCK_DURATION = 300
    const DEFAULT_START_YEAR = 1970
    const DEFAULT_END_YEAR = 2099

    watch(() => props.value, (value) => {
        innerValue.value = value

        // 解决数据更新视图不更新的问题
        if (props.mode == 'multiSelector') {
          uni.$emit(optionsEventName, {
            range: props.range,
            rangeKey: props.rangeKey,
            multiSelectorValue: value ?? []
          })
        }
    }, { deep: true })

    function handleClick() {
        if (props.disabled) {
            return
        }

        // 防止重复打开
        if (isOpening.value) {
            return
        }

        isOpening.value = true
        uni.openDialogPage({
            url: `/uni_modules/uni-picker-dom2/pages/picker/picker?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&cancelEventName=${cancelEventName}&selectorChangeEventName=${selectorChangeEventName}&multiSelectorChangeEventName=${multiSelectorChangeEventName}&timeChangeEventName=${timeChangeEventName}&columnChangeEventName=${columnChangeEventName}`,
            success() {
              setTimeout(() => {
                isOpening.value = false
              }, OPEN_LOCK_DURATION)
            },
            fail() {
                isOpening.value = false
                uni.$off(readyEventName)
                uni.$off(optionsEventName)
            }
        })
    }

    function sendOptions(eventName : string) {
        const baseParams = {
            mode: props.mode,
        }
        switch (props.mode) {
            case 'selector':
                baseParams.range = props.range
                baseParams.rangeKey = props.rangeKey
                baseParams.selectorValue = props.value ?? 0
                break
            case 'multiSelector':
                baseParams.range = props.range
                baseParams.rangeKey = props.rangeKey
                baseParams.multiSelectorValue = props.value ?? []
                break
            case 'time':
                baseParams.timeValue = getCurrentTimeValue()
                baseParams.start = parseStartAndEndTime('start')
                baseParams.end = parseStartAndEndTime('end')
                break
            case 'date':
                baseParams.dateValue = getCurrentDateValue()
                baseParams.fields = props.fields
                baseParams.start = parseStartAndEndDate('start')
                baseParams.end = parseStartAndEndDate('end')
        }
        uni.$emit(eventName, baseParams)
    }


    onMounted(() => {
        initialValue.value = props.value
        // register with form if available
        if (formCtx && props.name) {
            formCtx.registerField({
                name: props.name,
                getValue: () => innerValue.value,
                reset: () => { innerValue.value = initialValue.value }
            })
        }

        // 监听页面加载
        uni.$on(readyEventName, () => {
            sendOptions(optionsEventName)
        })

        // 监听取消按钮
        uni.$on(cancelEventName, () => {
            emit('cancel', new UniPickerCancelEvent())
        })

        // 单列change触发
        uni.$on(selectorChangeEventName, (value : number) => {
            innerValue.value = value
            emit('change', new UniPickerChangeEvent(value))
        })

        // 多列change触发
        uni.$on(multiSelectorChangeEventName, (value : number[]) => {
            innerValue.value = value
            emit('change', new UniPickerChangeEvent(value))
        })

        // 日期时间change触发
        uni.$on(timeChangeEventName, (value : string) => {
            innerValue.value = value
            emit('change', new UniPickerChangeEvent(value))
        })

        // 列滚动columnchange 触发
        uni.$on(columnChangeEventName, (column : number, value : number) => {
            emit('columnchange', new UniPickerColumnChangeEvent(column, value))
        })
    })

    onUnmounted(() => {
        if (formCtx && props.name) {
            formCtx.unregisterField(props.name)
        }
        uni.$off(readyEventName)
        uni.$off(selectorChangeEventName)
        uni.$off(multiSelectorChangeEventName)
        uni.$off(timeChangeEventName)
        uni.$off(columnChangeEventName)
        uni.$off(cancelEventName)
    })

    function getCurrentDateValue() {
        const today = parseTime(new Date())
        let date = props.value
        let date_data : string[] = []
        if (date != '' && date != null) {
            let date_val = date.split('-') as string[]

            while (date_val.length < 3) {
                date_val.push('1');
            }
            const year = Number(date_val[0]);
            const startYear = props.start ? Number(props.start.split('-')[0]) : DEFAULT_START_YEAR;
            const endYear = props.end ? Number(props.end.split('-')[0]) : DEFAULT_END_YEAR;

            if (year < startYear) {
                date_val[0] = String(startYear);
            } else if (year > endYear) {
                date_val[0] = String(endYear);
            }

            try {
                const year = Number(date_val[0])
                const month = Number(date_val[1])
                const day = Number(date_val[2])
                date_data = parseTime(new Date(year, month - 1, day))
            } catch (_) {
                date_data = today
            }

        } else {
            date_data = today
        }
        return date_data
    }

    function getCurrentTimeValue() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        // 格式化为 ['02', '10']
        const timeArray = [hours, minutes];
        let time = props.value
        let val : string[]
        if (time) {
            let timeVal = time.split(':')
            if (time.length < 2) {
                val = timeArray
            } else {
                val = formatTime(timeVal)
            }
        } else {
            val = timeArray
        }
        return val
    }

    function formatTime(time : string[]) {
        const formattedHours = String(time[0]).padStart(2, '0');
        const formattedMinutes = String(time[1]).padStart(2, '0');
        return [formattedHours, formattedMinutes]
    }

    function parseTime(date : Date) : string[] {
        // 格式化为YY-MM-DD（两位数补零）
        const year = (date.getFullYear()).toString().padStart(2, '0'); // 取年份后两位
        const month = (date.getMonth() + 1).toString().padStart(2, '0');    // 月份范围1-12
        const day = date.getDate().toString().padStart(2, '0');
        return [year, month, day]
    }

    function parseStartAndEndTime(type : 'start' | 'end') {
        let time = props[type]
        let defaultVal = ['00', '00']
        if (type == 'end') {
            defaultVal = ['23', '59']
        }
        let val : string[]
        if (time) {
            let timeVal = time.split(':')
            if (time.length < 2) {
                val = defaultVal
            } else {
                val = formatTime(timeVal)
            }
        } else {
            return defaultVal
        }
        return val
    }

    function parseStartAndEndDate(type : 'start' | 'end') : string[] {
        const dateStr = props[type]
        // 默认值设置
        const defaultDate = type == 'start'
            ? [String(DEFAULT_START_YEAR), '01', '01']  // 起始默认日期
            : [String(DEFAULT_END_YEAR), '12', '31']; // 结束默认日期

        // 空值直接返回默认
        if (dateStr == null || dateStr.length == 0) return defaultDate;

        // 分割日期字符串
        const parts = dateStr.split('-');
        if (parts.length != 3) return defaultDate;

        // 格式化各部分（补零 + 截取）
        const formatPart = (value : string, length : number) => {
            return value.padStart(length, '0').slice(0, length);
        };

        const year = formatPart(parts[0], 4);  // 年份补足4位
        const month = formatPart(parts[1], 2); // 月份补足2位
        const day = formatPart(parts[2], 2);   // 日期补足2位

        return [year, month, day];
    }
</script>