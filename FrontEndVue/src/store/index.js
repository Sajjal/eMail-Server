import { createStore } from 'vuex'

export default createStore({
    state: { leftDrawerOpen: false, count: 0, emails: [], isLoggedIn: false, currentPage: 'Inbox', editMode: 'Compose', currentMessage: {}, skip: 0, limit: 10 },
    mutations: {
        openCloseSidebar(state, status) {
            state.leftDrawerOpen = status;
        },
        updateLoginStatus(state, loginStatus) {
            state.isLoggedIn = loginStatus;
        },
        updateEmails(state, emails) {
            state.emails = emails.emails;
            state.count = emails.count
        },
        updateSkipLimit(state, skipLimit) {
            state.skip = skipLimit.skip;
            state.limit = skipLimit.limit
        },
        updateCurrentMessage(state, message) {
            state.currentMessage = message;
        },
        updateEditMode(state, editMode) {
            state.editMode = editMode;
        },
        updateCurrentPage(state, page) {
            state.currentPage = page;
        },
    },
    actions: {
        openCloseSidebar({ commit }, status) {
            commit('openCloseSidebar', status);
        },
        updateLoginStatus({ commit }, loginStatus) {
            commit('updateLoginStatus', loginStatus);
        },
        updateEmails({ commit }, emails) {
            commit('updateEmails', emails);
        },
        updateSkipLimit({ commit }, skipLimit) {
            commit('updateSkipLimit', skipLimit);
        },
        updateCurrentMessage({ commit }, message) {
            commit('updateCurrentMessage', message);
        },
        updateEditMode({ commit }, editMode) {
            commit('updateEditMode', editMode);
        },
        updateCurrentPage({ commit }, page) {
            commit('updateCurrentPage', page);
        },

    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
})