<template>
    <div>
      <nav class="navbar navbar-light bg-light">
    <router-link to="/homepage">
      <img src="../assets/images/SweetHeart_web_logo.png" alt="SweetHeart">
    </router-link>
  
    <div class="nav navbar navbar-right">
      <ul class="nav navbar">
        <li class="member">
          <router-link class="userLogin text-secondary" to="/login">
            <i class="fas fa-user fa-2x"></i>
            <h2 class="login">會員登入</h2>
          </router-link>
        </li>
  
        <li class="dropdown ml-auto">
          <button class="btn btn-sm btn-cart" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-shopping-cart fa-3x text-secondary"></i>
        
            <span class="sr-only">unread messages</span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <div class="px-4 py-3">
              <h6>已選擇商品</h6>
              <table class="table table-sm">
                <tbody>
                  <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                    <td class="align-middle">
                      <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      {{ item.product.title }}
                    </td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total }}</td>
                  </tr>
                </tfoot>
              </table>
              <router-link to="/home/customer_order" class="btn btn-primary btn-block text-white">
                <i class="fas fa-shopping-bag" aria-hidden="true"></i> 結帳去
              </router-link>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </nav>


        
    </div>
</template>

<script>

export default {
  name: 'Navbar',
    data() {
        return {
            products: [],
            product: {},
            cart: {},
        };
    },
    methods: {
        getProducts() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            this.$http.get(url).then((response) => {
                vm.products = response.data.products;
                console.log(response);
            });
        },
        getProduct(id) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.status.loadingItem = id;
            this.$http.get(url).then((response) => {
                vm.product = response.data.product;
                console.log(response);
                vm.status.loadingItem = '';
            });
        },
        getCart() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            this.$http.get(url).then((response) => {
                vm.cart = response.data.data;
                console.log(response);
            });
        },
        removeCartItem(id) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            this.$http.delete(url).then(() => {
                vm.getCart();
            });
        },
    },
    created() {
        this.getProducts();
        this.getCart();
    },
};
</script>