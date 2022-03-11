import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import store from '../store/index';

const getServerData = () => {
    const loginError = ref('');
    const error = ref(null);
    const server = process.env.API;
    const router = useRouter();

    const load = async(directory, payload) => {
        try {
            //console.log(`${server}${directory}`, payload);
            const response = await axios.post(`${server}${directory}`, payload);
            store.dispatch('updateEmails', { emails: response.data.data, count: response.data.count })
            error.value = null;
            if (!response.data) error.value = `No Data Available!`;
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
            error.value = `No Data Available!`;
        }
    };

    const toTrash = async(payload) => {
        try {
            await axios.post(`${server}toTrash`, payload);
            router.push({ name: 'Login' });
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
        }
    };

    const addStar = async(payload) => {
        try {
            await axios.post(`${server}addStar`, payload);
            router.push({ name: 'Login' });
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
        }
    };

    const removeStar = async(payload) => {
        try {
            await axios.post(`${server}removeStar`, payload);
            router.push({ name: 'Login' });
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
        }
    };

    const markAsRead = async(payload) => {
        try {
            await axios.post(`${server}markAsRead`, payload);
            router.push({ name: 'Login' });
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
        }
    };


    const block = async(payload) => {
        try {
            await axios.post(`${server}block`, payload);
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
        }
    };

    const unblock = async(payload) => {
        try {
            await axios.post(`${server}unblock`, payload);
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
        }
    };

    const fullEmail = async(payload) => {
        try {
            const response = await axios.post(`${server}search`, payload);
            error.value = null;
            store.dispatch('updateCurrentMessage', response.data.data[0])
            if (!response.data) error.value = `No Data Available!`;
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
            error.value = `No Data Available!`;
        }
    };

    const sendMail = async(payload) => {
        try {
            await axios.post(`${server}sent`, payload);
            store.dispatch('updateCurrentPage', 'Sent')
            router.push({ name: "Index" });
        } catch (err) {
            if (err.response.status == '401' || err.response.status == '429') {
                store.dispatch('updateLoginStatus', false)
                router.push({ name: "Login" });
            }
        }
    };

    const login = async(payload) => {
        try {
            const response = await axios.post(`${server}login`, payload);
            loginError.value = ''
            store.dispatch('updateLoginStatus', true)
            store.dispatch('updateCurrentPage', 'Inbox');
            store.dispatch('updateSkipLimit', { skip: 0, limit: 10 });
            store.dispatch('updateCurrentMessage', {});
            store.dispatch('updateEditMode', 'Compose');
            store.dispatch('openCloseSidebar', false);
            router.push({ name: "Index" });
        } catch (err) {
            loginError.value = err.response.data.Error;
        }
    };

    const logout = async() => {
        try {
            const response = await axios.post(`${server}logout`, {});
            store.dispatch('updateLoginStatus', false)
            router.push({ name: "Login" });
        } catch (err) {
            store.dispatch('updateLoginStatus', false)
            router.push({ name: "Login" });
        }
    };

    return { error, loginError, load, fullEmail, addStar, removeStar, markAsRead, block, unblock, toTrash, sendMail, login, logout };
};

export default getServerData;