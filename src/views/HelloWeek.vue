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
    </div>
  </div>
</template>

<script>
import WeekDay from '../components/WeekDay.vue';
export default {
  name: 'HelloWeek',
  components: {
    WeekDay
  },
}
</script>