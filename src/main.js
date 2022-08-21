import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$filters = {
  numberFormat(value) {
    return new Intl.NumberFormat().format(value);
  },
};

app.mount('#app');
