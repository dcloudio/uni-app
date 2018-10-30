<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-section-title">实心标签</view>
                <view class="page-section">
                    <view class="tag-view">
                        <uni-tag text="标签"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="primary"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="success"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="warning"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="danger" :circle="true"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="royal" :circle="true"></uni-tag>
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">空心标签</view>
                <view class="page-section">
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="primary"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="success"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="warning"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="danger" :circle="true"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="royal" :circle="true"></uni-tag>
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">点击事件</view>
                <view class="page-section">
                    <view class="tag-view">
                        <uni-tag text="标签" :type="type" @click="setType"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="primary" :circle="true" :inverted="inverted" @click="setInverted"></uni-tag>
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">小标签</view>
                <view class="page-section">
                    <view class="tag-view">
                        <uni-tag text="标签" size="small"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="primary" size="small"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="success" size="small"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="warning" size="small"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="danger" size="small" :circle="true"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="royal" size="small" :circle="true"></uni-tag>
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">不可点击状态</view>
                <view class="page-section">
                    <view class="tag-view">
                        <uni-tag text="标签" :disabled="true"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" type="primary" :disabled="true"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="danger" size="small" :disabled="true"></uni-tag>
                    </view>
                    <view class="tag-view">
                        <uni-tag text="标签" inverted="true" type="royal" size="small" :circle="true" :disabled="true"></uni-tag>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniTag from '@/components/uni-tag.vue'
    export default {
        components: {
            uniTag
        },
        data() {
            return {
                title: 'tag',
                type: 'default',
                inverted: false
            }
        },
        methods: {
            setType() {
                let types = ['default', 'primary', 'success', 'warning', 'danger', 'royal'];
                let index = types.indexOf(this.type);
                types.splice(index, 1)
                let randomIndex = Math.ceil(Math.random() * 5);
                this.type = types[randomIndex];
            },
            setInverted() {
                this.inverted = !this.inverted;
            }
        }
    }
</script>

<style>
    .tag-view {
        margin: 10upx 20upx;
        display: inline-block;
    }
</style>
