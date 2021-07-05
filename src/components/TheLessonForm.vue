<template>
    <div class="lessonform">
      <h1>Create Lesson</h1>
        <div v-if="!formSuccess">
          <div>
            <div>
              <input class="lessonform" type="text" placeholder="Lesson name" v-model="name">
            </div>
            <div>
              <input class="lessonform" type="text" placeholder="Location" v-model="venue">
            </div>
            <div>
              <select class="lessonform" id="state" v-model="frequency">
                <option value="" disabled selected>Pick Frequency</option>
                <option>unsteady</option>
                <option>weekly</option>
                <option>every two weeks</option>
              </select>
            </div>
            <div>
              <date-picker class="lessonform" :date="lessondate" :option="timeoption"></date-picker>
            </div>
            <!-- <div>
              <input class="lessonform" type="text" placeholder="New pupil firstname" v-model="newpupilFirstname">
            </div>
            <div>
              <input class="lessonform" type="text" placeholder="New pupil lastname" v-model="newpupilLastname">
            </div> -->
            <div>
              <autocomplete-vue class="lessonform" :source="pupils" placeholder="search pupils" results-display="firstname" @selected="addPupilToLesson" /> 
              <div v-if="selectedpupils">
                <p v-for="pupil in selectedpupils" :key="pupil.value"> 
                  {{ pupil.firstname }} {{ pupil.lastname }} <button v-on:click.prevent="removeSelectedPupil(pupil)">&#10005;</button>
                </p>
              </div>
            </div>
            <button class="lessonform" type="submit" v-on:click.prevent="submitForm">Create</button>
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

export default {
  name: 'TheLessonForm',
  data() {
    return {
      lessonID: '',
      name: '',
      frequency: '',
      venue: '',
      pupils: [],
      selectedpupils: [],
      newpupilFirstname: '',
      newpupilLastname: '',
      newpupils: [],
      formError: '',
      formSuccess: false,

      lessondate:  {},
      
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm dd',
        placeholder: 'pick a date',
      },
    };
  },
  components: {
    'date-picker': myDatepicker,
    'autocomplete-vue': Autocomplete
  },
  methods: {
    submitForm() {
      let errors = false;
      if (this.name === '') errors = true;
      if (this.venue === '') errors = true;
      if (this.frequency === '') errors = true;
      if (this.lessondate === '') errors = true;
      if (errors) {
        this.formError = 'Please fill in all fields....';
        return false;
      }
      const sendlesson = {
        id: this.lessonID,
        name: this.name,
        frequency: this.frequency,
        date: this.lessondate.time,
        duration: 30, 
        venue: this.venue,
        pupils: this.mySelectedPupils
      }
      console.log(sendlesson);
      console.log(this.mySelectedPupils);
      this.$http.post("/lessons", sendlesson)
        .then(()=>{
          this.$store.dispatch('getState')})
        .catch(error => {
          this.errorMessage = error.message;
          console.log("error ", error);
        });
      this.formSuccess = true;
      //this.$store.dispatch('getState');
      return true;
    },
    addPupilToLesson(pupil) {
      this.selectedpupils.push(pupil.selectedObject);
    },
    removeSelectedPupil(outPupil) {
      // remove from array
      this.selectedpupils = this.selectedpupils.filter(selectedpupil => selectedpupil.id != outPupil.id);
    },
    resetFormSuccess() {
      this.name = '';
      this.venue = '';
      this.frequency = '';
      this.lessondate = {};
      this.selectedpupils = null;
      this.formSuccess = false;
      this.$store.dispatch('getState');
    },
  },
  mounted() {
    this.$store.dispatch('getState');
    this.pupils = this.$store.getters.statePupils;
  },
  computed: {
    mySelectedPupils() {
      let allSelected = [];
      for(var i = 0; i < this.selectedpupils.length; i++) {
        allSelected.push({
          firstname: this.selectedpupils[i].firstname,
          lastname: this.selectedpupils[i].lastname,
        });
      }
      return JSON.stringify(allSelected);
    }
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
.lessonform {
  margin-left: auto;
  margin-right: auto;
  width: 66%;
}
</style>
