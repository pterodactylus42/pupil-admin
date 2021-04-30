<template>
    <div id="lessonform">
      <h1>Create Lesson</h1>
        <div v-if="!formSuccess">
          <div>
            <div>
              <input type="text" placeholder="Lesson name" v-model="name">
            </div>
            <div>
              <input type="text" placeholder="Location" v-model="location">
            </div>
            <div>
              <select id="state" v-model="frequency">
                <option selected>Unsteady</option>
                <option>Weekly</option>
                <option>Every two weeks</option>
              </select>
            </div>
            <div>
              <date-picker :date="startTime" :option="timeoption"></date-picker>
            </div>
            <div>
              <autocomplete-vue :source="pupils" placeholder="search pupils" results-display="firstname" @selected="addPupilToLesson" /> 
              <div v-if="selectedpupils">
                <p v-for="pupil in selectedpupils" :key="pupil.value"> 
                  {{ pupil.selectedObject.firstname }} {{ pupil.selectedObject.lastname }}
                </p>
              </div>
            </div>
            <button type="submit" v-on:click.prevent="submitForm">Create</button>
          </div>
        <div v-if="formError">{{formError}}</div>
      </div>
      <div v-if="formSuccess">
        Lesson successfully submitted! ;)
        <button @click="resetFormSuccess">Create more lessons</button>
      </div>
    </div>
</template>

<script>
import myDatepicker from 'vue-datepicker';
import Autocomplete from 'vuejs-auto-complete';
import axios from 'axios';

export default {
  name: 'TheLessonForm',
  data() {
    return {
      lessonID: '',
      status: '',
      type: '',
      autoname: '',
      name: '',
      frequency: '',
      location: '',
      weekday: '',
      pupils: [],
      selectedpupils: [],
      formError: '',
      formSuccess: false,

      startTime: {
        time: '',
      },
      endTime: {
        time: '',
      },

      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'pick a date',
        color: {
          header: '#ccc',
          headerText: '#f00',
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel',
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true, // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm dd',
        placeholder: 'pick a date',

      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm',
      },
    };
  },
  components: {
    'date-picker': myDatepicker,
    'autocomplete-vue': Autocomplete
  },
  methods: {
    submitForm() {
      // todo!!!
      let errors = false;
      if (this.name === '') errors = true;
      if (this.location === '') errors = true;
      if (this.frequency === '') errors = true;
      if (this.startTime.time === '') errors = true;
      if (errors) {
        this.formError = 'Please fill in all fields....';
        return false;
      }
      // your sendmail function or anything goes here
      const sendlesson = {
        id: this.lessonID,
        status: this.status,
        type: 1,
        autoname: "default lesson name",
        name: this.name,
        frequency: this.frequency,
        date: this.startTime.time,
        starttime: 1600,
        endtime: 1630,
        location: this.location,
        pupils: this.selectedpupils
      }
      axios.post("http://localhost:3000/lessons", sendlesson)
        .then(response => this.lessonID = response.data.lessonID)
        .catch(error => {
          this.errorMessage = error.message;
          console.error("error ", error);
        });
      console.log('Lesson created :-)');
      this.formSuccess = true;
      return true;
    },
    addPupilToLesson(pupil) {
      this.selectedpupils.push(pupil);
      console.log(pupil)
    },
    resetFormSuccess() {
      this.name = '';
      this.location = '';
      this.frequency = '';
      this.startTime.time = '';
      this.selectedpupils = null;
      this.formSuccess = false;
    }
  },
  mounted() {
    axios.get("http://localhost:3000/pupils")
      .then(response => this.pupils = response.data)
      .catch(error => {
        console.log(error)
      });
    }
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
#slim {
  width: 50%;
}
</style>
