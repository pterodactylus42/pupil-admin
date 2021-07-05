<template>
  <div class="pupilslist">
    <h1>Pupils Overview</h1>
    <div v-for="pupil in this.$store.state.pupils" :key="pupil.id" class="pupil">
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
export default {
  methods: {
    deletepupil(id) {
      var really = confirm("really delete pupil " + id + "?");
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
