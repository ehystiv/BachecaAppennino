import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Bacheca Appennino',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://www.npmjs.com/package/@nuxtjs/moment
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/toast',

    '@nuxtjs/auth',
  ],

  serverMiddleware: {
    '/api': '~/api',
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000',
    browserBaseURL:
      process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000',
    retry: { retries: 3 },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/api/user', method: 'post', propertyName: 'data' },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
      login: '/?message="Accesso effettuato"',
      logout: '/',
    },
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  },

  loading: {
    name: 'chasing-dots',
    color: '#0099ff',
    background: 'white',
    height: '4px',
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    defaultAssets: { icons: 'fa' },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.green.darken1,
          accent: colors.blue.accent1,
          secondary: colors.green.darken5,
          info: colors.teal.lighten1,
          warning: colors.yellow.darken2,
          error: colors.red.darken1,
          success: colors.green.accent3,
        },
      },
    },
  },

  moment: {
    locales: ['it'],
    defaultLocale: 'it',
    defaultTimezone: 'Europe/Rome',
  },

  toast: {
    position: 'top-right',
    duration: 5000,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
