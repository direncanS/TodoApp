import './assets/main.css'


import { createApp } from 'vue';
import 'bulma/css/bulma.min.css';

import App from './App.vue';
import router from './router'; // make sure the path is correct
import axios from 'axios';

const app = createApp(App)
app.use(router)
app.mount('#app');
