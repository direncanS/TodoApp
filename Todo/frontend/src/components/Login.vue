<template>
    <div>
        <Navbar />
        <div class="Home-Todo">
            <h1>Login</h1>
            <p>Please Login to see your todos</p>
        </div>
        <div class="card auth-form">
            <div class="card-content">
                <div class="title has-text-centered">Login</div>
                <div class="content">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input v-model="email" class="input" type="email" placeholder="Email Address" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input v-model="password" class="input" type="password" placeholder="Enter Password" />
                        </div>
                    </div>
                    <div class="field is-grouped is-grouped-right">
                        <p class="control">
                            <button class="button is-success" @click="handleLogin">Login</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { login } from '../api';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
    try {

        const response = await login(email.value, password.value);
        alert('Login successful! You will now be redirected to Home.');
        router.push('/').then(() => {
            window.location.reload();
        });
    } catch (error) {
        alert("Failed to login.");
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
