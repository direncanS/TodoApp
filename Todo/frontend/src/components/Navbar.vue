<!-- <template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Register
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                    <router-link to="/register" class="dropdown-item">
                    <button class="btn btn-primary w-100">Register One</button>
                    </router-link>
                </li>
                <li>
                    <router-link to="/register-two" class="dropdown-item">
                    <button class="btn btn-success w-100">Register Two</button>
                    </router-link>
                </li>
              </ul>

            </li>
           
          </ul>
          <span class="navbar-text">
            Todo App
          </span>
        </div>
      </div>
    </nav>
  </template>  -->
 
  
  <template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- Show only if the user is not authenticated -->
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item dropdown" v-if="!isAuthenticated">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Register
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <router-link to="/register" class="dropdown-item">
                    <button class="btn btn-primary w-100">Register One</button>
                  </router-link>
                </li>
                <li>
                  <router-link to="/register-two" class="dropdown-item">
                    <button class="btn btn-success w-100">Register Two</button>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Show only if the user is authenticated -->
            <li class="nav-item" v-if="isAuthenticated">
              <button class="btn btn-danger nav-link" @click="logout">Logout</button>
            </li>
          </ul>
          <span class="navbar-text">
            <!-- Display user email if logged in -->
            <template v-if="isAuthenticated">
                <b>
                  Welcome, 
                </b>
                {{ userEmail }} 
            </template>
            <template v-else>
              Todo App
            </template>
          </span>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Reactive properties for authentication status, user email, and user ID
const isAuthenticated = ref(false);
const userEmail = ref('');
const userId = ref('');
const router = useRouter(); // to navigate after successful login

// Check authentication status on component mount
onMounted(() => {
  const token = localStorage.getItem('authToken');
  const email = localStorage.getItem('userEmail');
  const id = localStorage.getItem('userId');
  if (token && email) {
    isAuthenticated.value = true;
    userEmail.value = email;
    userId.value = id;
  }
});

// Logout function
const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
  isAuthenticated.value = false;
  userEmail.value = '';
  userId.value = '';
  router.push('/login');
};
</script>

  
  
<style scoped>
  
    .navbar-text {
        font-size: 1.5em; 
    }
    .nav-item .dropdown-menu {
    background-color: transparent !important; 
    }
    .dropdown-item:hover{
        background-color: #14161a;
    }

</style>
  