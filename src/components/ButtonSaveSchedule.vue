<template>
  <div>
    <button @click="save" title="Save schedule">↓</button>
    <Notification :message="notificationMessage" :type="notificationType" />
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Notification from './Notification.vue';

const userStore = useUserStore();
const { simplifiedUsers } = storeToRefs(userStore);

const notificationMessage = ref('');
const notificationType = ref('info');

const save = () => {
  const schedule = pairPeople(simplifiedUsers.value);

  if (userStore.saveSchedule(schedule)) {
    notificationMessage.value = 'Schedule saved successfully!';
    notificationType.value = 'success';
  } else {
    notificationMessage.value = 'Schedule already exists in storage.';
    notificationType.value = 'info';
  }
};

const pairPeople = (persons) => {
  const pairings = buildPairIndexes(persons.length);
  const pairIxToPerson = (i) => persons[(i + 1) % persons.length];
  return pairings.map((pairing) =>
    pairing.map((pair) => pair.map(pairIxToPerson))
  );
};

const buildPairIndexes = (n) => {
  if (n % 2 !== 0) {
    throw new Error(`${n} is an odd number`);
  }
  const pairings = [];
  const max = n - 1;
  for (let i = 0; i < max; i++) {
    const pairing = [[max, i]];
    for (let k = 1; k < n / 2; k++) {
      pairing.push([(i + k) % max, (max + i - k) % max]);
    }
    pairings.push(pairing);
  }
  return pairings;
};
</script>
