/** 用户信息模块 */
import { login } from '@api/login'
const state = {
  userName: '用户',
}
const getters = {
  userName: state => state.userName,
}
const mutations = {
  /**设置用户信息 */
  SET_USENAME(state, value) {
    state.userName = value
  },
}
const actions = {
  //用户信息
  SET_USENAME({ commit }, value) {
    console.log('用户的姓名', value)
    commit('SET_USENAME', value)
  },
  //登录
  async DO_LOGIN({ commit }, value) {
    let loginResult = await login(value)
    //登录成功保存用户信息
    if (loginResult.resultInfo === '1') {
      //情况用户信息
      sessionStorage.setItem('teyiting', JSON.stringify(value))
      commit('SET_USENAME', value)
    }
    return loginResult
  },
}

export default {
  namespaced: true, //解决不同模块的命名冲突问题
  state,
  mutations,
  actions,
  getters,
}
