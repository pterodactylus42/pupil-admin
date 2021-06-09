<template>
  <div class="lessonview">
    <h1>Lessons overview</h1>
    <div v-for="lesson in this.$store.state.lessons" :key="lesson.id" class="lesson">
        <ul>
            <li>{{lesson.name}}</li>
            <li>Let's meet on {{lesson.date}}</li>
            <li>We're doing this {{lesson.frequency}}</li>
            <li>Hope you get there on time: {{lesson.venue}}</li>
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
    methods: {
      deletelesson(id) {
        console.log('deleting lesson no. ' + id);
        var really = confirm("do you really want to delete lesson " + id + "?");
        if(really) {
          axios.delete('http://localhost:3000/lessons/' + id);
          // axios({
          //   method: 'DELETE',
          //   url: 'http://127.0.0.1:3000/lessons/' + id
          // });
          this.$store.dispatch('getState');
        }
      },
    }
}
</script>

<style scoped>
.lesson {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 2px 2px 2px 2px;
  width: 66%;
  margin: auto;
}
/* On mouse-over, add a deeper shadow */
.lesson:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>>
