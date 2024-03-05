// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    username: localStorage.getItem('username') || '',
    isLoggedIn: !!localStorage.getItem('accessToken'),
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
      localStorage.setItem('username', username);
    },
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    logout(state) {
      state.username = '';
      state.isLoggedIn = false;
      localStorage.removeItem('username');
      localStorage.removeItem('accessToken');
    }
  },
  actions: {
    login({ commit }, { username, accessToken }) {
      commit('setUsername', username);
      commit('setLoggedIn', true);
      localStorage.setItem('accessToken', accessToken);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    username: (state) => state.username,
    isLoggedIn: (state) => state.isLoggedIn,
  },
});
