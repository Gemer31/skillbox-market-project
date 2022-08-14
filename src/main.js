import { createApp } from 'vue';
import showAlertFunc from '@/test-file-2';
import { goodLuckMessage, workHardMessage } from '@/test-file-1';
import App from './App.vue';

createApp(App).mount('#app');

showAlertFunc(goodLuckMessage);
showAlertFunc(workHardMessage);
