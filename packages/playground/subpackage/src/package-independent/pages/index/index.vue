<template>
  <view class="independent-page">
    <text class="message">{{ fromStore }}</text>
    <text class="message">{{ globalValue }}</text>
    <independent-card :message="pluginValue"></independent-card>
    <native-badge text="native-ready"></native-badge>
    <image class="logo" src="../../static/logo.png"></image>
  </view>
</template>

<script>
import IndependentCard from '../../components/independent-card/independent-card.vue'

export default {
  components: {
    IndependentCard,
  },
  data() {
    return {
      fromStore: 'independent-local-ready',
      globalValue: 'independent-global-ready',
      pluginValue: 'independent-plugin-ready',
    }
  },
}
</script>

<style>
.independent-page {
  padding: 16px;
}
.logo {
  width: 64px;
  height: 64px;
}
.message {
  color: #1f6feb;
}
</style>
