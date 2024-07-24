import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: true,
    error: null,
  }),
  getters: {
    simplifiedUsers: (state) => state.users.map(user => ({
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      picture: user.picture
    })),
  },
  actions: {
    async fetchUsers() {
      const apiUrl = 'https://randomuser.me/api/?seed=dinnersheduler&results=10&nat=de&exc=login,registered,dob,phone,cell,location,nat';
      this.loading = true;
      try {
        const response = await axios.get(apiUrl);
        this.users = response.data.results.sort(() => Math.random() - 0.5);
        this.error = null;
      } catch (err) {
        console.error('Error fetching users:', err);
        this.error = 'Failed to fetch users. Please try again later.';
        this.users = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
