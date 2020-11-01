<template>
  <v-container fluid>
    <v-row justify="center" align="start">
      <v-col cols="12" sm="12" md="4" lg="4">
        <PostBox @reload="reload()" />
        <FAQ />
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="8">
        <div v-for="post in posts" :key="post._id">
          <PostCard :post="post" :comment="false" />
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
    const { posts } = await $axios.$get('/api/post')

    return { posts }
  },
  data() {
    return {}
  },

  mounted() {
    setInterval(() => this.$nuxt.refresh(), 1000 * 60 * 10)
  },

  methods: {
    reload() {
      this.$axios
        .$get('/api/post')
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
