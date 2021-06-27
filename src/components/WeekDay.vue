<template>
    <div class="weekday">
        <h4>{{day}}</h4>
        <div v-for="lesson in lessonsOnDay" :key="lesson.id"> 
            <lesson-card :lesson="lesson"></lesson-card> 
        </div>
    <div v-for="lesson in lessonsUnsteady" :key="lesson.id">
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
    props: [ 'day', 'date' ],
    data: function() {
    return {
            lessonsOnDay: [],
            lessonsUnsteady: []
        };
    },
    created() {
        this.$store.state.lessons.forEach(element => {
            if( element.date.slice(-2) === this.day.slice(0,2) && (element.frequency != "unsteady") ) {
                this.lessonsOnDay.push(element);
            }
        });
        // add unsteady lessons if today
        this.$store.state.lessons.forEach(element => {
            //console.log('element: ' + element.date.slice(0,10) + ' date: ' + this.today.slice(0,10));
            if( element.date.slice(0,10) === this.today.slice(0,10) && (element.frequency === "unsteady") ) {
                this.lessonsUnsteady.push(element);
                //console.log('pushed ' + element);
            }
        });
    },
    computed: {
        today: function() {
            return this.$moment(this.date).format('YYYY-MM-DD HH:MM dd');
        }
    }
}
</script>

<style>

</style>