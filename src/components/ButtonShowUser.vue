<template>
  <div>
    <button @click="openModal" title="Show all people">♾</button>
    <div v-if="modalVisible" class="modal" @click.self="modalVisible = false">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h2>All People</h2>
        <div class="modal-profile" v-for="(person, index) in people" :key="index">
          <picture>
            <source media="(min-width: 1200px)" :srcset="person.picture.large">
            <source media="(min-width: 768px)" :srcset="person.picture.medium">
            <img :src="person.picture.thumbnail" :alt="getFullName(person)">
          </picture>
          <span>{{ getFullName(person) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';

const modalVisible = ref(false);

const props = defineProps({
  people: {
    type: Array,
    required: true
  }
});

const { people } = toRefs(props);

const openModal = () => {
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const getFullName = (person) => {
  return person.name;
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  animation: 0.3s ease-in-out 0s 1 fadeIn;
}

.modal-content {
  background-color: #fefefe;
  color: #242424;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 680px;
  border-radius: 5px;
  position: relative;
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

.modal-profile {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.modal-profile picture {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border: 3px solid #dfdfdf;
  border-radius: 50%;
  overflow: hidden;
}

.modal-profile img {
  width: 100%;
  height: 100%;
}
</style>