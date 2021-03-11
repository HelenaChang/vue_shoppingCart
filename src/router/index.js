import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
import Login from '@/components/pages/Login';
import Homepage from '@/components/pages/Homepage';
import ProductsList from '@/components/pages/ProductsList';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'homepage',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/homepage',
          name: 'Homepage',
          component: Homepage,
        },
        {
          path: 'products_list',
          name: 'Products_List',
          component: ProductsList,
        },
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }, 
      ],
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    
    
  ],
});
