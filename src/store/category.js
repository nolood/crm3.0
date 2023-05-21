import {
  get,
  getDatabase,
  push,
  ref,
  set,
} from 'firebase/database';

export default {
  actions: {
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const categoriesRef = ref(db, `users/${uid}/categories/${id}`);
        const cat = await get(categoriesRef).then((snapshot) => {
          const data = snapshot.val();
          return { ...data, id };
        });
        return cat;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid');
        console.log(uid);
        const db = getDatabase();
        const categoriesRef = ref(db, `users/${uid}/categories/${id}`);
        set(categoriesRef, { title, limit });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const categoriesRef = ref(db, `users/${uid}/categories`);
        const cat = await get(categoriesRef).then((snapshot) => {
          const data = snapshot.val();
          return Object.keys(data).map((key) => ({ ...data[key], id: key }));
        });
        return cat;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}/categories`);
        const category = await push(userRef, {
          title,
          limit,
        });

        return {
          title,
          limit,
          id: category.key,
        };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
