<template>
    <div class="weekday">
        <h4>{{day}} schedule:</h4>
        <p> {{lessonsonday}} </p>
        <p> {{ this.$moment() }} </p>
    </div>
</template>
<script>
export default {
    props: [ 'day' ],
    computed: {
        lessonsonday() {
            //return this.$store.state.lessons.filter(event => event.date.isSame(this.day, 'day'));
            return this.$store.state.lessons;
        },
    }
}
</script>