<template>
  <div>
    <h1>Dinner Scheduler</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="filter">
        <input type="text" v-model="filter" placeholder="Filter by name..." />
        <button @click="openModal" title="Show All People">☰</button>
      </div>
      <div class="weeks">
        <div v-for="(week, weekIndex) in pairs" :key="weekIndex" class="week">
          <h2>Week {{ weekIndex + 1 }}</h2>
          <div class="pairs-container">
            <div
              v-for="(pair, pairIndex) in week"
              :key="pairIndex"
              class="pair"
            >
              <div class="pair-wrapper">
                <div
                  v-for="person in pair"
                  :key="person.login.uuid"
                  :class="{ 'filtered-out': !personMatchesFilter(person) }"
                  class="profile"
                >
                  <img
                    :src="person.picture.thumbnail"
                    :alt="getFullName(person)"
                  />
                  <span>{{ getFullName(person) }}</span>
                </div>
              </div>
              <span>{{ pair[0].name.first }} & {{ pair[1].name.first }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="modalVisible" class="modal" @click.self="modalVisible = false">
        <div class="modal-content">
          <span @click="closeModal" class="close">&times;</span>
          <h2>All People</h2>
          <div
            class="modal-profile"
            v-for="person in people"
            :key="person.login.uuid"
          >
            <img :src="person.picture.thumbnail" :alt="getFullName(person)" />
            <span>{{ getFullName(person) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const people = ref([]);
const pairs = ref([]);
const loading = ref(true);
const error = ref(null);
const modalVisible = ref(false);
const filter = ref('');

const fetchPeople = async () => {
  const apiUrl = 'https://randomuser.me/api/?results=6';

  await axios
    .get(apiUrl)
    .then((response) => {
      people.value = response.data.results;
      pairs.value = pairPeople(people.value);
      loading.value = false;
    })
    .catch((err) => {
      console.error('Error fetching people:', err);
      error.value = 'Failed to fetch people. Please try again later.';
      loading.value = false;
    });
};

const openModal = () => {
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const getFullName = (person) => {
  return `${person.name.first} ${person.name.last}`;
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

const personMatchesFilter = (person) => {
  const fullName = getFullName(person).toLowerCase();
  return fullName.includes(filter.value.toLowerCase());
};

onMounted(() => {
  fetchPeople();
});
</script>

<style scoped>
h1 {
  text-align: center;
}
h2,
h3 {
  margin-top: 20px;
}
h3 {
  margin-bottom: 0;
}
.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
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
.modal.visible {
  display: block;
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
.modal-profile {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.modal-profile img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
