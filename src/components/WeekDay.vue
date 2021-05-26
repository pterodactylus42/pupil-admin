<template>
    <div class="weekday">
        <h4>{{day}}</h4>
        <div v-for="lesson in lessonsOnDay" :key="lesson.id"> 
            <lesson-card :lesson="lesson"></lesson-card> 
        </div>
    </div>
</template>
<script>
import LessonCard from './LessonCard.vue';
export default {
    name: 'WeekDay',
    components: {
        LessonCard
    },
    props: [ 'day' ],
    data: function() {
    return {
            lessonsOnDay: [],
        };
    },
    created() {
        this.$store.state.lessons.forEach(element => {
            if( element.date.slice(-2) === this.day.slice(0,2) && (element.frequency != "Unsteady") ) {
                this.lessonsOnDay.push(element);
            }
            // todo: add Unsteady lessons if in this week
        });
    }
}
</script>