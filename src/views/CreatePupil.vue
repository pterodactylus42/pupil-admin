<template>
  <div class="createpupil">
    <ThePupilForm />
  </div>
</template>

<script>
// @ is an alias to /src
import ThePupilForm from '@/components/ThePupilForm.vue'

export default {
  name: 'CreatePupil',
  components: {
    ThePupilForm,
  }
}
</script>
