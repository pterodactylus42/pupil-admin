<template>
  <div class="week">
    <h3>Regular weekly Lessons</h3>
    <div class="days">
        <div class="monday">
          <week-day day="Monday"></week-day>
        </div>
        <div class="tuesday">
          <week-day day="Tuesday"></week-day>
        </div>
        <div class="wednesday">
          <week-day day="Wednesday"></week-day>
        </div>
        <div class="thursday">
          <week-day day="Thursday"></week-day>
        </div>
        <div class="friday">
          <week-day day="Friday"></week-day>
        </div>
        <div class="sorted-lessons">
          <h3>Lessons sorted</h3>
          <ul>
            <li v-for="lesson in sortedLessons" v-bind:key="lesson.id">{{lesson.date}}</li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import WeekDay from '../components/WeekDay.vue';
export default {
  name: 'HelloWeek',
  components: {
    WeekDay
  },
  data() {
    return {
        lessons: []
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
    sortedLessons: function() {
      // return this.lessons.slice(0).sort(function(a, b) {
      //   var dt_a = a.date.split(/[: T-]/).map(parseFloat);
      //   var dt_b = b.date.split(/[: T-]/).map(parseFloat);
      //   let c = new Date(dt_a[0], dt_a[1] - 1, dt_a[2], dt_a[3] || 0, dt_a[4] || 0, dt_a[5] || 0, 0);
      //   let d = new Date(dt_b[0], dt_b[1] - 1, dt_b[2], dt_b[3] || 0, dt_b[4] || 0, dt_b[5] || 0, 0);
      //   return d - c;
      // });
      return this.lessons;
    },
    lessonsByDay: function(dayString) {
      var copy = [];
      this.lessons.forEach(function(item) {
        var datestring = item.date.split(' ');
        if(datestring[2] === dayString) {
          copy.push(item);
        }
      })
      return copy;
    },
    lessonsMonday() {
      return this.lessonsByDay("Mo");
    }
  }
}
</script>