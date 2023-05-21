import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Loader from '@/components/app/AppLoader.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'ant-design-vue/dist/antd.css';
import '@/styles/style.css';

const firebaseConfig = {
  apiKey: 'AIzaSyAyPOKQIjFpAqah0mrdgf9iqAvSLj3zQ_8',
  authDomain: 'noloodcrm.firebaseapp.com',
  databaseURL: 'https://noloodcrm-default-rtdb.firebaseio.com',
  projectId: 'noloodcrm',
  storageBucket: 'noloodcrm.appspot.com',
  messagingSenderId: '847683220854',
  appId: '1:847683220854:web:5824ef670d02703c50b657',
};

initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth, () => {
  store.dispatch('fetchInfo');
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.component(Loader);
app.mount('#app');
