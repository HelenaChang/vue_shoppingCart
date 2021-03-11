<template>
    <div>
        <loading :active.sync="isLoading"></loading>

         <div class="row justify-content-center mt-5">
            <div class="col-md-8 m-3">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th width="30"></th>
                                <th width="100">商品預覽</th>
                                <th>商品名稱</th>
                                <th width="100">數量</th>
                                <th width="80">小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                                <td class="align-middle">
                                    <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                </td>
                                <td class="align-middle">
                                    <img :src="item.product.imageUrl" class="img-fluid"
                                        alt="product">
                                </td>
                                <td class="align-middle">
                                    {{ item.product.title }}
                 
                                </td>
                                
                                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4" class="text-right">總計</td>
                                <td class="text-right">{{ cart.total | currency }}</td>
                            </tr>
                        </tfoot>
                    </table>
                

                <div class="my-5 justify-content-center">
                    <validation-observer v-slot="{ invalid }">
                    <form @submit.prevent="createOrder">
                        <h3 class="bg-light text-center py-3 mt-5">訂購人資訊</h3>
                        <validation-provider rules="required|email" v-slot="{ errors, classes }">
                            <div class="form-group">
                                <!-- 輸入框 -->
                                <label for="email">Email</label>
                                <input id="email" type="email" name="Email" v-model="form.user.email"
                                    class="form-control" :class="classes" placeholder="請輸入電子郵件信箱">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>

                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class="form-group">
                                <!-- 輸入框 -->
                                <label for="username">收件人姓名</label>
                                <input id="username" type="text" name="姓名" v-model="form.user.name"
                                    class="form-control" :class="classes" placeholder="請輸入姓名">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>
                    
                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class="form-group">
                                <!-- 輸入框 -->
                                <label for="usertel">收件人聯絡電話</label>
                                <input id="usertel" type="tel" name="聯絡電話" v-model="form.user.tel"
                                    class="form-control" :class="classes" placeholder="請輸入電話">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>

                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class="form-group">
                                <!-- 輸入框 -->
                                <label for="useraddress">收件人地址</label>
                                <input id="useraddress" type="text" name="收件人地址" v-model="form.user.address"
                                    class="form-control" :class="classes" placeholder="請輸入收件地址">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>

                        <div class="text-right">
                            <button type="button" class="btn btn-secondary"><router-link to="/home/products_list" class="text-white">繼續選購</router-link></button>
                        <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                        </div>
                    </form>
                    </validation-observer>
                </div>
            </div>
        </div>

      
        
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data() {
        return {
            products: [],
            product: {},
            status: {
                loadingItem:'',
            },
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
            cart: {},
            isLoading: false,
            coupon_code:'',
        };
    },
    methods: {
        getProducts() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.products = response.data.products;
                console.log(response);
                vm.isLoading = false;
            });
        },
        getProduct(id) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            vm.status.loadingItem = id;
            this.$http.get(url).then((response) => {
                vm.product = response.data.product;
                $('#productModal').modal('show');
                console.log(response);
                vm.status.loadingItem = '';
            });
        },
        getCart() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.cart = response.data.data;
                console.log(response);
                vm.isLoading = false;
            });
        },
        removeCartItem(id) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            vm.isLoading = true;
            this.$http.delete(url).then(() => {
                vm.getCart();
                vm.isLoading = false; 
            });
        },
        createOrder() {
            const vm = this; 
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form;
            vm.isLoading = true;
            this.$http.post(url ,{ data:order }).then((response) => {  
                    if (response){
                         console.log('訂單已建立', response);
                         if (response.data.success) {
                             vm.$router.push(`/home/customer_checkout/${response.data.orderId}`);
                         }
                         
                    }
                    vm.isLoading = false; 
            });
        }
    },
    created() {
        this.getProducts();
        this.getCart();
    },
};
</script>