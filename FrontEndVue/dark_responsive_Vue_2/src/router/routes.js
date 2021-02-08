import axios from 'axios';
import store from '../store/index';

const server = process.env.API;

//Route Guard
const requireAuth = async (to, from, next) => {
  try {
    const response = await axios.post(`${server}authorize`, {});
    store.dispatch('updateAuthorization', true);
    next();
  } catch (err) {
    store.dispatch('updateAuthorization', false);
    next({ name: 'Login' });
  }
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/',
    name: 'Inbox',
    beforeEnter: requireAuth,
    component: () => import('pages/EmailList.vue')
  },
  {
    path: '/sent',
    name: 'Sent',
    beforeEnter: requireAuth,
    component: () => import('pages/EmailList.vue')
  },
  {
    path: '/search/:directory/:keyword',
    name: 'Search',
    beforeEnter: requireAuth,
    component: () => import('pages/EmailList.vue')
  },
  {
    path: '/trash',
    name: 'Trash',
    beforeEnter: requireAuth,
    component: () => import('pages/EmailList.vue')
  },
  {
    path: '/email',
    name: 'Email',
    beforeEnter: requireAuth,
    component: () => import('pages/Main.vue')
  },
  {
    path: '/compose',
    name: 'Compose',
    beforeEnter: requireAuth,
    component: () => import('pages/Compose.vue')
  },
  {
    path: '/reply',
    name: 'Reply',
    beforeEnter: requireAuth,
    component: () => import('pages/Compose.vue')
  }
];

export default routes;
