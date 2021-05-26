<template>
    <div class="lessoncard">
        <table class="lessontable">
            <tr>
                <td>{{ lessontime  }} : </td>
                <td>{{ lesson.name }} - </td>
                <td>{{ lesson.venue }}</td>
            </tr>
            <tr class="participants">
                <td>Participants: </td>
                <td>
                    <ul v-if="lesson.pupils">
                        <li class="pupil" v-for="pupil in lesson.pupils" :key="pupil.id">{{ pupil.selectedObject.firstname }} {{pupil.selectedObject.lastname}}</li>
                    </ul>
                </td>
                <td>
                    <button @click="lessondetails(lesson.id)">Details</button>
                </td>
            </tr>
        </table>
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
    methods: {
      lessondetails(id) {
        console.log('details for lesson no. ' + id);
        var really = confirm("lesson " + id + " date " + this.lesson.date + " duration " + this.lesson.duration);
        if(really) {
          console.log(this.lesson);
        }
      },
    }    
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

.lessontable {
  padding: 2px 2px 2px 2px;
  margin-left: auto;
  margin-right: auto;
}

.pupil {
    text-align: left;
    padding: 2px 2px 2px 2px;
}

table td:nth-child(1) { 
  background-color: #e4ebf2; 
  color: #000; 
}

td, tr {
    border-color: gray;
    margin: 2em 2em 2em 2em;
}
</style>>
