<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col sm="12" md="10" lg="8">
        <v-card flat outlined>
          <v-card-title>Registrati</v-card-title>
          <v-container fluid>
            <v-form ref="form">
              <v-row align="start" justify="start">
                <v-col cols="12">
                  <v-text-field
                    v-model="signup.email"
                    :rules="[rules.required, rules.email]"
                    outlined
                    dense
                    label="E-mail"
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="signup.nickname"
                    :rules="[rules.required]"
                    outlined
                    dense
                    label="Nickname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="signup.password"
                    :rules="[rules.required]"
                    outlined
                    dense
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="register()">Iscriviti</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" timeout="5000" color="error">
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      errorMessage: null,

      signup: {
        email: null,
        nickname: null,
        password: null,
      },

      rules: {
        required: (v) => !!v || 'Campo obbligatorio',
        email: (v) => /.+@.+\..+/.test(v) || "l'Email deve essere valida",
      },
    }
  },

  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        const result = await this.$axios.$post('/api/signup', this.signup)

        if (result.status === 'success') {
          this.$nuxt.$loading.finish()
          this.$auth.loginWith('local', { data: this.signup })
        } else {
          this.errorMessage = result.error
          this.snackbar = true
          this.$nuxt.$loading.finish()
        }
      }
    },
  },
}
</script>

<style></style>
