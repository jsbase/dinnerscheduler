import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: true,
    error: null,
    savedSchedules: [],
  }),
  getters: {
    simplifiedUsers: (state) => state.users.map(user => ({
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      icon: user.picture.thumbnail
    })),
  },
  actions: {
    async fetchUsers() {
      const apiUrl = 'https://randomuser.me/api/?results=6';
      this.loading = true;
      try {
        const response = await axios.get(apiUrl);
        this.users = response.data.results;
        this.error = null;
      } catch (err) {
        console.error('Error fetching users:', err);
        this.error = 'Failed to fetch users. Please try again later.';
        this.users = [];
      } finally {
        this.loading = false;
      }
    },
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
    key: 'userStore',
    paths: ['savedSchedules'],
  },
});
