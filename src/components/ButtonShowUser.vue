<template>
  <div>
    <button @click="openModal" title="Show all people">♾</button>
    <div v-if="modalVisible" class="modal" @click.self="modalVisible = false">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h2>All People</h2>
        <div class="modal-profile" v-for="person in people" :key="person.login.uuid">
          <img :src="person.picture.thumbnail" :alt="getFullName(person)" />
          <span>{{ getFullName(person) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, defineProps } from 'vue';

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

.modal-profile {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.modal-profile img {
  width: 50px;
  height: 50px;
  border: 3px solid #dfdfdf;
  border-radius: 50%;
  margin-right: 10px;
}
</style>