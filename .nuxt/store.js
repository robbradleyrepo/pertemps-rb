import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']
let store = {}

void (function updateModules() {
  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\registration\\getters.ts'), 'registration/getters.ts')
  resolveStoreModules(require('..\\store\\candidate\\actions.ts'), 'candidate/actions.ts')
  resolveStoreModules(require('..\\store\\candidate\\mutations.ts'), 'candidate/mutations.ts')
  resolveStoreModules(require('..\\store\\candidate\\state.ts'), 'candidate/state.ts')
  resolveStoreModules(require('..\\store\\consultant\\actions.ts'), 'consultant/actions.ts')
  resolveStoreModules(require('..\\store\\consultant\\getters.ts'), 'consultant/getters.ts')
  resolveStoreModules(require('..\\store\\consultant\\mutations.ts'), 'consultant/mutations.ts')
  resolveStoreModules(require('..\\store\\consultant\\state.ts'), 'consultant/state.ts')
  resolveStoreModules(require('..\\store\\registration\\actions.ts'), 'registration/actions.ts')
  resolveStoreModules(require('..\\store\\registration\\mutations.ts'), 'registration/mutations.ts')
  resolveStoreModules(require('..\\store\\candidate\\getters.ts'), 'candidate/getters.ts')
  resolveStoreModules(require('..\\store\\registration\\state.ts'), 'registration/state.ts')
  resolveStoreModules(require('..\\store\\registration\\actions\\steps.ts'), 'registration/actions/steps.ts')
  resolveStoreModules(require('..\\store\\registration\\actions\\actionsets.ts'), 'registration/actions/actionsets.ts')
  resolveStoreModules(require('..\\store\\registration\\getters\\actions.ts'), 'registration/getters/actions.ts')
  resolveStoreModules(require('..\\store\\registration\\getters\\actionsets.ts'), 'registration/getters/actionsets.ts')
  resolveStoreModules(require('..\\store\\registration\\getters\\candidate.ts'), 'registration/getters/candidate.ts')
  resolveStoreModules(require('..\\store\\registration\\getters\\steps.ts'), 'registration/getters/steps.ts')
  resolveStoreModules(require('..\\store\\registration\\actions\\tasks.ts'), 'registration/actions/tasks.ts')
  resolveStoreModules(require('..\\store\\registration\\actions\\actions.ts'), 'registration/actions/actions.ts')
  resolveStoreModules(require('..\\store\\registration\\mutations\\actions.ts'), 'registration/mutations/actions.ts')
  resolveStoreModules(require('..\\store\\registration\\mutations\\actionsets.ts'), 'registration/mutations/actionsets.ts')
  resolveStoreModules(require('..\\store\\registration\\mutations\\flow.ts'), 'registration/mutations/flow.ts')
  resolveStoreModules(require('..\\store\\registration\\mutations\\steps.ts'), 'registration/mutations/steps.ts')
  resolveStoreModules(require('..\\store\\registration\\mutations\\tasks.ts'), 'registration/mutations/tasks.ts')
  resolveStoreModules(require('..\\store\\registration\\getters\\tasks.ts'), 'registration/getters/tasks.ts')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '..\\store\\registration\\getters.ts',
      '..\\store\\candidate\\actions.ts',
      '..\\store\\candidate\\mutations.ts',
      '..\\store\\candidate\\state.ts',
      '..\\store\\consultant\\actions.ts',
      '..\\store\\consultant\\getters.ts',
      '..\\store\\consultant\\mutations.ts',
      '..\\store\\consultant\\state.ts',
      '..\\store\\registration\\actions.ts',
      '..\\store\\registration\\mutations.ts',
      '..\\store\\candidate\\getters.ts',
      '..\\store\\registration\\state.ts',
      '..\\store\\registration\\actions\\steps.ts',
      '..\\store\\registration\\actions\\actionsets.ts',
      '..\\store\\registration\\getters\\actions.ts',
      '..\\store\\registration\\getters\\actionsets.ts',
      '..\\store\\registration\\getters\\candidate.ts',
      '..\\store\\registration\\getters\\steps.ts',
      '..\\store\\registration\\actions\\tasks.ts',
      '..\\store\\registration\\actions\\actions.ts',
      '..\\store\\registration\\mutations\\actions.ts',
      '..\\store\\registration\\mutations\\actionsets.ts',
      '..\\store\\registration\\mutations\\flow.ts',
      '..\\store\\registration\\mutations\\steps.ts',
      '..\\store\\registration\\mutations\\tasks.ts',
      '..\\store\\registration\\getters\\tasks.ts',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function resolveStoreModules(moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs|ts)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const storeModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(storeModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeRoot(moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeState(moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule(moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)
    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function getStoreModule(storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty(storeModule, moduleData, property) {
  if (!moduleData) return

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
