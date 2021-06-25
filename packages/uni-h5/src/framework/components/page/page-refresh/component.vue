<template>
  <uni-page-refresh>
    <div :style="{ 'margin-top': offset + 'px' }" class="uni-page-refresh">
      <div class="uni-page-refresh-inner">
        <svg
          :fill="color"
          class="uni-page-refresh__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <svg
          class="uni-page-refresh__spinner"
          width="24"
          height="24"
          viewBox="25 25 50 50"
        >
          <circle
            :stroke="color"
            class="uni-page-refresh__path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="4"
            stroke-miterlimit="10"
          />
        </svg>
      </div>
    </div>
  </uni-page-refresh>
</template>
<script lang="ts">
import { usePageMeta } from '../../../setup/provide'
export default {
  name: 'PageRefresh',
  setup() {
    const { pullToRefresh } = usePageMeta()
    return {
      offset: pullToRefresh!.offset,
      color: pullToRefresh!.color,
    }
  },
}
</script>
