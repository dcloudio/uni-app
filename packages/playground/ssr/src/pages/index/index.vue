<template>
  <!-- <text v-if="item">{{ item.title }}</text>
  <text v-else>...</text>
  <ssr-cover-image />
  <ssr-cover-view />
  <ssr-icon />
  <ssr-image /> -->
  <!-- <ssr-match-media /> -->
  <!-- <ssr-movable-area /> -->
  <!-- <ssr-progress />
  <ssr-scroll-view />
  <ssr-swiper />
  <ssr-text />
  <ssr-view />
  <ssr-button />
  <ssr-canvas />
  <ssr-editor />
  <ssr-form />
  <ssr-label />
  <ssr-navigator />
  <ssr-rich-text />
  <ssr-textarea />
  <ssr-slider />
  <ssr-map />
  <ssr-picker-view />
  <ssr-picker /> -->
  <ssr-webview />

  <!-- <ssr-video /> dataOptions is not a function -->
  <view id="ssr-log"></view>
</template>

<script>
const id = 1;
export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  computed: {
    // display the item from store state.
    item() {
      return this.$store.state.items[id]
    }
  },
  // Server-side only
  // This will be called by the server renderer automatically
  serverPrefetch() {
    // return the Promise from the action
    // so that the component waits before rendering
    return this.fetchItem()
  },
  // Client-side only
  mounted() {
    // If we didn't already do it on the server
    // we fetch the item (will first show the loading text)
    if (!this.item) {
      this.fetchItem()
    }
  },
  methods: {
    fetchItem() {
      return this.$store.dispatch('fetchItem', id)
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
