import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
axios.defaults.withCredentials = true;
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

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment.utc(String(value)).utcOffset("+02:00").format('DD/MM/YYYY HH:mm')
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
