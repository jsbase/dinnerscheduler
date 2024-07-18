import { defineStore } from 'pinia';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    savedSchedules: [],
  }),
  actions: {
    saveSchedule(schedule) {
      const isUnique = !this.savedSchedules.some(
        savedSchedule => JSON.stringify(savedSchedule) === JSON.stringify(schedule)
      );
      if (isUnique) {
        this.savedSchedules.push(schedule);
        return true;
      }
      return false;
    },
  },
  persist: {
    key: 'scheduleStore',
    paths: ['savedSchedules'],
  },
});
