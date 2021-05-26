<template>
    <div class="lessoncard">
        <ul>
            <li>{{ lessontime }} : {{ lesson.name }} - {{ lesson.venue }} </li>
            <li>
                <div v-if="lesson.pupils" class="participants">
                    Participants:
                    <div v-for="pupil in lesson.pupils" :key="pupil.id">
                        {{ pupil.selectedObject.firstname }} {{ pupil.selectedObject.lastname }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'LessonCard',
    props: [ 'lesson' ],
    computed: {
        lessontime: function() {
            let time = this.$moment(this.lesson.date, 'YYYY-MM-DD hh:mm dd');
            return time.format('hh:mm');
        },
    },
}
</script>
<style scoped>
.lessoncard {
  padding: 2px 2px 2px 2px;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.lessoncard:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

</style>>
