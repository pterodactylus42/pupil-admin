import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    lessons: [],
    pupils: []
  },
  getters: {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
  },
  mutations: {
    SET_USER(state, username) {
      state.user = username
    },
    LOG_OUT(state) {
      state.user = null
      state.posts = null
    },
    UPDATE_LESSONS(state, payload) {
      state.lessons = payload.data;
      console.log(payload)
    },
    UPDATE_PUPILS(state, payload) {
      state.pupils = payload.data;
      console.log(payload)
    }
  },
  actions: {
    async getInitialState({commit}) {
      console.log(' get initial state, lessons:')
      await axios.get("http://localhost:3000/lessons")
      .then(response => commit('UPDATE_LESSONS',response))
      .catch(error => {
          console.log(error)
      });
      console.log(' get initial state, pupils:')
      await axios.get("http://localhost:3000/pupils")
      .then(response => commit('UPDATE_PUPILS',response))
      .catch(error => {
          console.log(error)
      });
    },
    async Register({dispatch}, form) {
      await axios.post('register', form)
      let UserForm = new FormData()
      UserForm.append('username', form.username)
      UserForm.append('password', form.password)
      await dispatch('LogIn', UserForm)
    },
    async LogIn({commit}, User) {
      await axios.post('login', User)
      await commit('SET_USER', User.get('username'))
    },
    async LogOut({commit}) {
      let user = null
      commit('LOG_OUT', user)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
