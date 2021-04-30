<template>
  <div class="home">
    <TheLessonView />
  </div>
</template>

<script>
// @ is an alias to /src
import TheLessonView from '@/views/TheLessonView.vue'

export default {
  name: 'Home',
  components: {
    TheLessonView,
  }
}
</script>
