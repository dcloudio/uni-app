<template>
  <uni-tabbar v-if="hasTabBar" v-show="showTabBar">
    <div
      :style="{
        'flex-direction': direction === 'vertical' ? 'column' : 'row',
        backgroundColor: tabBar.backgroundColor,
      }"
      class="uni-tabbar"
    >
      <template v-for="(item, index) in tabBar.list" :key="item.pagePath">
        <div
          v-if="item.visible !== false"
          class="uni-tabbar__item"
          @click="switchTab(item, index)"
        >
          <div class="uni-tabbar__bd">
            <div
              v-if="showIcon && item.iconPath"
              :class="{ 'uni-tabbar__icon__diff': !item.text }"
              class="uni-tabbar__icon"
            >
              <img
                :src="
                  getRealPath(
                    selectedIndex === index
                      ? item.selectedIconPath
                      : item.iconPath
                  )
                "
              />
              <div
                v-if="item.redDot"
                :class="{ 'uni-tabbar__badge': !!item.badge }"
                class="uni-tabbar__reddot"
              >
                {{ item.badge }}
              </div>
            </div>
            <div
              v-if="item.text"
              :style="{
                color:
                  selectedIndex === index ? tabBar.selectedColor : tabBar.color,
                fontSize: showIcon && item.iconPath ? '10px' : '14px',
              }"
              class="uni-tabbar__label"
            >
              {{ item.text }}
              <div
                v-if="item.redDot && (!showIcon || !item.iconPath)"
                :class="{ 'uni-tabbar__badge': !!item.badge }"
                class="uni-tabbar__reddot"
              >
                {{ item.badge }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </uni-tabbar>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getRealPath } from '@dcloudio/uni-h5'
import { useTabBar } from '@dcloudio/uni-h5'

export default {
  name: 'CustomTabBar',
  props: {
    selected: {
      type: Number,
      default: 0
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal'
    }
  },
  setup(props, { emit }) {
    const tabBar = useTabBar()
    const route = useRoute()
    const hasTabBar = computed(() => tabBar.list && tabBar.list.length)
    const selectedIndex = ref(props.selected)
    watch(() => props.selected, value => selectedIndex.value = value)
    watch(() => selectedIndex.value, value => tabBar.selectedIndex = value)
    watch(() => {
      const meta = route.meta
      return [meta.isTabBar, meta.route]
    }, ([isTabBar, pagePath]) => {
      if (isTabBar) {
        const index = tabBar.list.findIndex(item => pagePath === item.pagePath)
        if (index > -1) {
          selectedIndex.value = index
        }
      }
    })
    function switchTab(item, index) {
      selectedIndex.value = index
      const detail = {
        index,
        text: item.text,
        pagePath: item.pagePath,
      }
      emit('onTabItemTap', detail)
    }

    return {
      tabBar,
      getRealPath,
      selectedIndex,
      hasTabBar,
      showTabBar: true,
      switchTab,
    }
  }
}
</script>

<style>
</style>
