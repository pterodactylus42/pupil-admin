<template>
  <div class="card">
    <!-- for Vue 2.0 -->
    <div class="row">
      <span>Date：</span>
      <date-picker :date="startTime" :option="timeoption"></date-picker>
    </div>
  </div>
</template>

<script>
// for Vue 2.0
import myDatepicker from 'vue-datepicker';

export default {
  data() {
    return {
      // for Vue 2.0
      startTime: {
        time: '',
      },
      endtime: {
        time: '',
      },

      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'pick a date',
        color: {
          header: '#ccc',
          headerText: '#f00',
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel',
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true, // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm',
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm',
      },
    };
  },
  components: {
    'date-picker': myDatepicker,
  },
};
</script>

<style scoped>
#card {
  display: inline-block;
  padding: 6px;
  line-height: 22px;
  font-size: 16px;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  color: #5F5F5F;
}
</style>
