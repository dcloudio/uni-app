<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section page-section-gap" style="text-align: center;">
                <audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author"
                    :action="audioAction" controls></audio>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'audio',
                current: {
                    poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/friendship.jpg',
                    name: '友谊地久天长',
                    author: '群星',
                    src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/friendship.mp3',
                },
                audioAction: {
                    method: 'pause'
                }
            }
        },
        methods: {

        },
        components: {
            pageHead
            
        }
    }
</script>
