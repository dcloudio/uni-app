<template>
    <native-view @init="onInit"></native-view>
</template>
<script setup>
    import {
        CalendarPicker
    } from '@/uni_modules/CalendarPicker'

    const props = defineProps < {
            /**
             * 设置选中项的日期。选中的日期未设置或日期格式不符合规范则为默认值。
             * 默认值：当前系统日期。
             */
            selected ? : Date
            /**
             * 描述日期选中态底板样式。
             * 默认值：底板样式为圆形。
             * 说明：hintRadius为0，底板样式为直角矩形。hintRadius为0 ~ 16，底板样式为圆角矩形。hintRadius>=16，底板样式为圆形
             */
            hintRadius ? : number
            /**
             * 设置选择器与入口组件的对齐方式。
             * 默认end
             * start:  左对齐
             * center: 居中对齐
             * end:    右对齐
             */
            alignType ? : 'start' | 'center' | 'end'
            /**
             * 按照对齐类型对齐后，选择器相对入口组件的水平方向偏移量
             * 默认：0
             */
            offsetX ? : number | string
            /**
             * 按照对齐类型对齐后，选择器相对入口组件的竖直方向偏移量
             * 默认：0
             */
            offsetY ? : number | string
            /**
             * 文本颜色
             */
            color ? : string
            /**
             * 文本尺寸
             */
            fontSize ? : number
            /**
             * 字体粗细
             * Lighter: 100
             * Normal:  400
             * Regular: 400
             * Medium:  500
             * Bold:    700
             * Bolder:  900
             */
            fontWeight ? : 100 | 400 | 500 | 700 | 900
            /**
             * 字体样式
             * normal: 标准的字体样式
             * italic: 斜体的字体样式
             */
            fontStyle ? : 'normal' | 'italic'
        } >
        ()

    const emit = defineEmits < {
        change: [date: Date]
    } > ()

    const picker: CalendarPicker = new CalendarPicker()

    picker.onChange((value: Date) => {
        emit('change', value)
    })

    watchEffect(() => {
        const selected = props.selected
        if (selected != null) {
            picker.setSelected(selected)
        }
    })
    watchEffect(() => {
        const alignType = props.alignType
        if (alignType != null) {
            picker.setAlignType(alignType)
        }
    })
    watchEffect(() => {
        const offsetX = props.offsetX
        if (offsetX != null) {
            picker.setOffsetX(offsetX)
        }
    })
    watchEffect(() => {
        const offsetY = props.offsetY
        if (offsetY != null) {
            picker.setOffsetY(offsetY)
        }
    })
    watchEffect(() => {
        const hintRadius = props.hintRadius
        if (hintRadius != null) {
            picker.setHintRadius(hintRadius)
        }
    })
    watchEffect(() => {
        const color = props.color
        if (color != null) {
            picker.setColor(color)
        }
    })
    watchEffect(() => {
        const fontSize = props.fontSize
        if (fontSize != null) {
            picker.setFontSize(fontSize)
        }
    })
    watchEffect(() => {
        const fontStyle = props.fontStyle
        if (fontStyle != null) {
            picker.setFontStyle(fontStyle)
        }
    })
    watchEffect(() => {
        const fontWeight = props.fontWeight
        if (fontWeight != null) {
            picker.setFontWeight(fontWeight)
        }
    })

    function onInit(event: UniNativeViewInitEvent) {
        picker.init(event.detail.element)
    }
</script>