import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Register from "../views/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: '*' ,
    redirect: "/auth"
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
