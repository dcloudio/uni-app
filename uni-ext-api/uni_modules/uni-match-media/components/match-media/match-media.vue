<template>
    <view :class="{ 'uni-match-media-hidden': !show }">
        <slot></slot>
    </view>
</template>

<script setup lang="uts">
    import { UniMatchMediaElement } from './global.uts'

    const RE_MQ_FEATURE = /^(min|max)?([A-Z]?[a-z]+)(?:([A-Z])([a-z]+))?$/

    type Expression = {
        feature : string
        modifier : string
        value : string
    }

   type Values = {
        orientation ?: string
        width ?: number
        height ?: number
   }


    interface MatchMediaProps {
        orientation? : string;
        width?: string | number;
        minWidth?: string | number;
        maxWidth?: string | number;
        height?: string | number;
        minHeight?: string | number;
        maxHeight?: string | number;
    }

    const props = withDefaults(defineProps<MatchMediaProps>(), {
        orientation: 'portrait',
        width: '',
        minWidth: '',
        maxWidth: '',
        height: '',
        minHeight: '',
        maxHeight: '',
    })

    defineOptions({
        name: 'match-media',
        // @ts-ignore
        rootElement: {
            class: UniMatchMediaElement
        }
    })

    const show = ref(true)

    onMounted(() => {
        const expressions: Expression[] = getExpressions()
        const { windowWidth, windowHeight } = uni.getWindowInfo()
        show.value = isValid(expressions, {
            width: windowWidth,
            height: windowHeight,
            orientation: uni.getSystemInfoSync().deviceOrientation,
        })
    })

    onResize((res : OnResizeOptions) => {
        const expressions: Expression[] = getExpressions()
        show.value = isValid(expressions, {
            width: res.size.windowWidth,
            height: res.size.windowHeight,
            orientation: res.deviceOrientation,
        })
    })

    watch(props, () => {
        const expressions: Expression[] = getExpressions()
        const { windowWidth, windowHeight } = uni.getWindowInfo()
        show.value = isValid(expressions, {
            width: windowWidth,
            height: windowHeight,
            orientation: uni.getSystemInfoSync().deviceOrientation,
        })
    })

    function getExpressions() {
        const expressions : Expression[] = [];
        Object.keys(props).forEach((key) => {
            const value = props[key as keyof MatchMediaProps];
            const feature = key.match(RE_MQ_FEATURE);
            if (value != null && feature != null && feature.length > 0) {
                expressions.push({
                    modifier: feature[1] != null ? feature[1]! : '',
                    feature: feature[2] != null ? feature[2]!.toLowerCase() : '',
                    value
                });
            }
        })
        return expressions
    }


    function isValid(expressions: Expression[], values : Values) {
        return expressions.every((expression) => {
            switch (expression.feature) {
                case 'orientation':
                    return values.orientation === props.orientation
                case 'width':
                case 'height':
                    break
            }

            if (expression.value === '') {
               return true
            }

            const expressionValue = values[expression.feature] as number
            switch (expression.modifier) {
                case 'min': return parseFloat(expression.value) <= expressionValue;
                case 'max': return parseFloat(expression.value) >= expressionValue;
                default: return parseFloat(expression.value) === expressionValue;
            }
        })
    }

</script>

<style>
.uni-match-media-hidden {
    display: none;
}
</style>