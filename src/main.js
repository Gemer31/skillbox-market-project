import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.$filters = {
  numberFormat(value) {
    return new Intl.NumberFormat().format(value);
  },
};
app.mount('#app');
