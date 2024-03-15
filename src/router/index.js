// Import components
/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
//import HomeComponent from '../components/HomeComponent.vue';
import LoginComponent from '@/views/LoginComponent.vue';
import CallbackComponent from '@/components/CallbackComponent.vue';
import ProductDetailComponent from '@/components/ProductDetails.vue';
import Products from '@/components/ProductDisplay.vue';
import AddProductForm from '@/components/ProductAdd.vue'; 

// Define routes
const routes = [
   {
     path: '/',
     name: 'home',
     component: Products
   },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/callback',
    name: 'Callback',
    component: CallbackComponent,
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetailComponent,
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
    component: AddProductForm
  },
];

// Create the router instance and pass the `routes` option
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
