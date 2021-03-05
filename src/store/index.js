import { createStore } from 'vuex'
// import camelCase from 'lodash/camelCase'
// const camelCase = str => {
//   let re = /-(\w)/g
//   return str.replace(re, ($0, $1) => {
//     return $1.toUpperCase()
//   })
// }
/**
 * 导入modules
 */
// const requireModule = require.context('./modules', true, /\.js$/)
// let modules = requireModule.keys().reduce((modules, modulePath) => {
//   const moduleName = camelCase(modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'))
//   const value = requireModule(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})
import app from './modules/app'
import user from './modules/user'

export default createStore({
  namespaced: true,
  modules: {
    app,
    user,
  },
})
