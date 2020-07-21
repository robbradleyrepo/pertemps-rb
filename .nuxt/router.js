import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0aa3ed70 = () => interopDefault(import('..\\pages\\candidate\\index.vue' /* webpackChunkName: "pages_candidate_index" */))
const _5b229424 = () => interopDefault(import('..\\pages\\consultant\\index.vue' /* webpackChunkName: "pages_consultant_index" */))
const _7b12cf43 = () => interopDefault(import('..\\pages\\candidate\\login\\index.vue' /* webpackChunkName: "pages_candidate_login_index" */))
const _2a4baa22 = () => interopDefault(import('..\\pages\\candidate\\registration\\index.vue' /* webpackChunkName: "pages_candidate_registration_index" */))
const _117bbbdd = () => interopDefault(import('..\\pages\\consultant\\login\\index.vue' /* webpackChunkName: "pages_consultant_login_index" */))
const _f0b94068 = () => interopDefault(import('..\\pages\\consultant\\registrations\\index.vue' /* webpackChunkName: "pages_consultant_registrations_index" */))
const _3430d852 = () => interopDefault(import('..\\pages\\consultant\\registrations\\index_bck.vue' /* webpackChunkName: "pages_consultant_registrations_index_bck" */))
const _53b6e928 = () => interopDefault(import('..\\pages\\consultant\\registrations\\new\\index.vue' /* webpackChunkName: "pages_consultant_registrations_new_index" */))
const _a8763862 = () => interopDefault(import('..\\pages\\consultant\\registrations\\new\\confirmation.vue' /* webpackChunkName: "pages_consultant_registrations_new_confirmation" */))
const _3f94ecce = () => interopDefault(import('..\\pages\\consultant\\registrations\\_id\\index.vue' /* webpackChunkName: "pages_consultant_registrations__id_index" */))
const _37d6feb8 = () => interopDefault(import('..\\pages\\i\\_id\\index.vue' /* webpackChunkName: "pages_i__id_index" */))
const _08d95949 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/candidate",
      component: _0aa3ed70,
      name: "candidate"
    }, {
      path: "/consultant",
      component: _5b229424,
      name: "consultant"
    }, {
      path: "/candidate/login",
      component: _7b12cf43,
      name: "candidate-login"
    }, {
      path: "/candidate/registration",
      component: _2a4baa22,
      name: "candidate-registration"
    }, {
      path: "/consultant/login",
      component: _117bbbdd,
      name: "consultant-login"
    }, {
      path: "/consultant/registrations",
      component: _f0b94068,
      name: "consultant-registrations"
    }, {
      path: "/consultant/registrations/index_bck",
      component: _3430d852,
      name: "consultant-registrations-index_bck"
    }, {
      path: "/consultant/registrations/new",
      component: _53b6e928,
      name: "consultant-registrations-new"
    }, {
      path: "/consultant/registrations/new/confirmation",
      component: _a8763862,
      name: "consultant-registrations-new-confirmation"
    }, {
      path: "/consultant/registrations/:id",
      component: _3f94ecce,
      name: "consultant-registrations-id"
    }, {
      path: "/i/:id?",
      component: _37d6feb8,
      name: "i-id"
    }, {
      path: "/",
      component: _08d95949,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
