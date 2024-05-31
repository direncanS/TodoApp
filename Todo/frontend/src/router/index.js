// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; 
import TodoList from '../components/TodoList.vue';
import Login from '../components/Login.vue'; 
import Register from '../components/Register.vue'; 
import RegisterTwo from '../components/RegisterTwo.vue'; 


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
//   {
//     path: '/todos',
//     name: 'TodoList',
//     component: TodoList
//   },
  { 
    path: '/login',
    name: 'Login',
    component: Login },

  { 
    path: '/register',
    name: 'Register',
    component: Register },
  { 
    path: '/register-two',
    name: 'RegisterTwo',
    component: RegisterTwo }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
