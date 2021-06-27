<template>
  <div id="app">
    <div v-if="isLoggedIn" id="nav">
      <div id="logo"><img src="./assets/logo.png" height="64px"></div>
      <router-link to="/">Week</router-link> |
      <router-link to="/createlesson">New Lesson</router-link> | 
      <router-link to="/createpupil">New Pupil</router-link> |
      <router-link to="/pupilslist">View Pupils</router-link> |
      <router-link to="/lessonview">View Lessons</router-link> |
      <a @click="logout">Logout {{ whoAmI }}</a>
    </div>
    <div v-else>
      <div id="logo"><img src="./assets/logo.png" height="48px"></div>
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <div id="nav-footer"></div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated
    },
    whoAmI: function() {
      return this.$store.getters.StateUser
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
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  line-height: 1.1;
  font-weight: lighter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  font-family: 'Courier New', Courier, monospace;
  font-variant-caps: small-caps;
  padding: 25px;
}
#nav a {
  font-weight: bold;
  color: #415569;
}
#nav-footer {
  width: 70%;
  margin: auto;
  height: 1px;
  background: linear-gradient(45deg, rgb(46, 46, 102), rgb(214, 189, 243) );
}
a {
  font-weight: bold;
  text-decoration: underline;
  cursor: crosshair;
  color: #191236;
}
#nav a.router-link-exact-active {
  color: rgb(8, 8, 39);
}
#logo {
  font-weight: bolder;
}
</style>
