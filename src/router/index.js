import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateLesson from '../views/CreateLesson.vue'
import CreatePupil from '../views/CreatePupil.vue'
import ThePupilsList from '../views/ThePupilsList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createlesson',
    name: 'CreateLesson',
    component: CreateLesson
  },
  {
    path: '/createpupil',
    name: 'CreatePupil',
    component: CreatePupil
  },
  {
    path: '/pupilslist',
    name: 'PupilsList',
    component: ThePupilsList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
