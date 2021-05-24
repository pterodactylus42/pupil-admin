<template>
    <div class="lessoncard">
        {{ lesson }}
    </div>
</template>
<script>
export default {
    name: 'LessonCard',
    props: [ 'lesson' ]
}
</script>