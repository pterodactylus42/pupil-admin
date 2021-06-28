<template>
    <div class="lessoncard" v-bind:class="{ unsteady: isUnsteady }">
        <table class="lessontable">
            <tr>
                <td>{{ lessontime  }}: </td>
                <td>{{ lesson.name }}</td>
                <td>{{ lesson.venue }}</td>
            </tr>
            <tr class="participants">
                <td>Participants: </td>
                <td>
                    <ul v-if="myPupils">
                        <li class="pupil" v-for="pupil in myPupils" :key="pupil.id">{{ pupil.firstname }} {{pupil.lastname}}</li>
                    </ul>
                </td>
                <td class="details" @click="lessondetails(lesson.id)">
                    🔎
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'LessonCard',
    props: [ 'lesson' ],
    data () {
        return {
            myPupils: [],
        }
    },
    computed: {
        lessontime: function() {
            let time = this.$moment(this.lesson.date, 'YYYY-MM-DD hh:mm dd');
            return time.format('hh:mm');
        },
        isUnsteady: function() {
          return this.lesson.frequency === "unsteady";
        },
    },
    methods: {
      lessondetails(id) {
        this.$router.push('lessondetails/' + id)
      },
    },
    mounted() {
        for(var i = 0; i < this.$store.state.pupils.length; i++) {
            if(this.lesson.id == this.$store.state.pupils[i].lessonId) {
                this.myPupils.push(this.$store.state.pupils[i]);
            }
        }
    },
}
</script>
<style scoped>
.lessoncard {
  width: fit-content;
  margin: auto;
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

table td:nth-child(odd) { 
  background-color: #e4ebf2; 
  color: #000; 
}

td, tr {
    border: 1px dotted;
    border-color: lightgray;
    margin: 2em 2em 2em 2em;
}

.details {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.unsteady {
    background-color:lightgray;
}
</style>>
