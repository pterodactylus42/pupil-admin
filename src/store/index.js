import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
  },
  mutations: {
    setUser(state, username) {
      state.user = username
    },
    LogOut(state) {
      state.user = null
      state.posts = null
    }
  },
  actions: {
    async Register({dispatch}, form) {
      await axios.post('register', form)
      let UserForm = new FormData()
      UserForm.append('username', form.username)
      UserForm.append('password', form.password)
      await dispatch('LogIn', UserForm)
    },
    async LogIn({commit}, User) {
      await axios.post('login', User)
      await commit('setUser', User.get('username'))
    },
    async LogOut({commit}) {
      let user = null
      commit('LogOut', user)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
