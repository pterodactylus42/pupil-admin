<template>
    <div class="lessondetails">
        <h1>Details for Lesson {{ lessonid }}</h1>
        <div class="lesson">
            <ul>
                <li>{{lessonWithId.name}}</li>
                <li>Let's meet on {{lessonWithId.date}}</li>
                <li>We're doing this {{lessonWithId.frequency}}</li>
                <li>Hope you get there on time: {{lessonWithId.venue}}</li>
                <div v-if="lessonWithId.pupils">
                <h5> Participants: </h5>
                <p v-for="pupil in lessonWithId.pupils" :key="pupil.value"> 
                    {{ pupil.selectedObject.firstname }} {{ pupil.selectedObject.lastname }}
                </p>
                </div> 
            </ul>
            <div class="notices">
                <textarea v-model="lessonNotice" placeholder="add notices ..."></textarea>
            </div>
            <button @click="savenotice(lessonWithId.id)">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lessonid: this.$route.params.id,
            lessons: this.$store.state.lessons,
            lessonNotice: '',
        };
    }, 
    computed: {
        lessonWithId: function() {
            let found = [];
            for(var i = 0; i < this.lessons.length; i++) {
                if(this.lessonid == this.lessons[i].id) {
                    found = this.lessons[i];
                }
            }
            return found;
        },
    },
    mounted() {
        // dunno
    },
    methods: {
      savenotice(lessonid) {
        console.log('saving new notice for lesson no. ' + lessonid);
        // todo: add save logic
        // this.$http.post("/lessons/" + id).then(()=>{
        this.$store.dispatch('getState');
        //});
      }
    },
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
