<template>
 <div>
  <!-- <div class="banner">
        <img src="/images/banner.jpg" alt="Featured Promotion">
      </div> -->
  <nav-bar></nav-bar>
  <router-view></router-view>
 </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: { 
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
