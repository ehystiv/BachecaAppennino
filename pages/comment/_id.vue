<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="6">
        <PostCard :post="post" class="mb-15" :postid="post._id" />
        <CommentList :comments="post.comment" @refresh="refreshComments()" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from '~/components/PostCard'
import CommentList from '~/components/CommentList'

export default {
  components: {
    PostCard,
    CommentList,
  },

  async asyncData({ params, $axios }) {
    const id = params.id

    const post = await $axios.$get('/api/post?id=' + id)

    return { post: post.post }
  },

  methods: {
    async refreshComments() {
      // const post = await this.$axios.$get('/api/post?id=' + this.post._id)
      // this.post = post
    },
  },
}
</script>

<style></style>
