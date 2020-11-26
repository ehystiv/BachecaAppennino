<template>
  <v-list dense three-line flat outlined>
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
    <v-divider />
    <v-list-item-group>
      <template v-for="(comment, index) in comments">
        <v-list-item :key="comment._id" three-line selectable>
          <v-list-item-content>
            <v-list-item-title
              >{{ comment.user.nickname }} -
              <span class="subtitle">{{
                $moment(comment.date).format('DD/MM/YYYY HH:MM')
              }}</span></v-list-item-title
            >
            <div>{{ comment.text }}</div>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="index < comments.length - 1" :key="index" />
      </template>
    </v-list-item-group>
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
          .$put('/api/post', {
            comment: this.userComment,
            id: this.postid,
          })
          .then((res) => {
            if (res.status === 'success') {
              this.$refs.userComment.reset()
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
