import { createStore } from 'vuex';
import auth from '@/store/auth';
import info from '@/store/info';
import category from '@/store/category';
import record from '@/store/record';

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch('https://api.apilayer.com/fixer/latest?base=RUB&symbols=USD,EUR,RUB', {
        headers: {
          apikey: key,
        },
      });
      return res.json();
    },
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
