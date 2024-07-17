<template>
  <div>
    <h1>Dinner Scheduler</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="filter">
        <input type="text" v-model="filter" placeholder="Filter by name..." />
        <ButtonShowUser :people />
        <ButtonSaveSchedule :schedule="pairs" />
        <ButtonShowSchedules />
      </div>
      <ul class="weeks">
        <li v-for="(week, weekIndex) in pairs" :key="weekIndex" class="week">
          <h2>Week {{ weekIndex + 1 }}</h2>
          <div class="pairs-container">
            <div v-for="(pair, pairIndex) in week" :key="pairIndex" class="pair">
              <div class="pair-wrapper">
                <div v-for="person in pair" :key="person.login.uuid" :class="{ 'matched': personMatchesFilter(person) }"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ButtonShowUser from './ButtonShowUser.vue';
import ButtonSaveSchedule from './ButtonSaveSchedule.vue';
import ButtonShowSchedules from './ButtonShowSchedules.vue';

const people = ref([]);
const pairs = ref([]);
const loading = ref(true);
const error = ref(null);
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

h2 {
  margin: 15px 0 3px;
}

h3 {
  margin: 15px 0 0;
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;
}

.filter > * {
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

.pair {
  margin: 10px;
}

.pair-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 7px;
  opacity: 0.2;
  transition: opacity 0.25s;
}

.pair .pair-wrapper ~ span {
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
</style>
