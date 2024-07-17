<template>
  <div>
    <button @click="openModal" title="Show saved schedules">☰</button>
    <div v-if="modalVisible" class="modal" @click.self="modalVisible = false">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h2>Saved Schedules</h2>
        <ul class="schedules">
          <li v-for="(schedule, scheduleIndex) in savedSchedules" :key="scheduleIndex" class="schedule">
            <h2>Plan {{ scheduleIndex + 1 }}</h2>
            <ul class="weeks">
              <li v-for="(week, weekIndex) in schedule" :key="weekIndex" class="week">
                <h2>Week {{ weekIndex + 1 }}</h2>
                <div class="pairs-container">
                  <div v-for="(pair, pairIndex) in week" :key="pairIndex" class="pair">
                    <div class="pair-wrapper">
                      <div v-for="person in pair" :key="person.login.uuid"
                        class="profile">
                        <img :src="person.picture.thumbnail" :alt="getFullName(person)" />
                        <span>{{ getFullName(person) }}</span>
                      </div>
                    </div>
                    <span>{{ pair[0].name.first }} & {{ pair[1].name.first }}</span>
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
import { ref /*, onMounted */ } from 'vue';

const modalVisible = ref(false);
const savedSchedules = ref([]);

const openModal = () => {
  savedSchedules.value = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('schedule_')) {
      const storedSchedule = JSON.parse(localStorage.getItem(key));
      savedSchedules.value.push(storedSchedule);
    }
  }

  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const getFullName = (person) => {
  return `${person.name.first} ${person.name.last}`;
};
</script>

<style scoped>
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
}

.modal-content {
  background-color: #fefefe;
  color: #232323;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 5px;
  position: relative;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.pairs-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.pair {
  margin: 10px;
}

.pair-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.profile {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 5px;
  border: 3px solid #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  transform: translateX(-10px) translateY(0px);
  transition: opacity 0.3s ease;
}

.profile:first-child {
  transform: translateX(15px) translateY(0px);
}

.profile.filtered-out {
  opacity: 0.3;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
