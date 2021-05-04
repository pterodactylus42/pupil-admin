<template>
  <div class="week">
    <h1>Weekly Lessons</h1>
    <div class="days">
        <div class="monday">{{lessonsmonday}}</div>
        <div class="tuesday">{{lessonstuesday}}</div>
        <div class="wednesday">{{lessonswednesday}}</div>
        <div class="thursday">{{lessonsthursday}}</div>
        <div class="friday">{{lessonsfriday}}</div>
        <div>{{lessons}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWeek',
  components: {
  },
  data() {
    return {
        lessons: [],
        lessonsmonday: [],
        lessonstuesday: [],
        lessonswednesday: [],
        lessonsthursday: [],
        lessonsfriday: []
    }
  },
  mounted() {
    axios.get("http://localhost:3000/lessons")
        .then(response => this.lessons = response.data)
        .catch(error => {
            console.log(error)
        });
  },
  computed: {
  }
}
</script>
