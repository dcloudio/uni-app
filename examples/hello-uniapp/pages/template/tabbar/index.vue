<template>
    <view class="index">
        <scroll-view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft" >
            <block v-for="(tab,index) in tabs" :key="tab.id">
                <view :class="['swiper-tab-list',currentTab==index ? 'on' : '']" :id="tab.id" :data-current="index" @tap="swichNav">{{tab.name}}</view>
            </block>
        </scroll-view>
        <swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
            <block v-for="(tab,index1) in newsitems" :key="index1">
                <swiper-item>
                    <scroll-view class="index-bd" scroll-y @scrolltolower="loadMore(index1)">
                        <block v-for="(newsitem,index2) in tab" :key="index2">
                            <view class="tab-list">{{newsitem.name}}-{{newsitem.label}}</view>
                        </block>
                    </scroll-view>
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                title: 'tabbar',
                scrollLeft:0,
                isClickChange:false,
                currentTab: 0,
                tabs: [{
                    name: '关注',
                    id: 'guanzhu'
                }, {
                    name: '推荐',
                    id: 'tuijian'
                }, {
                    name: '体育',
                    id: 'tiyu'
                }, {
                    name: '热点',
                    id: 'redian'
                }, {
                    name: '财经',
                    id: 'caijing'
                }, {
                    name: '娱乐',
                    id: 'yule'
                }, {
                    name: '军事',
                    id: 'junshi'
                }, {
                    name: '历史',
                    id: 'lishi'
                }, {
                    name: '本地',
                    id: 'bendi'
                }],
                newsitems: []
            }
        },
        onLoad: function () {
            this.newsitems = this.randomfn()
        },
        methods: {
            bindChange:async function (e) {
                let index = e.target.current;
                if(this.isClickChange){
                  this.currentTab = index;
                  this.isClickChange = false;
                  return;
                }
                let tabBar = await this.getWidth("tab-bar"),tabBarScrollLeft = tabBar.scrollLeft;
                console.log("tabBar"+tabBarScrollLeft);
                
                let width = 0;
                
                for(let i = 0;i<index;i++){
                  let result = await this.getWidth(this.tabs[i].id);
                  width += result.width;
                }
                
                let winWidth = uni.getSystemInfoSync().windowWidth,nowElement = await this.getWidth(this.tabs[index].id),nowWidth = nowElement.width;
                console.log("scrollLeft=",this.scrollLeft,";width=",width,";nowWidth=",nowWidth); //左边距离不够向左滑动时滑动距离登录左边元素宽度之和；右边距离不够向右滑动，滑动距离是前面所有元素宽之和+当前元素宽-屏幕的宽度。
                
                if(width + nowWidth - tabBarScrollLeft > winWidth){
                  console.log("向右移动")
                  this.scrollLeft = width + nowWidth - winWidth; 
                }
                if(width < tabBarScrollLeft){
                  console.log("向左移动");
                  this.scrollLeft = width;
                }
                this.isClickChange = false;
                this.currentTab = index;//一旦访问data就会出问题
            },
            getWidth:function(id){//得到元素的宽高
              return new Promise((res,rej) => {
                uni.createSelectorQuery().select("#"+id).fields({
                  size: true,
                  scrollOffset: true
                }, function(data){
                  if(id ==='tab-bar'){console.log("id=",id,"数据:",data)}
                  res(data);
                }).exec();
              })
            },
            swichNav: async function (e) {//点击tab-bar
                if (this.currentTab === e.target.dataset.current) {
                    return false;
                } else {
                  let tabBar = await this.getWidth("tab-bar"),tabBarScrollLeft = tabBar.scrollLeft;//点击的时候记录并设置scrollLeft
                  console.log("tabBar"+tabBarScrollLeft);
                  this.scrollLeft = tabBarScrollLeft;
                  this.isClickChange = true;
                  this.currentTab = e.target.dataset.current
                }
            },
            loadMore:function(e){
              let last = this.newsitems[e][this.newsitems[e].length-1].label,
                  name = this.newsitems[e][this.newsitems[e].length-1].name;
              for(let i = 1; i<= 10; i++) {
              	this.newsitems[e].push({name:name,label: i + last});
              }
            },
            randomfn () {
                let ary = [];
                for(let i=0,length=this.tabs.length; i < length; i++){
                  let aryItem = [];
                  for(let j = 1; j<= 20; j++) {
                    aryItem.push({name:this.tabs[i].name,label: j});
                  }
                  ary.push(aryItem);
                }
                return ary;
            }
        }
    }
</script>

<style>
    .index{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .index-bd {
        padding: 0 30rpx;
        width: 690rpx;
        height: 100%;
    }

    .swiper-tab {
        width: 100%;
        white-space: nowrap;
        line-height: 64rpx;
        height: 64rpx;
    }


    .swiper-tab-list {
        font-size: 30rpx;
        width: 150rpx;
        display: inline-block;
        text-align: center;
        color: #777777;
    }

    .on {
        color: #FF0000;
        border-bottom: 5rpx solid #FF0000;
    }

    .swiper-box {
        flex: 1;
        width: 100%;
        height: calc(100vh - 64rpx);
    }

    .swiper-box view {
        text-align: center;
    }

    .tab-list {
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        text-align: left;
        border-bottom: 1px solid #EFEFF4;
    }
</style>
