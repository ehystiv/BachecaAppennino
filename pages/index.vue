<template>
  <v-container fluid>
    <v-row justify="center" align="start">
      <v-col sm="12" md="12" lg="4">
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
      <v-col sm="12" md="12" lg="8">
        <v-card v-for="post in posts" :key="post._id">
          <v-card-title>{{ post.text }}</v-card-title>
          <v-card-subtitle
            >{{ post.anon ? post.author.anon_name : post.author.nickname }} -
            {{ $moment(post.date).format('DD/MM/YYYY HH:MM') }}</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      newPost: {
        title: null,
        text: null,
        anon: false,
      },

      posts: [],

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
            console.log(res.status, res.error)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },

  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
