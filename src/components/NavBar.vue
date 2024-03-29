<template>
  <nav class="navbar">
    <router-link to="/" class="logo">AmCart</router-link>
    <div class="search-container">
      <input type="text" placeholder="Search for products, brands and more" class="search-input"
      v-model="searchQuery" @keyup.enter="performSearch" />
      <button class="search-button" @click="performSearch">🔍</button>
      <button v-if="searchQuery" class="clear-button" @click="clearSearch">✖</button>
    </div>
    <ul class="nav-links">
      <li v-if="isLoggedIn"><router-link to="/addproduct" class="nav-icon-link"> + Add Product</router-link></li>
    </ul>
    <div class="nav-right">
      <ul v-if="isLoggedIn" class="nav-icons">
        <li>
          <router-link to="/profile">
            <i class="profile-icon">{{ username.substring(0, 1) }}</i>
            <span v-show="showUsername">{{ username }}</span>
          </router-link>
        </li>
        <li><a href="#" @click="logout">Logout</a></li>
      </ul>
      <ul v-else class="nav-icons">
        <li><a href="#" @click="loginWithCognito">Login</a></li>
      </ul>
      <ul class="nav-icons">
        <li><router-link to="/wishlist">Wishlist</router-link></li>
        <li><router-link to="/bag">Bag</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    const showUsername = ref(false);
    const router = useRouter();
    const username = computed(() => store.getters.username);
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const searchQuery = ref('');
    const logout = () => {
      store.dispatch('logout');
      router.push('/');
    };

    const loginWithCognito = () => {
      window.location.href = 'https://gfpizy7vp9.execute-api.us-east-1.amazonaws.com/test/api/Auth/login';
    };

    const filterByCategory = (category) => {
      router.push({ name: 'Products', query: { category: category } });
    };

    const performSearch = () => {
      if (searchQuery.value.trim()) {
        router.push({ name: 'home', query: { search: searchQuery.value } }).catch((err) => {console.log(err)});
      }
    };

    const clearSearch = () => {
      searchQuery.value = '';
      router.push({ name: 'home' });
    };

    return { showUsername, username, isLoggedIn,searchQuery, logout, loginWithCognito, filterByCategory, performSearch,clearSearch };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #131921;
}

.logo {
  font-size: 1.5rem;
  color: #FF9900;
  text-decoration: none;
}

.search-container {
  display: flex;
  flex-grow: 1;
  margin: 0 1rem;
}

.search-input {
  flex-grow: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px 0 0 4px;
}

.search-button {
  background-color: #febd69;
  border: none;
  padding: 0.5rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.nav-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-links li {
  padding: 0 1rem;
  cursor: pointer;
  color: white;
}

.nav-links li:hover {
  text-decoration: underline;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-icons {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-icons li {
  padding: 0 0.5rem;
}

.nav-icons a {
  color: white;
  text-decoration: none;
}

.profile-icon {
  font-weight: bold;
  cursor: pointer;
}

.nav-icon-link, .nav-icons a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  border: 1px solid transparent; 
  border-radius: 4px; 
  transition: background-color 0.3s, border-color 0.3s;
}

.nav-icon-link:hover, .nav-icons a:hover {
  text-decoration: none;
  border-color: #f3f3f3; 
}
</style>
