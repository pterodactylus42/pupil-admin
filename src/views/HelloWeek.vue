<template>
  <div class="week">
    <h3>{{thisWeeksMonday.format('dd DD-MM-YYYY')}} -  {{thisWeeksSunday.format('dd DD-MM-YYYY')}}</h3>
    <div class="days">
        <div class="monday">
          <week-day :day="thisWeeksMonday.format('dddd')"></week-day>
        </div>
        <div class="tuesday">
          <week-day :day="thisWeeksTuesday.format('dddd')"></week-day>
        </div>
        <div class="wednesday">
          <week-day :day="thisWeeksWednesday.format('dddd')"></week-day>
        </div>
        <div class="thursday">
          <week-day :day="thisWeeksThursday.format('dddd')"></week-day>
        </div>
        <div class="friday">
          <week-day :day="thisWeeksFriday.format('dddd')"></week-day>
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
  data: function() {
    return {
      thisWeeksMonday: {},
      thisWeeksTuesday: {},
      thisWeeksWednesday: {},
      thisWeeksThursday: {},
      thisWeeksFriday: {},
      thisWeeksSaturday: {},
      thisWeeksSunday: {}
    }
  },
  computed: {
    now: function() {
      return this.$moment().format('e');
    },
  },
  created() {
    this.$store.dispatch('getState');
    let day = this.$moment().format('e');
    this.thisWeeksMonday = this.$moment().subtract(day, 'days');
    this.thisWeeksTuesday = this.$moment().subtract(day, 'days').add(1, 'days');
    this.thisWeeksWednesday = this.$moment().subtract(day, 'days').add(2, 'days');
    this.thisWeeksThursday = this.$moment().subtract(day, 'days').add(3, 'days');
    this.thisWeeksFriday = this.$moment().subtract(day, 'days').add(4, 'days');
    this.thisWeeksSaturday = this.$moment().subtract(day, 'days').add(5, 'days');
    this.thisWeeksSunday = this.$moment().add( (6-day), 'days');
  }
}
</script>