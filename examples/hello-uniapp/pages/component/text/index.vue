<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section page-section-spacing">
                <view class="text-box" scroll-y="true">
                    <text>{{text}}</text>
                </view>
                <button :disabled="!canAdd" @tap="add">add line</button>
                <button :disabled="!canRemove" @tap="remove">remove line</button>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data() {
            return {
                title: 'text',
                texts: [
                    'HBuilder，200万开发者选择的IDE',
                    'MUI，轻巧、漂亮的前端开源框架',
                    'wap2app，M站快速转换原生体验的App',
                    '5+Runtime，为HTML5插上原生的翅膀',
                    'HBuilderX，轻巧、极速，极客编辑器',
                    'Uni-app，终极跨平台方案',
                    'HBuilder，200万开发者选择的IDE',
                    'MUI，轻巧、漂亮的前端开源框架',
                    'wap2app，M站快速转换原生体验的App',
                    '5+Runtime，为HTML5插上原生的翅膀',
                    'HBuilderX，轻巧、极速，极客编辑器',
                    'Uni-app，终uni-app台方案',
                    '......'
                ],
                text: '',
                canAdd: true,
                canRemove: false,
                extraLine: []
            }
        },
        methods: {
            add: function (e) {
                this.extraLine.push(this.texts[this.extraLine.length % 12])
                this.text = this.extraLine.join('\n'),
                    this.canAdd = this.extraLine.length < 12,
                    this.canRemove = this.extraLine.length > 0
            },
            remove: function (e) {
                if (this.extraLine.length > 0) {
                    this.extraLine.pop()
                    this.text = this.extraLine.join('\n'),
                        this.canAdd = this.extraLine.length < 12,
                        this.canRemove = this.extraLine.length > 0
                }
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    .text-box {
        margin-bottom: 70rpx;
        padding: 40rpx 0;
        display: flex;
        min-height: 300rpx;
        background-color: #FFFFFF;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 30rpx;
        color: #353535;
        line-height: 2em;
    }
</style>
