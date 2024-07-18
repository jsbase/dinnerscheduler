<template>
  <Transition name="fade">
    <div v-if="show" :class="['notification', type]">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info'
  },
  duration: {
    type: Number,
    default: 3000
  }
});

const show = ref(false);

watch(() => props.message, () => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, props.duration);
});
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  z-index: 1000;
}

.info {
  background-color: #2196F3;
}

.success {
  background-color: #4CAF50;
}

.error {
  background-color: #F44336;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
