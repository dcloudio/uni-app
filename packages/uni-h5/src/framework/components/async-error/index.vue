<template>
  <div
    class="uni-async-error"
    @click="_onClick"
  >
    连接服务器超时，点击屏幕重试
  </div>
</template>
<style>
	.uni-async-error {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		color: #999;
		padding: 100px 0;
		text-align: center;
	}
</style>
<script>
export default {
  name: 'AsyncError',
  methods: {
    _onClick () {
      // TODO 临时采用 reload
      window.location.reload()
    }
  }
}
</script>
