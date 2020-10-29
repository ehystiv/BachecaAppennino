<template>
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
      <v-btn color="blue darken-1" text @click="$emit('close')"> Chiudi </v-btn>
      <v-btn color="blue darken-1" text @click="_login()"> Accedi </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: null,
        password: null,
      },

      loginError: null,

      rules: {
        required: (v) => !!v || 'Campo obbligatorio',
        email: (v) => /.+@.+\..+/.test(v) || "L'email deve essere valida",
      },
    }
  },

  methods: {
    _login() {
      if (
        this.$refs.emailField.validate() &&
        this.$refs.passwordField.validate()
      ) {
        this.$auth
          .loginWith('local', { data: this.login })
          .then(() => {
            this.$nuxt.$loading.finish()
            this.dialog = false
            this.$toast.success('Login effettuato')
          })
          .catch((e) => {
            const code = e.response?.status

            if (code === 471)
              this.$toast.error('Nessun utente registrato con questa email')
            else if (code === 472) this.$toast.error('Password errata')
            else this.$toast.error('Errore')
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
