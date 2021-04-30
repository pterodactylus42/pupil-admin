<template>
  <div class="createlesson">
    <TheLessonForm />
  </div>
</template>

<script>
// @ is an alias to /src
import TheLessonForm from '@/components/TheLessonForm.vue'

export default {
  name: 'CreateLesson',
  components: {
    TheLessonForm,
  }
}
</script>
