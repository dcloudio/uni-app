<template>
  <div class="uni-async-loading">
    <i class="uni-loading" />
  </div>
</template>
<style>
	.uni-async-loading {
    box-sizing: border-box;
		width: 100%;
		padding: 50px;
		text-align: center;
	}

	.uni-async-loading .uni-loading {
		width: 30px;
		height: 30px;
	}
</style>
<script>
export default {
  name: 'AsyncLoading'
}
</script>
