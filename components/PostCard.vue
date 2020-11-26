<template>
  <v-card elevation="24" shaped class="mb-2">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle
      >{{ post.anon ? post.author.anon_name : post.author.nickname }}
      <span v-if="post.author.frazione && !post.anon"
        >da {{ post.author.frazione }}
      </span>
      -
      {{ $moment(post.date).format('DD/MM/YYYY HH:MM') }}</v-card-subtitle
    >
    <v-card-text class="body-1 black--text">{{ post.text }}</v-card-text>
    <v-card-actions v-if="comment">
      <v-spacer />
      <v-btn text :to="'/comment/' + post._id" nuxt
        >Visualizza commenti ({{ post.comment.length }})</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PostCard',

  props: {
    post: {
      type: Object,
      default: () => {},
    },
    comment: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style></style>
