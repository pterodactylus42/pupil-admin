import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://52ccbe8.online-server.cloud:3000/';
// axios.defaults.baseURL = 'http://yourserver.com:3000/';
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.crossDomain = true;
Vue.prototype.$http = axios;

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})

Vue.use(axios)


import moment from 'moment';
Vue.prototype.$moment = moment;
moment.updateLocale('en', {
  week: {
    dow : 1, // Monday is the first day of the week.
  }
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch('getState');
  },
  render: h => h(App)
}).$mount('#app')
