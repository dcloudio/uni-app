<template>
  <block>
    <v-article
      :title="currentMovie.title"
      :user_name="currentMovie.user ? currentMovie.user.user_name : ''"
      :content="currentMovie.content || ''"
      :summary="currentMovie.summary || ''"
    ></v-article>
  </block>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import article from '@/components/article'
export default {
  onLoad(query) {
    this.clearMovieDetail()
    const { id } = query
    this.initPage(id)
  },
  components: {
    'v-article': article
  },
  computed: {
    ...mapState('movie', ['currentMovie'])
  },
  methods: {
    ...mapActions('movie', ['getMovieDetail', 'clearMovieDetail']),
    async initPage(id) {
      await this.getMovieDetail(id)
    }
  }
}
</script>

<style scoped>

</style>
