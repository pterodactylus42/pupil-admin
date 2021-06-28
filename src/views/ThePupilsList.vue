<template>
  <div class="pupilslist">
    <h1>Pupils Overview</h1>
    <div v-for="pupil in pupils" :key="pupil.id" class="pupil">
        <ul>
            <li>My name is {{pupil.firstname}} {{pupil.lastname}}</li>
            <li>My id is {{pupil.id}}</li>
            <li>I was created on {{pupil.createdAt}}</li>
            <li v-if="works">{{pupil.works}}</li>
        </ul>
        <button @click="deletepupil(pupil.id)">Delete</button>
    </div>
  </div>
</template>

<script>
//todo: convert to this.$http
import axios from 'axios'
export default {
    data() {
        return {
            pupils: []
        }
    },
    mounted() {
        axios.get("/pupils")
            .then(response => this.pupils = response.data)
            .catch(error => {
                console.log(error)
            });
    },
    methods: {
      deletepupil(id) {
        var really = confirm("sorry, delete pupil " + id + " will work when the database is attached... " +
        "but cors is working fine as you can see in the network tab of the console. after you click ok, " + 
        "you see options request, delete request to the api and two get requests to update app state.");
        if(really) {
          this.$http.delete("/pupils/" + id).then(()=>{
          this.$store.dispatch('getState');
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
  width: 66%;
  margin: auto;
}
</style>>
