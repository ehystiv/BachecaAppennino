<template>
  <div id="navbar">
    <v-app-bar fixed app collapse-on-scroll color="primary" dense>
      <v-spacer />
      <v-toolbar-title v-text="title.toUpperCase()" />
      <v-spacer />
      <v-btn v-if="!$auth.loggedIn" color="secondary" text nuxt to="/signup"
        >Registrati</v-btn
      >
      <v-btn
        v-if="!$auth.loggedIn"
        color="secondary"
        text
        @click="dialog = true"
        >Accedi</v-btn
      >
      <v-btn v-if="$auth.loggedIn" color="secondary" text>
        {{ $auth.user.nickname }}</v-btn
      >
      <v-btn
        v-if="$auth.loggedIn"
        color="secondary"
        text
        @click="$auth.logout()"
        >Logout</v-btn
      >
    </v-app-bar>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Accedi</span>
        </v-card-title>
        <v-card-text>
          <v-alert
            :value="loginError"
            color="error"
            transition="slide-x-transition"
          >
            Tutti i dati sono obbligatori e devono essere validi
          </v-alert>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  ref="emailField"
                  v-model="login.email"
                  label="Email"
                  required
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="passwordField"
                  v-model="login.password"
                  label="Password"
                  type="password"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Chiudi
          </v-btn>
          <v-btn color="blue darken-1" text @click="_login()"> Accedi </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Bacheca Appennino',
      dialog: false,

      login: {
        email: null,
        password: null,
      },

      rules: {
        required: (v) => !!v || 'Campo obbligatorio',
        email: (v) => /.+@.+\..+/.test(v) || "L'email deve essere valida",
      },

      loginError: false,
    }
  },

  methods: {
    async _login() {
      if (
        this.$refs.emailField.validate() &&
        this.$refs.passwordField.validate()
      ) {
        await this.$auth
          .loginWith('local', { data: this.login })
          .then(() => {
            this.$nuxt.$loading.finish()
            this.dialog = false
            this.$toast.success('Login effettuato')
          })
          .catch((e) => {
            const code = e.response?.status

            if (code === 471) console.log('No user')

            if (code === 472) console.log('Wrong pass')
          })
      } else {
        this.loginError = true
        setTimeout(() => (this.loginError = false), 5000)
      }
    },
  },
}
</script>

<style></style>
