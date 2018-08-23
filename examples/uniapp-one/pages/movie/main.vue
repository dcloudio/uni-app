<template>
  <div class="container">
    <navigator
      v-for="v in movies"
      :key="v.item_id"
      :url="'/pages/movie/detail/main?id=' + v.item_id"
       class="item"
    >
      <movie-detail :movie="v"></movie-detail>
    </navigator>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import movieDetail from '@/components/movieItem'
export default {
  mounted () {
    this.initPage()
  },
  components: {
    movieDetail
  },
  computed: {
    ...mapState('movie', ['movies'])
  },
  methods: {
    ...mapActions('movie', ['getMovieList']),
    async initPage() {
      await this.getMovieList()
    }
  }
}
</script>

<style scoped>
  navigator {
    width: 100%;
  }
  .item {
    width: 100%;
    height: 170rpx;
  }

  .item:nth-child(odd) {
    background-color: #e5e4df;
  }
  .item:nth-child(even) {
    background-color: #eae9e4;
  }
</style>
