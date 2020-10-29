<template>
  <v-card color="accent" outlined flat class="mb-5">
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
</template>

<script>
export default {
  name: 'PostBox',

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
            if (res.status === 'success') {
              this.$emit('reload')
              this.$refs.postForm.reset()
              this.$toast.success('Postato!')
            } else if (res.status === 'failed') {
              this.$toast.error('Impossibili postare, riprova più tardi')
            }
          })
          .catch((err) => {
            console.log(err)
            this.$toast.error('Impossibili postare, riprova più tardi')
          })
      }
    },
  },
}
</script>

<style></style>
