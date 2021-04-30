<template>
  <div class="pupilslist">
    <h1>This is the Pupils List</h1>
    <div v-for="pupil in pupils" :key="pupil.id" class="pupil">
        <ul>
            <li>My name is {{pupil.firstname}} {{pupil.lastname}}</li>
            <li>My id is {{pupil.id}}</li>
            <li>I was created on {{pupil.created}}</li>
            <li v-if="works">{{pupil.works}}</li>
        </ul>
        <button @click="deletepupil(pupil.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            pupils: []
        }
    },
    mounted() {
        axios.get("http://localhost:3000/pupils")
            .then(response => this.pupils = response.data)
            .catch(error => {
                console.log(error)
            });
    },
    methods: {
      deletepupil(id) {
        console.log('deleting pupil no. ' + id);
        var really = confirm("do you really want to delete pupil " + id + "?");
        if(really) {
          axios({
            method: 'DELETE',
            url: 'http://127.0.0.1:3000/pupils/' + id
          });
          axios.get("http://localhost:3000/pupils")
            .then(response => this.pupils = response.data)
            .catch(error => {
              console.log(error)
            });
        }
      }
    }
}
</script>

<style scoped>
.pupil {
  padding: 2px 2px 2px 2px;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.pupil:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.pupilslist {
  padding: 2px 2px 2px 2px;
}
</style>>
