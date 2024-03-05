<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input v-model="credentials.username" type="text" id="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="credentials.password" type="password" id="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        credentials: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5005/api/Auth/login', this.credentials);
          // Assuming the API returns tokens in the response
          const { AccessToken } = response.accessToken;
          console.log(AccessToken);
          // Store the access token in local storage or a global state (e.g., Vuex)
          localStorage.setItem('accessToken', AccessToken);
  
          // Redirect or update UI upon successful login
          this.$router.push({ name: 'home' }); // Assuming you have a route named 'home'
        } catch (error) {
          // Handle login errors (e.g., show a message to the user)
          console.error(error);
          alert('Login failed. Please check your credentials and try again.');
        }
      }
    }
  };
  </script>
  