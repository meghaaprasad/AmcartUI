<template>
    <div>Loading...</div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'CallbackComponent',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      onMounted(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
  
        if (code) {
          try {
            // Replace this URL with your actual API endpoint
            const response = await fetch(`https://gfpizy7vp9.execute-api.us-east-1.amazonaws.com/test/api/Auth/callback?code=${code}`);
            if (response.ok) {
              const data = await response.json();
              store.dispatch('login', { username: data.username, accessToken: data.accessToken });
              router.push('/');
            } else {
              console.error('Failed to exchange code for tokens.');
              router.push('/login');
            }
          } catch (error) {
            console.error('Error handling callback:', error);
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      });
    },
  };
  </script>
  