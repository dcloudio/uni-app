<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class="uni-padding-wrap">
            <view class="icon-item" v-for="(item,index) in iconClassList" :key="index">
                <uni-icon size="40" :type="item" :color="activeIndex === index?'#007aff':'#8f8f94'" @click="switchActive(index)"></uni-icon>
            </view>
        </view>
    </view>
</template>

<script>
    import uniIcon from '../../../components/uni-icon.vue'
    export default {
        data() {
            return {
                iconClassList: [
                    'contact',
                    'person',
                    'personadd',
                    'contact-filled',
                    'person-filled',
                    'personadd-filled',
                    'phone',
                    'email',
                    'chatbubble',
                    'chatboxes',
                    'phone-filled',
                    'email-filled',
                    'chatbubble-filled',
                    'chatboxes-filled',
                    'weibo',
                    'weixin',
                    'pengyouquan',
                    'chat',
                    'qq',
                    'videocam',
                    'camera',
                    'mic',
                    'location',
                    'mic-filled',
                    'location-filled',
                    'micoff',
                    'image',
                    'map',
                    'compose',
                    'trash',
                    'upload',
                    'download',
                    'close',
                    'redo',
                    'undo',
                    'refresh',
                    'star',
                    'plus',
                    'minus',
                    'circle',
                    'clear',
                    'refresh-filled',
                    'star-filled',
                    'plus-filled',
                    'minus-filled',
                    'circle-filled',
                    'checkbox-filled',
                    'closeempty',
                    'refreshempty',
                    'reload',
                    'starhalf',
                    'spinner',
                    'spinner-cycle',
                    'search',
                    'plusempty',
                    'forward',
                    'back',
                    'checkmarkempty',
                    'home',
                    'navigate',
                    'gear',
                    'paperplane',
                    'info',
                    'help',
                    'locked',
                    'more',
                    'flag',
                    'home-filled',
                    'gear-filled',
                    'info-filled',
                    'help-filled',
                    'more-filled',
                    'settings',
                    'list',
                    'bars',
                    'loop',
                    'paperclip',
                    'eye',
                    'arrowup',
                    'arrowdown',
                    'arrowleft',
                    'arrowright',
                    'arrowthinup',
                    'arrowthindown',
                    'arrowthinleft',
                    'arrowthinright',
                    'pulldown',
                    'scan'
                ],
                title: 'icon',
                activeIndex: -1
            };
        },
        components: {
            uniIcon
        },
        methods: {
            switchActive(index) {
                this.activeIndex = index
            }
        }
    }
</script>

<style>
    .icon-item {
        display: inline-flex;
        width: 105upx;
        height: 105upx;
        margin: 5upx;
        justify-content: center;
    }
</style>
