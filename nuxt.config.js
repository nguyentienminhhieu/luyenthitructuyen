export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'thitructuyen(fe)',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/tailwind.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/api'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/admin/exams/DetailExam/Question.vue',
    '~/components/admin/exams/DetailExam/List/ListQuestions.vue',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api/admin',
  },
  env: {
    baseURL: process.env.BASE_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Layout
  layout: ['authLayout', 'defaultAdmin', 'error'],

  // components: [
  //   '~/components/TestExam.vue', // Đường dẫn đến component global

  // ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},
  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: 'token',
  //         required: true,
  //         type: 'Bearer',
  //       },
  //       user: {
  //         property: 'user',
  //         autoFetch: true,
  //       },
  //       endpoints: {
  //         login: { url: '/admin/login', method: 'post' },
  //         logout: { url: '/admin/logout', method: 'post' },
  //         // user: { url: '/auth/user', method: 'get' }
  //       },
  //     },
  //   },
  //   redirect: {
  //     login: '/login',
  //     logout: '/',
  //     callback: '/login',
  //     home: '/',
  //   },
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 3000, // Cổng lắng nghe cho dự án này
  },
}
