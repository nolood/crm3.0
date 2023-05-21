import {
  getDatabase,
  ref,
  get,
  update,
} from 'firebase/database';

export default {
  state: {
    info: {

    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  getters: {
    info: (s) => s.info,
  },
  actions: {
    async updateInfo({ commit, dispatch }, toUpdate) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}/`);
        await update(userRef, toUpdate);
        console.log(toUpdate);
        await dispatch('fetchInfo');
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}/`);
        get(userRef).then((snapshot) => {
          const data = snapshot.val();
          commit('setInfo', data);
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
