<template>
  <uni-actionsheet @touchmove.prevent>
    <transition name="uni-fade">
      <div
        v-show="visible"
        class="uni-mask"
        @click="_close(-1)" />
    </transition>
    <div
      :class="{'uni-actionsheet_toggle':visible}"
      class="uni-actionsheet">
      <div class="uni-actionsheet__menu">
        <div
          v-for="(title,index) in itemList"
          :key="index"
          :style="{color:itemColor}"
          class="uni-actionsheet__cell"
          @click="_close(index)">{{ title }}</div>
      </div>
      <div class="uni-actionsheet__action">
        <div
          :style="{color:itemColor}"
          class="uni-actionsheet__cell"
          @click="_close(-1)">取消</div>
      </div>
    </div>
  </uni-actionsheet>
</template>
<script>
export default {
  name: 'ActionSheet',
  props: {
    itemList: {
      type: Array,
      default () {
        return []
      }
    },
    itemColor: {
      type: String,
      default: '#000000'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _close (tapIndex) {
      this.$emit('close', tapIndex)
    }
  }
}
</script>
<style>
	uni-actionsheet {
		display: block;
		box-sizing: border-box;
	}

	uni-actionsheet .uni-actionsheet {
		position: fixed;
		left: 0;
		bottom: 0;
		transform: translate(0, 100%);
		backface-visibility: hidden;
		z-index: 999;
		width: 100%;
		background-color: #efeff4;
    visibility: hidden;
    transition-property: transform, visibility;
		transition-duration: 0.3s, 0.3s;
	}

	uni-actionsheet .uni-actionsheet.uni-actionsheet_toggle {
    visibility: visible;
		transform: translate(0, 0);
	}

	uni-actionsheet .uni-actionsheet * {
		box-sizing: border-box;
	}

	uni-actionsheet .uni-actionsheet__menu {
		background-color: #fcfcfd;
	}

	uni-actionsheet .uni-actionsheet__action {
		margin-top: 6px;
		background-color: #fcfcfd;
	}

	uni-actionsheet .uni-actionsheet__cell {
		position: relative;
		padding: 10px 0;
		text-align: center;
		font-size: 18px;
	}

	uni-actionsheet .uni-actionsheet__cell:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}

	uni-actionsheet .uni-actionsheet__cell:active {
		background-color: #ececec;
	}

	uni-actionsheet .uni-actionsheet__cell:first-child:before {
		display: none;
	}
</style>
