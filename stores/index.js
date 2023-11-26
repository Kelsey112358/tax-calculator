import { defineStore } from 'pinia';

const preloadActiveUserId = () => {
  const persistentData = readFromStorage();
  if ('activeUserId' in persistentData) {
    return persistentData['activeUserId'];
  }
  return null;
};
const preloadHistory = () => {
  const persistentData = readFromStorage();
  if ('history' in persistentData) {
    return persistentData['history'];
  }
  return [];
}

export const useMainStore = defineStore('main', {
  state: () => ({
    // current in-context user
    activeUserId: preloadActiveUserId(),
    // users table
    users: [
      { id: '1', name: 'Kelsey', age: 18 },
      { id: '20', name: 'SW', age: 18 },
      { id: '100', name: 'Dina', age: 18 }
    ],
    // history table
    history: preloadHistory(),
    taxRates: []
  }),
  actions: {
    clearActiveUser() {
      this.activeUserId = null;
      writeToStorage('activeUserId', null);
    },
    setActiveUser(id) {
      this.activeUserId = id;
      writeToStorage('activeUserId', this.activeUserId);
    },
    setTaxRates(rates) {
      this.taxRates = rates
    },
    addHistory(data) {
      const lastId = this.history.length > 0 ? this.history[this.history.length - 1].id : 0;
      const id = lastId + 1;
      this.history.push({
        id,
        user: this.activeUserId,
        ...data
      });
      writeToStorage('history', this.history);
    },
    removeHistory(id) {
      this.history = this.history.filter((record) => record.id !== id);
      writeToStorage('history', this.history);
    }
  },
  getters: {
    getActiveUserId: (state) => state.activeUserId,
    getUserById: (state) => {
      return (id) => {
        return state.users.find(user => user.id === id);
      }
    },
    getUserHistory: (state) => {
      return (id) => {
        return state.history.filter(record => record.user === id);
      }
    },
    getTaxRates: (state) => {
      return state.taxRates;
    }
  }
})
