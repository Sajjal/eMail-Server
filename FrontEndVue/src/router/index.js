import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import EmailList from "../components/EmailList";
import Main from "../components/Main";
import ComposeEmail from "../components/ComposeEmail";
import axios from "axios";

let authStatus = false;
const server = process.env.VUE_APP_URI;

//Route Guard
const requireAuth = async (to, from, next) => {
  try {
    const response = await axios.post(`${server}authorize`, {});
    authStatus = true;
  } catch (err) {
    authStatus = false;
  }
  if (authStatus) {
    next();
  } else next({ name: "Login" });
};

const requireNoAuth = async (to, from, next) => {
  try {
    const response = await axios.post(`${server}authorize`, {});
    authStatus = true;
  } catch (err) {
    authStatus = false;
  }
  if (authStatus) {
    next({ name: "Inbox" });
  } else next();
};

/************************************************************/

const routes = [
  {
    path: "/inbox",
    name: "Inbox",
    component: EmailList,
    beforeEnter: requireAuth,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/compose",
    name: "Compose",
    component: ComposeEmail,
    beforeEnter: requireAuth,
  },
  {
    path: "/sent",
    name: "Sent",
    component: EmailList,
    beforeEnter: requireAuth,
  },
  {
    path: "/trash",
    name: "Trash",
    component: EmailList,
    beforeEnter: requireAuth,
  },
  {
    path: "/email/:id",
    name: "Email",
    component: Main,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/search/:keyword",
    name: "Search",
    component: EmailList,
    props: true,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
