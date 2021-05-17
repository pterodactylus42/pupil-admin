<template>
  <div class="lessonview">
    <h1>This is the lesson view</h1>
    <div v-for="lesson in lessons" :key="lesson.id" class="lesson">
        <ul>
            <li v-if="!lesson.name">{{lesson.autoname}}</li>
            <li v-else>{{lesson.name}}</li>
            <li>Let's meet on {{lesson.date}} </li>
            <li>We're doing this {{lesson.frequency}}</li>
            <li>Hope you get there on time: {{lesson.location}}</li>
            <div v-if="lesson.pupils">
              <h5> Participants: </h5>
              <p v-for="pupil in lesson.pupils" :key="pupil.value"> 
                {{ pupil.selectedObject.firstname }} {{ pupil.selectedObject.lastname }}
              </p>
            </div> 
        </ul>
        <button @click="deletelesson(lesson.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            lessons: null
        }
    },
    mounted() {
          axios.get("http://localhost:3000/lessons")
            .then(response => this.lessons = response.data)
            .catch(error => {
              console.log(error)
            });
    },
    methods: {
      deletelesson(id) {
        console.log('deleting lesson no. ' + id);
        var really = confirm("do you really want to delete lesson " + id + "?");
        if(really) {
          axios({
            method: 'DELETE',
            url: 'http://127.0.0.1:3000/lessons/' + id
          });
          axios.get("http://localhost:3000/lessons")
            .then(response => this.lessons = response.data)
            .catch(error => {
              console.log(error)
            });
        }
      },
      async loadLessons() {
        this.loading = true;
        let apiUrl = 'http://127.0.0.1:3000/lessons/';
        console.log('loading lessons ...');
        try {
          let response = await this.axios.get(apiUrl);
          this.lessons = response.data;
          console.log(response);
        } catch(e) {
          console.error(e);
        }
        this.loading = false;
      }
    }
}
</script>

<style scoped>
.lesson {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 2px 2px 2px 2px;
}

/* On mouse-over, add a deeper shadow */
.lesson:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.lessonview {
  padding: 2px 16px 2px 2px;
}
</style>>
