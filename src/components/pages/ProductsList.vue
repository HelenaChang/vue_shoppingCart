<template>
    <div>
        <loading :active.sync="isLoading"></loading>

        <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
            <div class="container">
                <div class="bg-lighter" data-aos="flip-right" >
                    <h1 class="display-4">Stressed is just desserts if you can reverse.</h1>
                    <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its
                        parent.
                    </p>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="list-group sticky-top">
                        <ul>
                            <li v-for="(item,key) in filter.list" :key="key">
                                <a class="list-group-item list-group-item-action text-primary"  @click.prevent="changeCategory(item)" href="#">{{item}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-9">
                    <form class="form-inline searchbar mb-3">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> 
            
                    <div class="product-content">
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="item in products" :key="item.id">
                                <div class="card box-shadow border-0 text-center h-100">
                                    <img style="height: 150px; background-size: cover; background-position: center" :style="{ backgroundImage: `url(${item.imageUrl})`}">
                                    </img>
                                    <div class="card-body">
                                        <span class="badge badge-secondary text-light float-right ml-2">{{ item.category }}</span>
                                        <h5 class="card-title">
                                            <span class="text-info l-2">{{ item.title }}</span>
                                        </h5>
                                        <p class="card-text">{{ item.content }}</p>
                                        <div class="d-flex justify-content-between align-items-baseline">
                                      
                                            <del class="h6" v-if="item.price">{{ item.origin_price | currency }}</del>
                                            <div class="h5 text-danger" v-if="item.price">{{ item.price | currency }}</div>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex">
                                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                                            <i class="fas fa-spinner fa-spin"  v-if="status.loadingItem === product.id"></i>
                                            加到購物車
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>                    
                        </div>
                    </div>
                    <div class="icon-container sti" :class="{ 'showing': iconDisplay }">
                            <svg class="icon" viewBox="0 0 100 100" width="80" height="80">
                                <circle class="circle" cx="50" cy="50" r="48"></circle>
                                <polyline class="check" points="28,53 42,66 74,34"></polyline>
                            </svg>
                            <p>已加入購物車</p>
                    </div>
                </div>
            </div>
        </div>
        <footer class="bg-light text-muted py-5">
            <ul class="list-inline text-center">
                <li class="list-inline-item">&copy; 僅供練習 無任何商業用途</li>
                <li class="list-inline-item">
                    <a class="text-info" href="https://line.me/zh-hant/" target="_blank">
                        <i class="fab fa-line fa-2x" aria-hidden="true"></i></a>
                </li>
                <li class="list-inline-item">
                    <a class="text-info" href="https://www.facebook.com/" target="_blank">
                        <i class="fab fa-facebook-square fa-2x" aria-hidden="true"></i></a>
                </li>
                <li class="list-inline-item">
                    <a class="text-info" href="https://www.instagram.com/?hl=zh-tw" target="_blank">
                        <i class="fab fa-instagram-square fa-2x" aria-hidden="true"></i></a>
                </li>
            </ul>
        </footer>
    </div>
    
</template>


<script>
import $ from 'jquery';

export default {
    data() {
        return {
            products: [
            ],
            product: {},
            status: {
                loadingItem:'',
            },
            filter:{
                list:['全部商品','蛋糕','麵包','餅乾'],
                str:'全部商品',
            },
            cart: {},
            isActive: false,
            iconDisplay: false,
        };
    },
    methods: {
        getProducts() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
            this.$http.get(url).then((response) => {
                if (vm.filter.str !== '全部商品'){
                    let filterPro = response.data.products.filter(function(item){
                    return item.category == vm.filter.str;
                });
                vm.products = filterPro;
                } else {
                    vm.products = response.data.products;
                    console.log(response);    
                };
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
        changeCategory(str){
            const vm = this;
            vm.filter.str = str;
            vm.getProducts(); 
        },
        addtoCart(id, qty = 1) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.status.loadingItem = id;
            vm.iconDisplay = true;
                setTimeout(() => {
                vm.iconDisplay = false
                }, 800) ;
            const cart = {
                product_id: id,
                qty,
            };
            this.$http.post(url, {data: cart}).then((response) => {
                console.log(response);
                vm.status.loadingItem = '';
                vm.getCart();
            });
        },
        getCart() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            this.$http.get(url).then((response) => {
                vm.cart = response.data.data;   
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