<template>
  <v-app>
    <Navbar />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '~/components/NavBar'
import Footer from '~/components/Footer'

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      title: 'Vuetify.js',
    }
  },
}
</script>
