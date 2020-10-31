<template>
  <v-list dense two-line flat outlined>
    <v-list-item>
      <v-textarea
        ref="userComment"
        v-model="userComment"
        rows="3"
        outlined
        rounded
        class="pt-3"
        label="Commenta"
        :rules="[rules.required]"
        :readonly="!$auth.loggedIn"
      ></v-textarea>
      <v-list-item-action>
        <v-btn
          :disabled="!$auth.loggedIn"
          color="primary"
          @click="postComment()"
          >Commenta</v-btn
        >
      </v-list-item-action>
    </v-list-item>
    <v-list-item v-for="comment in comments" :key="comment._id"> </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'CommentList',

  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    postid: {
      type: String,
      default: () => '',
    },
  },

  data() {
    return {
      userComment: '',

      rules: {
        required: (v) => !!v || 'Campo obbligatorio',
      },
    }
  },

  methods: {
    postComment() {
      if (this.$refs.userComment.validate()) {
        this.$axios
          .$post('/api/post', {
            comment: this.userComment,
            id: this.postid,
          })
          .then((res) => {
            if (res.status === 'success') {
              this.userComment = null
              this.$emit('refresh')
            } else {
              this.$toast.error('Impossibile commentare, riprova più tardi')
            }
          })
          .catch((e) => {
            console.error(e)
            this.$toast.error('Impossibile commentare, riprova più tardi')
          })
      } else {
        console.error('No')
      }
    },
  },
}
</script>

<style></style>
