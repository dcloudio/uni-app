<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-section-title">可以自动聚焦的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" autofocus="autofocus" placeholder="将会获取焦点" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">控制最大输入长度的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" maxlength="10" placeholder="最大输入长度为10" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">实时获取输入值：{{inputValue}}</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" maxlength="10" @input="bindKeyInput" placeholder="输入同步到view中" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">控制输入的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" @input="bindReplaceInput" placeholder="连续的两个1会变成2" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">控制键盘的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" ref="input1" @input="bindHideKeyboard" placeholder="输入123自动收起键盘" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">数字输入的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" type="number" placeholder="这是一个数字输入框" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">密码输入的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" password type="text" placeholder="这是一个密码输入框" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">带小数点的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" type="digit" placeholder="带小数点的数字键盘" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">身份证输入的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" type="idcard" placeholder="身份证输入键盘" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">控制占位符颜色的input</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" placeholder-style="color:#F76260" placeholder="占位符字体是红色的" />
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">带清除按钮的输入框</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" placeholder="带清除按钮的输入框" :value="inputClearValue" @input="bindClearInput"/>
                        <view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-title">可查看密码的输入框</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" placeholder="请输入密码" :password="showPassword"/>
                        <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
                    </view>
                </view>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'input',
                focus: false,
                inputValue: '',
                showClearIcon:false,
                inputClearValue:"",
                showPassword:true,
                src:"../../../static/eye-1.png"
            }
        },
        methods: {
            bindKeyInput: function (e) {
                this.inputValue = e.target.value
            },
            bindReplaceInput: function (e) {
                var value = e.target.value
                var pos = e.target.cursor
                var left
                if (pos !== -1) {
                    // 光标在中间
                    left = e.target.value.slice(0, pos)
                    // 计算光标的位置
                    pos = left.replace(/11/g, '2').length
                }

                // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
                return {
                    value: value.replace(/11/g, '2'),
                    cursor: pos
                }

                // 或者直接返回字符串,光标在最后边
                // return value.replace(/11/g,'2'),
            },
            bindHideKeyboard: function (e) {
                if (e.target.value === '123') {
                    console.log('......................e.target.value=' + e.target.value);
                    // 收起键盘
                    uni.hideKeyboard();
                }
            },
            bindClearInput:function (e) {
                this.inputClearValue = e.target.value;
                if(e.target.value.length > 0){
                    this.showClearIcon = true;
                }else{
                    this.showClearIcon = false;
                }
            },
            clearIcon:function(){
                this.inputClearValue = "";
                this.showClearIcon = false;
            },
            changePassword:function(){
                this.showPassword = !this.showPassword;
            }
        },
        components: {
            pageHead
            
        }
    }
</script>

<style>
    @import "../../../common/uni.css";
    @import "../../../common/icon.css";
    .page-section {
        margin-bottom: 20rpx;
    }
    .uni-list-cell{
        padding: 0 30rpx;
    }
    .uni-input{
        flex: 1;
    }
    .uni-icon{
        color: #999;
    }
</style>
