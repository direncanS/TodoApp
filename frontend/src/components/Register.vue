<template>
    <div>
        <Navbar />
        <div class="Home-Todo">
            <h1>Register One</h1>
            <p>Sign Up here to create your first todo</p>
        </div>
        <form @submit.prevent="submitRegistration">
            <div class="card auth-form">
                <div class="card-content">
                    <div class="title has-text-centered">Register</div>
                    <div class="content">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input class="input" type="email" placeholder="Email Address" v-model="email">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input" type="password" placeholder="Enter Password" v-model="password">
                            </div>
                        </div>
                        <div class="field is-grouped is-grouped-right">
                            <p class="control">
                                <button class="button is-success">Register</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import { useRouter } from 'vue-router';
import { registerA } from '../api';

const email = ref('');
const password = ref('');
const router = useRouter();

async function submitRegistration() {
    try {
        const register_response = await registerA(email.value, password.value);
        localStorage.setItem('authToken', register_response.token);
        localStorage.setItem('userEmail', register_response.email);
        localStorage.setItem('userId', register_response.id);
        alert('Registration successful! You will now be redirected to login.');
        router.push('/');
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Failed to register: ' + (error.response && error.response.data && error.response.data.errors ? error.response.data.errors.map(e => e.msg).join(', ') : 'Please try again later.'));
    }
}
</script>

<style scoped>
.auth-form {
    max-width: 400px;
    margin: 0 auto;
}

.Home-Todo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 7vh;
    font-weight: bold;
}
</style>
