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
  },
}
</script>

<style></style>
