<template>
  <div class="scheduler">
    <h1>Dinner Scheduler</h1>
    <div v-if="userStore.loading" class="loading-container">
      <div class="loading-spinner"></div>
      Loading...
    </div>
    <div v-else-if="userStore.error">{{ userStore.error }}</div>
    <div v-else :class="{'content': true, 'fade-in': fadeIn}">
      <div class="filter">
        <input type="text" v-model="filter" placeholder="Filter by name..." />
        <ButtonShowUser :people="simplifiedUsers" />
        <ButtonSaveSchedule />
        <ButtonShowSchedules />
      </div>
      <ul>
        <li v-for="(day, dayIndex) in pairs" :key="dayIndex">
          <h2>{{ weekdays[dayIndex % weekdays.length] }}</h2>
          <div class="pairs-container">
            <div v-for="(pair, pairIndex) in day" :key="pairIndex" class="pair">
              <div class="pair-wrapper">
                <div v-for="person in pair" :key="person.email" :class="{ 'matched': personMatchesFilter(person) }"
                  class="profile">
                  <img :src="person.icon" :alt="person.name" />
                  <span>{{ person.name }}</span>
                </div>
              </div>
              <span>{{ pair[0].name.split(' ')[0] }} & {{ pair[1].name.split(' ')[0] }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import { pairPeople } from '../utils/pairingUtils';
import ButtonShowUser from './ButtonShowUser.vue';
import ButtonSaveSchedule from './ButtonSaveSchedule.vue';
import ButtonShowSchedules from './ButtonShowSchedules.vue';

const userStore = useUserStore();
const { simplifiedUsers } = storeToRefs(userStore);

const filter = ref('');
const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
const fadeIn = ref(false);

const pairs = computed(() => pairPeople(simplifiedUsers.value));

const personMatchesFilter = (person) => {
  return person.name.toLowerCase().includes(filter.value.toLowerCase());
};

onMounted(() => {
  if (simplifiedUsers.value.length === 0) {
    userStore.fetchUsers().then(() => {
      nextTick(() => {
        fadeIn.value = true;
      });
    });
  } else {
    nextTick(() => {
      fadeIn.value = true;
    });
  }
});
</script>

<style scoped>
.scheduler {
  margin: 0 auto;
  padding: 0 0 2rem;
  max-width: 800px;
}

h1 {
  margin: 30px 0;
}

h2 {
  margin-bottom: 10px;
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;
}

.filter>* {
  margin-left: 10px;
}

.filter> :first-child {
  margin-left: 0px;
}

button {
  padding: 9px 14px;
  margin-left: 10px;
}

.pairs-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.pair-wrapper {
  display: flex;
  justify-content: center;
  opacity: 0.2;
  transition: opacity 0.25s;
}

.pair {
  text-align: center;
}

.pair .pair-wrapper~span {
  font-size: 0.8rem;
}

.pair-wrapper:has(.matched) {
  opacity: 1;
}

.profile {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 5px;
  border: 3px solid #fefefe;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  transform: translateX(-10px) translateY(0px);
  transition: opacity 0.3s ease;
}

.profile:first-child {
  transform: translateX(15px) translateY(0px);
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.content {
  opacity: 0;
  transition: opacity 0.5s ease-in;
}

.fade-in {
  opacity: 1;
}
</style>
