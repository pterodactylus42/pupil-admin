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
            <div class="noticesfromdb" v-if="notesFromDatabase">
                <p v-for="notice in notesFromDatabase" :key="notice.id">
                    {{notice.createdAt | formatDate}} : 
                    {{notice.content}}
                    <button @click="deletenote(notice.id)">Delete</button>
                </p>
            </div>
            <div class="notices">
                <textarea v-model="lessonNotice" placeholder="add notes ..."></textarea>
            </div>
            <button @click="savenotes(lessonWithId.id)">Save</button>
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
            notesFromDatabase: [],
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
    async mounted() {
        // get notices for this lesson from db
        await this.$http.get('/notices/' + this.lessonid)
            .then(response => this.notesFromDatabase = response.data)
            .catch(error => {
                console.log(error)
            });
    },
    methods: {
      async savenotes(lessonid) {
        await this.$http.post('/notices', {
        lessonId: lessonid,
        noteString: this.lessonNotice
        })
        .then(() => {
            this.getnotes();
        }, (error) => {
            console.log(error);
        });
      },
      async getnotes() {
        await this.$http.get('/notices/' + this.lessonid)
            .then(response => this.notesFromDatabase = response.data)
            .catch(error => {
                console.log(error)
            });          
      },
      async deletenote(noteId) {
      var really = confirm("really delete note " + noteId + "?");
      if(really) {
        await this.$http.delete("/notices/" + noteId).then(()=>{
            this.getnotes();
        });
      }
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
