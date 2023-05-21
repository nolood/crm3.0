import {
  get,
  getDatabase,
  push,
  ref,
} from 'firebase/database';

export default {
  actions: {
    async fetchRecordById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const recordsRef = ref(db, `users/${uid}/records/${id}`);
        const rec = await get(recordsRef).then((snapshot) => {
          const data = snapshot.val();
          return { ...data, id };
        });
        return rec;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const recordsRef = ref(db, `users/${uid}/records`);
        const rec = await get(recordsRef).then((snapshot) => {
          const data = snapshot.val();
          return Object.keys(data).map((key) => ({ ...data[key], id: key }));
        });
        return rec;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createRecord({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}/records`);
        push(userRef, record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
