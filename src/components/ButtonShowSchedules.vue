<template>
  <div>
    <button @click="openModal" title="Show saved schedules">☰</button>
    <div v-if="modalVisible" class="modal" @click.self="modalVisible = false">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h2>Saved Schedules</h2>
        <input type="text" v-model="filter" placeholder="Filter by name..." class="filter-input" />
        <ul class="schedules">
          <li v-for="(schedule, scheduleIndex) in scheduleStore.savedSchedules" :key="scheduleIndex" class="schedule">
            <h3>Plan {{ scheduleIndex + 1 }}</h3>
            <ul>
              <li v-for="(day, dayIndex) in schedule" :key="dayIndex" class="day">
                <h4>{{ weekdays[dayIndex % weekdays.length] }}</h4>
                <div class="pairs-container">
                  <div v-for="(pair, pairIndex) in day" :key="pairIndex" class="pair">
                    <div class="pair-wrapper">
                      <div v-for="person in pair" :key="person.email"
                        :class="{ 'matched': personMatchesFilter(person), 'not-matched': !personMatchesFilter(person) }"
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useScheduleStore } from '../stores/scheduleStore';

const scheduleStore = useScheduleStore();
const modalVisible = ref(false);
const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
const filter = ref('');

const openModal = () => {
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const personMatchesFilter = (person) => {
  return person.name.toLowerCase().includes(filter.value.toLowerCase());
};
</script>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  animation: 0.3s ease-in-out 0s 1 fadeIn;
  padding-top: 4%;
}

.modal-content {
  background-color: #fefefe;
  border: 1px solid #888;
  border-radius: 5px;
  color: #242424;
  padding: 20px;
  position: relative;
  margin: 5% auto 10%;
  padding: 20px;
  width: 80%;
  max-width: 1280px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: color 0.25s;
}

.close:hover,
.close:focus {
  color: #535bf2;
  cursor: pointer;
  text-decoration: none;
}

h2 {
  margin: 8px 0 0;
}

h3 {
  font-size: 1.1rem;
  border-bottom: 1px solid #aaa;
}

h4 {
  font-size: 0.9rem;
}

.schedule {
  border: 1px solid #aaa;
  border-radius: 8px;
  margin-top: 10px;
}

.day {
  margin-top: 5px;
}

.pairs-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
}

.pair-wrapper {
  display: flex;
  justify-content: center;
}

.pair {
  text-align: center;
}

.pair .pair-wrapper~span {
  font-size: 0.7rem;
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

.filter-input {
  background-color: #232323;
  padding: 11px;
  border-radius: 8px;
  border: 3px solid transparent;
  outline: none;
  transition: border-color 0.25s;
  margin: 16px 0;
  width: calc(100% - 34px);
}

.profile.not-matched {
  opacity: 0.2;
}

.profile.matched {
  opacity: 1;
}
</style>
