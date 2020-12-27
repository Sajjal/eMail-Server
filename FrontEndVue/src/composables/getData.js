import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const getData = () => {
  const emails = ref([{}]);
  const loginError = ref("Enter Access Code!");
  const error = ref(null);
  const count = ref(null);
  const server = process.env.VUE_APP_URI;
  const router = useRouter();

  const load = async (directory, payload) => {
    try {
      //console.log(`${server}${directory}`, payload);
      const response = await axios.post(`${server}${directory}`, payload);
      emails.value = response.data.data;
      count.value = response.data.count;
      error.value = null;
      if (!emails.value.length) error.value = `No Data Available!`;
    } catch (err) {
      error.value = `No Data Available!`;
    }
  };

  const toTrash = async (directory, payload) => {
    await axios.post(`${server}${directory}`, payload);
    router.push({ name: payload.directory });
  };

  const sendMail = async (payload) => {
    await axios.post(`${server}sent`, payload);
    router.push({ name: "Sent" });
  };

  const login = async (payload) => {
    try {
      const response = await axios.post(`${server}login`, payload);
      router.push({ name: "Inbox" });
    } catch (err) {
      loginError.value = err.response.data.Error;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${server}logout`, {});
      router.push({ name: "Login" });
    } catch (err) {
      router.push({ name: "Login" });
    }
  };

  return { emails, error, loginError, count, load, toTrash, sendMail, login, logout };
};

export default getData;
