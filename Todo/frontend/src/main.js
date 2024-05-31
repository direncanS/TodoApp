import './assets/main.css'


import { createApp } from 'vue';
import 'bulma/css/bulma.min.css';

import App from './App.vue';
import router from './router'; // make sure the path is correct
import axios from 'axios';

const authToken = localStorage.getItem('authToken');
if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  // console.log("authToken: ",authToken);

} else {
  console.log("No authToken found in localStorage.");
  // return res.status(200).json({ message: 'NOAUTH' });

}

createApp(App)
  .use(router)
  .mount('#app');
