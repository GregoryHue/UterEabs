import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Account from '../views/Account.vue'
import Acc_See from '../views/Account/See.vue'
import Acc_Modify from '../views/Account/Modify.vue'
import Acc_Delete from '../views/Account/Delete.vue'
import Articles from '../views/Articles.vue'
import Art_Create from '../views/Articles/Create.vue'
import Art_See from '../views/Articles/See.vue'
import Art_Modify from '../views/Articles/Modify.vue'
import Art_Delete from '../views/Articles/Delete.vue'
import Deliveries from '../views/Deliveries.vue'
import Home from '../views/Home.vue'
import Menus from '../views/Menus.vue'
import Men_Create from '../views/Menus/Create.vue'
import Men_See from '../views/Menus/See.vue'
import Men_Modify from '../views/Menus/Modify.vue'
import Men_Delete from '../views/Menus/Delete.vue'
import Orders from '../views/Orders.vue'
import Share from '../views/Share.vue'
import Stats from '../views/Stats.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/account',
    name: 'Account',
    component: Account,
    children: [
      {
        path: 'see',
        component: Acc_See
      },
      {
        path: 'modify',
        component: Acc_Modify
      },
      {
        path: 'delete',
        component: Acc_Delete
      }
    ]

  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
    children: [
      {
        path: 'see',
        component: Art_See
      },
      {
        path: 'create',
        component: Art_Create
      },
      {
        path: 'modify',
        component: Art_Modify
      },
      {
        path: 'delete',
        component: Art_Delete
      }
    ]
  },
  {
    path: '/deliveries',
    name: 'Deliveries',
    component: Deliveries
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/menus',
    name: 'Menus',
    component: Menus,
    children: [
      {
        path: 'see',
        component: Men_See
      },
      {
        path: 'create',
        component: Men_Create
      },
      {
        path: 'modify',
        component: Men_Modify
      },
      {
        path: 'delete',
        component: Men_Delete
      }
    ]
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
