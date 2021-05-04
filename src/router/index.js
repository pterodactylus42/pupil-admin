import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateLesson from '../views/CreateLesson.vue'
import CreatePupil from '../views/CreatePupil.vue'
import ThePupilsList from '../views/ThePupilsList.vue'
import TheLessonView from '../views/TheLessonView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true },
  },
  {
    path: '/login',
    name: 'Login', 
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/createlesson',
    name: 'CreateLesson',
    component: CreateLesson,
    meta: { requiresAuth: true },
  },
  {
    path: '/createpupil',
    name: 'CreatePupil',
    component: CreatePupil,
    meta: { requiresAuth: true },
  },
  {
    path: '/pupilslist',
    name: 'PupilsList',
    component: ThePupilsList,
    meta: { requiresAuth: true },
  },
  {
    path: '/lessonview',
    name: 'LessonView',
    component: TheLessonView,
    meta: { requiresAuth: true },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
