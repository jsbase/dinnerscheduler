<template>
  <div id="app">
    <WeeklyPairs />
  </div>
</template>

<script>
import WeeklyPairs from './components/DinnerScheduler.vue';

export default {
  name: 'App',
  components: {
    WeeklyPairs,
  },
};
</script>
