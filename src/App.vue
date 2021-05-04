<template>
  <div id="app">
    <div v-if="isLoggedIn" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/createlesson">Create Lesson</router-link> | 
      <router-link to="/createpupil">Create Pupil</router-link> |
      <router-link to="/pupilslist">View Pupils</router-link> |
      <router-link to="/lessonview">View Lessons</router-link> |
      <a @click="logout">Logout</a>
    </div>
    <div v-else>
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('LogOut')
      this.$router.push('login')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
