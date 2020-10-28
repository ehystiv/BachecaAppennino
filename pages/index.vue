<template>
  <v-container fluid>
    <v-row justify="center" align="start">
      <v-col sm="12" md="4" lg="4">
        <v-card color="accent" outlined flat>
          <v-card-title>Posta!</v-card-title>
          <v-container fluid>
            <v-form ref="postForm" :disabled="!$auth.loggedIn">
              <v-text-field
                v-model="newPost.title"
                outlined
                label="Titolo"
                counter="50"
                :rules="[rules.maxLenght]"
                maxlength="50"
              >
              </v-text-field>
              <v-textarea
                v-model="newPost.text"
                outlined
                rows="3"
                dense
                label="Scrivi quel che pensi..."
              ></v-textarea>
              <v-checkbox
                v-model="newPost.anon"
                label="Posta anonimamente"
              ></v-checkbox>
            </v-form>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="!$auth.loggedIn" @click="postIt()">Posta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col sm="12" md="8" lg="8">
        <v-card v-for="post in posts" :key="post._id" class="mb-2">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},

  async asyncData({ $axios }) {
    const { posts } = await $axios.$get('/api/getpost')

    return { posts }
  },
  data() {
    return {
      newPost: {
        title: null,
        text: null,
        anon: false,
      },

      rules: {
        maxLenght: (v) =>
          v ? v.length <= 50 : false || 'Massimo 50 caratteri',
      },
    }
  },

  methods: {
    postIt() {
      if (this.$refs.postForm.validate()) {
        this.$axios
          .$post('/api/postit', {
            post: this.newPost,
            user: this.$auth.user._id,
          })
          .then((res) => {
            if (res.status === 'success') this.reload()
            this.$refs.postForm.reset()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },

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
