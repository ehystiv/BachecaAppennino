<template>
  <v-container fluid>
    <v-row justify="center" align="start">
      <v-col sm="12" md="4" lg="4">
        <PostBox @reload="realod()" />
        <FAQ />
      </v-col>
      <v-col sm="12" md="8" lg="8">
        <div v-for="post in posts" :key="post._id">
          <PostCard :post="post" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FAQ from '~/components/Faq'
import PostCard from '~/components/PostCard'
import PostBox from '~/components/PostBox'

export default {
  components: { FAQ, PostCard, PostBox },

  async asyncData({ $axios }) {
    const { posts } = await $axios.$get('/api/getpost')

    return { posts }
  },
  data() {
    return {}
  },

  methods: {
    reload() {
      this.$axios
        .$get('/api/getpost')
        .then((res) => (this.posts = res.posts))
        .catch((e) => {
          console.error(e)
        })
    },
  },

  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
