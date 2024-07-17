<template>
  <div>
    <button @click="save" title="Save schedule">↓</button>
  </div>
</template>

<script setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  schedule: {
    type: Array,
    required: true
  }
});

const { schedule } = toRefs(props);

const save = () => {
  const allSchedules = [];
  const scheduleKeys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('schedule_')) {
      const storedSchedule = JSON.parse(localStorage.getItem(key));
      allSchedules.push(storedSchedule);
      scheduleKeys.push(key);
    }
  }

  const isUnique = !allSchedules.some(storedSchedule => JSON.stringify(storedSchedule) === JSON.stringify(schedule.value));

  if (isUnique) {
    const newScheduleKey = `schedule_${scheduleKeys.length}`;
    localStorage.setItem(newScheduleKey, JSON.stringify(schedule.value));
    console.info('Array saved to local storage with key:', newScheduleKey);
  } else {
    console.info('Array already exists in local storage');
  }
};
</script>
