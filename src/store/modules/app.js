/** 用户信息模块 */

const state = {
  userInfo: '用户模块',
}
const mutations = {
  setUserInfos(state, value) {
    state.userInfo = value
  },
}
const actions = {
  changeUserInfo({ commit }, value) {
    commit('setUserInfos', value)
  },
 
}

export default {
  namespaced: true, //解决不同模块的命名冲突问题
  state,
  mutations,
  actions,
}
