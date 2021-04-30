<template>
    <div id="app">
      <h1>Create Pupil</h1>
        <div v-if="!formSuccess">
          <div>
            <div>
              <input type="text" placeholder="First name" v-model="firstname">
            </div>
            <div>
              <input type="text" placeholder="Last Name" v-model="lastname">
            </div>
            <button type="submit" v-on:click.prevent="submitForm">Create</button>
          </div>
        <div v-if="formError">{{formError}}</div>
      </div>
      <div v-if="formSuccess">
        Form successfully submitted! ;)
        <button @click="resetFormSuccess">Create more pupils</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TheLessonForm',
  data() {
    return {
      id: '',
      firstname: '',
      lastname: '',
      created: '',
      works: [],
      formError: '',
      formSuccess: false,
    };
  },
  methods: {
    submitForm() {
      // todo!!!
      let errors = false;
      if (this.firstname === '') errors = true;
      if (this.lastname === '') errors = true;
      if (errors) {
        this.formError = 'Please fill in all fields....';
        return false;
      }
      // your sendmail function or anything goes here
      const sendpupil = {
        firstname: this.firstname,
        lastname: this.lastname,
        created: new Date(),
        works: this.works,
      }
      axios.post("http://localhost:3000/pupils", sendpupil)
        .then(response => this.id = response.data.id)
        .catch(error => {
          this.errorMessage = error.message;
          console.error("error ", error);
        });
      console.log('Pupil created :-)');
      this.formSuccess = true;
      return true;
    },
    resetFormSuccess() {
      this.id = '';
      this.firstname = '';
      this.lastname = '';
      this.created = '';
      this.works = null;
      this.formSuccess = false;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#card {
  display: inline-block;
  padding: 6px;
  line-height: 22px;
  font-size: 16px;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  color: #5F5F5F;
}
</style>
