// eslint-disable-next-line
const isServerlessEnvironment = process.env.ON_VERCEL == 'true'

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
  css: ['~/assets/toast.scss'],

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

  serverMiddleware: isServerlessEnvironment
    ? []
    : [
        {
          '/api': '~/src/api/index.js',
        },
      ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080',
    browserBaseURL:
      process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080',
    retry: { retries: 3 },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: { url: '/api/auth/user', method: 'post', propertyName: 'data' },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
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
          primary: '#1B5E20',
          accent: '#82B1FF',
          secondary: '#43A047',
          info: '#26A69A',
          warning: '#FBC02D',
          error: '#E53935',
          success: '#00E676',
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
    className: 'toast',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  ssr: true,

  server: {
    port: 8080,
  },
}
