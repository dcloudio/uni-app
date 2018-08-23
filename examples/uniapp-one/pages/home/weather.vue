<template>
  <div class="weather">
    <div class="date">{{day}}</div>
    <div class="location">
      {{weather.basic.location}}
    </div>
    <img :src="'https://petrify.oss-cn-beijing.aliyuncs.com/weather/' + weather.now.cond_code + '.png'" alt="">
    <div class="cond-text">{{weather.now.cond_txt}}</div>
    <div class="tmp"><span>{{weather.now.tmp}}°C</span></div>
    <div class="fl">体感：<span>{{weather.now.fl}}°C</span></div>
  </div>
</template>

<script>
  const DAY_LIST = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  export default {
    props: {
      weather: Object
    },
    computed: {
      day() {
        const day = new Date().getDay()
        return DAY_LIST[day]
      }
    }
  }
</script>

<style scoped>
  .weather {
    height: 170rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 36rpx;
    justify-content: space-around;
  }
  .date {
    color: #ecc88e;
    font-size: 48rpx;
    font-weight: 700;
    padding: 0 20rpx;
  }
  .location {
    color: #b4b0ad;
  }

  img {
    width: 80rpx;
    height: 80rpx;
  }
  .tmp span, .fl span {
    color: #52b9b6;
  }
</style>
