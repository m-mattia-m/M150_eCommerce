import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Products from "../pages/Products.vue";
import Cart from "../pages/Cart.vue";
import Payment from "../pages/Payment.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/payment',
        name: 'Payment',
        component: Payment,
    },
]
export const router = createRouter({
    history: createWebHistory(),
    routes,
})