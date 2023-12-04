import * as VueRouter from 'vue-router'

import MainLayoutView from "../views/MainLayoutView.vue";
import AuthView from "../views/AuthView.vue";
import CartView from "../views/CartView.vue"

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: MainLayoutView },
        { path: '/login', name: 'Login', component: AuthView },
        { path: '/cart', name: 'Cart', component: CartView },
    ]
})

export default router