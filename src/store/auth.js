// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword, onAuthStateChanged,
} from 'firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getDatabase, ref, set } from 'firebase/database';

export default {
  actions: {
    async login({ commit }, { email, password }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}`);
        set(userRef, {
          id: uid,
          email,
          password,
          name,
          balance: 10000,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async getUid() {
      // return new Promise((resolve, reject) => {
      //   const auth = getAuth();
      //   const unsubscribe = auth.onAuthStateChanged((user) => {
      //     unsubscribe();
      //     if (user) {
      //       resolve(user.uid);
      //     } else {
      //       resolve(null);
      //     }
      //   }, reject);
      // });
      const auth = getAuth();
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (userObj) => {
          unsubscribe();
          if (userObj) {
            resolve(userObj.uid);
          } else {
            resolve(null);
          }
        }, reject);
      });
      return user;
    },
    async logout({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit('clearInfo');
    },
  },
};
