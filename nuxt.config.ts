import { Configuration } from '@nuxt/types';

const config: Configuration = {
  /*
   ** Nuxt render mode
   */
  mode: 'spa',

  /*
   ** Headers of the page
   ** https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Pertemps Profile' || process.env.npm_package_name,
    htmlAttrs: {
      lang: 'en-GB',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/xnn4vmp.css' },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#ce0058',
    failedColor: 'red',
    height: '5px',
    continuous: true,
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vuex-persist', mode: 'client' },
    { src: '~/plugins/polyfills', mode: 'client' },
    { src: '~/plugins/directives/index' },
    { src: '~/plugins/filters/index' },
    { src: '~/plugins/magic-codes' },
  ],

  /*
   ** Nuxt.js build-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module', // https://github.com/nuxt-community/eslint-module
    '@nuxt/typescript-build',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios', // https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources', // https://github.com/nuxt-community/style-resources-module
    'nuxt-svg-loader', // https://github.com/Developmint/nuxt-svg-loader/
    ['nuxt-fontawesome', {
        imports: [
         {
           set: '@fortawesome/free-solid-svg-icons',
           icons: ['fas']
         },
         {
           set:'@fortawesome/free-brands-svg-icons',
           icons: ['fab']
         }
       ]
      }
    ]
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? '/'
        : '//png-candidate-portal-dev.azurewebsites.net/',
  },

  /*
   ** Build configuration
   */
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    },

    transpile: ['vuex-persist'],

    // You can extend webpack config here
    extend(config, ctx) {},
  },

  /*
   ** Pre-render generate
   */
  generate: {
    dir: '../Pertemps-Umbraco/portal',
  },

  /*
   ** Router
   */
  router: {
    base: process.env.NODE_ENV === 'production' ? '/portal/' : '/',
  },

  /*
   ** Typescript
   */
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: false,
    include: ['types'],
  },

  /*
   ** Vue
   */
  vue: {
    config: {
      productionTip: false,
    },
  },

  /*
   ** Global style resources
   */
  styleResources: {
    scss: [
      '~assets/sass/variables/*.scss',
      '~assets/sass/utilities/*.scss',
      '~assets/sass/globals/*.scss',
    ],
  },

  /*
   ** Loading spinner
   */
  loadingIndicator: {
    color: '#001989',
    color2: 'rgba(110, 201, 253, 0.15)',
  },

  /*
   ** Env
   */
  env: {
    apiUrl:
      process.env.NODE_ENV === 'production'
        ? '/'
        : '//png-candidate-portal-uat.azurewebsites.net/',
  },
};

export default config;
