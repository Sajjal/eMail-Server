import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: { authorized: false, emails: {}, singleEmail: {}, search: {} },
  mutations: {
    updateAuthorization(state, status) {
      state.authorized = status;
    },
    updateEmails(state, emails) {
      state.emails = emails;
    },
    updateSingleEmail(state, email) {
      state.singleEmail = email;
    },
    updateEmailList(state, emails) {
      state.emails.data = emails;
    },

    updateSearch(state, data) {
      state.search = data;
    }
  },
  actions: {
    updateAuthorization({ commit }, status) {
      commit('updateAuthorization', status);
    },
    updateEmails({ commit }, emails) {
      commit('updateEmails', emails);
    },
    updateSingleEmail({ commit }, email) {
      commit('updateSingleEmail', email);
    },
    updateEmailList({ commit }, emails) {
      commit('updateEmailList', emails);
    },
    updateSearch({ commit }, data) {
      commit('updateSearch', data);
    }
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
});
