import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// todo: add this globally
let apiUrl = 'http://127.0.0.1:3000/';

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
      state.lessons = [];
      state.lessons = payload.data;
    },
    UPDATE_PUPILS(state, payload) {
      state.pupils = [];
      state.pupils = payload.data;
    }
  },
  actions: {
    async getState({commit}) {
      await axios.get(`${apiUrl}lessons`)
      .then(response => commit('UPDATE_LESSONS',response))
      .catch(error => {
          console.log(error)
      });
      await axios.get(`${apiUrl}pupils`)
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
