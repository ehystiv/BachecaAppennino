<template>
  <v-card v->
    <v-card-title>
      <span class="headline">{{ this.$auth.user.nickname }} - I tuoi dati</span>
    </v-card-title>
    <v-card-subtitle> ID: {{ this.$auth.user.uuid }}</v-card-subtitle>
    <v-card-text>
      <v-container>
        <div class="body-1 black--text">Email: {{ this.$auth.user.email }}</div>
        <div class="body-1 black--text">
          Nome anonimo: {{ this.$auth.user.anon_name }}
        </div>
        <div
          v-if="$auth.user.frazione && $auth.user.frazione.lenght !== 0"
          class="body-1 black--text"
        >
          Paese: {{ this.$auth.user.frazione }}
        </div>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-if="!$auth.user.frazione || !$auth.user.frazione.lenght === 0"
              v-model="update.frazione"
              label="Paese (ATTENZIONE: una volta messo non si può più cambiare!)"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="update.pass1"
              label="Nuova password"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="update.pass2"
              label="Ripeti password"
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close')"> Chiudi </v-btn>
      <v-btn color="blue darken-1" text @click="updateData()">
        Modifica dati
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      update: {
        frazione: null,
        pass1: null,
        pass2: null,
      },
    }
  },

  methods: {
    updateData() {
      if (this.update.frazione !== null) this.addFrazione(this.update.frazione)
      if (this.update.pass1 !== null && this.update.pass2 !== null)
        this.changePassword(this.update.pass1, this.update.pass2)
    },

    addFrazione(frazione) {
      this.$axios
        .$post('/api/addfrazione', {
          frazione,
        })
        .then((res) => {
          if (res.status === 'success') {
            this.$auth.fetchUser().then(() => {
              this.update.frazione = null
              this.$toast.success('Paese aggiunto')
              this.$emit('close')
            })
          } else if (res.status === 'failed') {
            this.$toast.error('Errore, riprova più tardi')
          }
        })
        .catch((err) => {
          console.error(err)
          this.$toast.error('Errore, riprova più tardi')
        })
    },

    changePassword(pass1, pass2) {
      if (pass1 !== pass2) {
        this.$toast.error('Le password non corrispondono')
      } else {
        this.$axios
          .$post('/api/changepass', {
            password: pass1,
          })
          .then((res) => {
            if (res.status === 'success') {
              this.$auth
                .fetchUser()
                .then(() => {
                  this.update.pass1 = null
                  this.update.pass2 = null
                  this.$toast.success('Password aggiornata')
                  this.$emit('close')
                })
                .catch((err) => console.error(err))
            } else if (res.status === 'failed') {
              this.$toast.error('Errore, riprova più tardi')
            }
          })
          .catch((err) => {
            console.error(err)
            this.$toast.error('Errore, riprova più tardi')
          })
      }
    },
  },
}
</script>

<style></style>
