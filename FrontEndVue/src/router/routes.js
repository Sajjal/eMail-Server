import store from '../store/index';
import axios from 'axios';
const server = process.env.API;


//Route Guard
const requireAuth = async(to, from, next) => {
    try {
        const response = await axios.post(`${server}authorize`, {});
        store.dispatch('updateLoginStatus', true);
        next();
    } catch (err) {
        //console.log(err);
        store.dispatch('updateLoginStatus', false);
        next({ name: 'Login' });
    }
};

const requireNoAuth = (to, from, next) => {
    if (store.state.isLoggedIn) {
        next({ name: "Index" });
    } else next();
};


const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '',
                name: 'Index',
                beforeEnter: requireAuth,
                component: () =>
                    import ('pages/Index.vue')
            },
            {
                path: '/login',
                name: 'Login',
                beforeEnter: requireNoAuth,
                component: () =>
                    import ('src/pages/Login.vue')
            },
            {
                path: '/compose',
                name: 'Compose',
                beforeEnter: requireAuth,
                component: () =>
                    import ('pages/Compose.vue')
            },

        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Index.vue')
    }
]

export default routes