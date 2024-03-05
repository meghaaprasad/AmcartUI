<template>
  <nav class="navbar">
    <div class="logo">AmCart</div>
    <ul class="nav-links">
      <li><a href="#">MEN</a></li>
      <li><a href="#">WOMEN</a></li>
      <li><a href="#">KIDS</a></li>
    </ul>
    <div class="search-bar">
      <input type="text" placeholder="Search for products, brands and more">
    </div>
    <div class="nav-right">
      <ul v-if="isLoggedIn" class="nav-icons">
        <li>
          <a href="#" @mouseover="showUsername = true" @mouseleave="showUsername = false">
            <i class="profile-icon">Profile</i>
            <span v-show="showUsername">{{ username }}</span>
          </a>
        </li>
        <li><a href="#" @click="logout">Logout</a></li>
      </ul>
      <ul v-else class="nav-icons">
        <li><a href="#" @click="loginWithCognito">Login</a></li>
      </ul>
      <ul class="nav-icons">
        <li><a href="#">Wishlist</a></li>
        <li><a href="#">Bag</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    const showUsername = ref(false);
    const username = computed(() => store.getters.username);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const logout = () => {
      store.dispatch('logout');
      // Add redirect or additional actions upon logout if needed
    };

    const loginWithCognito = () => {
      window.location.href = 'http://localhost:5005/api/Auth/login';
    };

    return { showUsername, username, isLoggedIn, logout, loginWithCognito };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: #fff;
}

.logo {
  font-size: 2em;
  color: #FF3E6C;
}

.nav-links,
.nav-right {
  display: flex;
}

.nav-links li,
.nav-icons li {
  margin: 0 15px;
}

.nav-links a,
.nav-icons a {
  text-decoration: none;
  color: #000;
  font-weight: 500;
}

.search-bar input {
  padding: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px; /* Adjust based on your layout */
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-icons {
  display: flex;
  list-style: none;
}

.nav-icons li {
  position: relative;
}

.nav-icons a span {
  position: absolute;
  visibility: hidden;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.nav-icons a:hover span {
  visibility: visible;
}


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem; /* Reduced padding */
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
}

.logo {
  font-size: 1.5em; /* Adjusted for proportion */
  color: #FF3E6C; /* Your brand color */
}

.nav-links,
.nav-right {
  display: flex;
  align-items: center; /* Center items vertically */
}

.nav-links li,
.nav-icons li {
  margin: 0 1rem; /* Uniform margin */
}

.nav-links a,
.nav-icons a {
  text-decoration: none;
  color: #333; /* Darker text for better readability */
  font-weight: 500;
}

.search-bar {
  flex-grow: 1; /* Allow search bar to take up remaining space */
  margin: 0 1rem; /* Add margin around the search bar */
}

.search-bar input {
  width: 100%; /* Full width of parent */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px; /* Rounded corners */
}
</style>
