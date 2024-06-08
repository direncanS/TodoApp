import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import TodoList from '../components/TodoList.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import RegisterTwo from '../components/RegisterTwo.vue';
import axios from 'axios';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/register-two',
        name: 'RegisterTwo',
        component: RegisterTwo
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');
    const isAuthRoute = ['Login', 'Register', 'RegisterTwo'].includes(to.name);

    if (isAuthRoute) {
        if (token) {
            next('/');
            return;
        }
    } else {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
            next('/login');
            return;
        }
    }

    next();
});

export default router;
