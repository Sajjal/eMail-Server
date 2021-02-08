import axios from 'axios';
import store from '../store/index';

const server = process.env.API;

const readWriteData = () => {
  async function login(accessCode) {
    try {
      const response = await axios.post(`${server}login`, { accessCode });
      return response.data;
    } catch (err) {
      return { Error: err.response.data.Error };
    }
  }

  async function getEmails(directory, payload) {
    try {
      //console.log(`${server}${directory}`, payload);
      const response = await axios.post(`${server}${directory}`, payload);
      if (!payload.scroll) store.dispatch('updateEmails', response.data);
      return response.data;
    } catch (err) {
      return { Error: err.response.data.Error };
    }
  }

  async function getSingleEmail(directory, id) {
    let email = {};
    try {
      const response = await axios.post(`${server}search`, { directory, id });
      email = response.data.data[0];
      email.source = directory;
      store.dispatch('updateSingleEmail', email);
    } catch (err) {
      return { Error: err.response.data.Error };
    }
  }

  async function sendEmail(payload) {
    try {
      await axios.post(`${server}sent`, payload);
      return;
    } catch (err) {
      return { Error: err.response.data.Error };
    }
  }

  async function toTrash(directory, id) {
    try {
      await axios.post(`${server}toTrash`, { directory, id });

      let updatedEmails = store.state.emails.data.filter(email => {
        return email._id != id;
      });
      store.dispatch('updateEmailList', updatedEmails);
      return;
    } catch (err) {
      return { Error: err.response.data.Error };
    }
  }

  async function logout() {
    try {
      await axios.post(`${server}logout`, {});
      return;
    } catch (err) {
      return { Error: err.response.data.Error };
    }
  }

  return { login, getEmails, getSingleEmail, sendEmail, toTrash, logout };
};

export default readWriteData;
