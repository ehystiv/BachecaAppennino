<template>
  <div id="navbar">
    <v-app-bar fixed app elevate-on-scroll color="primary" dense>
      <v-spacer />
      <v-toolbar-title class="title" v-text="title.toUpperCase()" />
      <v-spacer />

      <div v-if="!$auth.loggedIn">
        <v-btn color="secondary" text nuxt to="/signup"
          ><v-icon left>mdi-account-box</v-icon>Registrati</v-btn
        >

        <v-btn color="secondary" text @click="dialog = true">
          <v-icon left>mdi-login</v-icon>Accedi</v-btn
        >
      </div>

      <div v-else>
        <v-btn color="secondary" text @click="dialog2 = true">
          <v-icon left>mdi-account</v-icon>{{ $auth.user.nickname }}</v-btn
        >
        <v-btn color="secondary" text @click="$auth.logout()"
          ><v-icon left>mdi-logout</v-icon>Logout</v-btn
        >
      </div>
    </v-app-bar>

    <v-dialog
      v-if="!$auth.loggedIn"
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <LoginDialog @close="dialog = false" />
    </v-dialog>

    <v-dialog
      v-if="$auth.loggedIn"
      v-model="dialog2"
      persistent
      max-width="600px"
    >
      <UserDialog @close="dialog2 = false" />
    </v-dialog>
  </div>
</template>

<script>
import LoginDialog from '~/components/LoginDialog'
import UserDialog from '~/components/UserDialog'

export default {
  components: {
    LoginDialog,
    UserDialog,
  },

  data() {
    return {
      title: 'Bacheca Appennino',
      dialog: false,
      dialog2: false,
    }
  },
}
</script>

<style></style>
