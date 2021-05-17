<template>
    <div class="weekday">
        <h4>{{day}} schedule:</h4>
        <p> {{lessonsonday}} </p>
    </div>
</template>
<script>
export default {
    props: [ 'day' , 'lessonsonday' ]
}
</script>