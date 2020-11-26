<template>
  <div id="navbar">
    <v-app-bar fixed app elevate-on-scroll color="primary" dense>
      <v-spacer />
      <v-icon v-if="!$vuetify.breakpoint.mobile" dense color="black"
        >fas fa-mountain</v-icon
      >
      <v-toolbar-title class="title" v-text="title.toUpperCase()" />
      <v-icon v-if="!$vuetify.breakpoint.mobile" dense color="black"
        >fas fa-mountain</v-icon
      >
      <v-spacer />
      <v-btn icon nuxt to="/"><v-icon color="black">fas fa-home</v-icon></v-btn>

      <div v-if="!$auth.loggedIn">
        <v-btn icon color="secondary" text nuxt to="/signup"
          ><v-icon dense color="black">fas fa-user-plus</v-icon></v-btn
        >
        <v-btn color="secondary" text icon @click="dialog = true">
          <v-icon dense color="black">fas fa-sign-in-alt</v-icon></v-btn
        >
      </div>

      <div v-else>
        <v-btn
          color="secondary"
          :text="!$vuetify.breakpoint.mobile"
          :icon="$vuetify.breakpoint.mobile"
          @click="dialog2 = true"
        >
          <v-icon :left="!$vuetify.breakpoint.mobile" dense color="black"
            >fas fa-user</v-icon
          >{{ $vuetify.breakpoint.mobile ? '' : $auth.user.nickname }}</v-btn
        >
        <v-btn color="secondary" icon @click="$auth.logout()"
          ><v-icon dense color="black">fas fa-sign-out-alt</v-icon></v-btn
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
export default {
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
