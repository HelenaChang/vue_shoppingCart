<template>
    <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
        <h2 class="alert alert-warning alert-rounded text-center mb-5" role="alert">
            恬心烘焙 訂單確認
        </h2>
            <table class="table">
                <thead>
                    <th width="100">商品預覽</th>
                    <th>商品名稱</th>
                    <th width="100">數量</th>
                    <th width="80">小計</th>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">
                        <img :src="item.product.imageUrl" class="img-fluid"
                                        alt="product">
                    </td>
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total | currency}}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ order.total | currency }}</td>
                    </tr>
                </tfoot>
            </table>

            <table class="table">
                <tbody>
                    <tr>
                        <th width="100">Email</th>
                        <td>{{ order.user.email }}</td> 
                       
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-right mb-3" v-if="order.is_paid === false">
                <button class="btn btn-danger"><i class="far fa-credit-card"></i> 確認付款</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            order: {
                user: {},
            },
            orderId: '',  
        };
    },
    methods: {
        getOrder() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`; 
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.order = response.data.order; 
                console.log(response);
                vm.isLoading = false;
            });
        }, 
        payOrder() { 
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`; 
            vm.isLoading = true;
            this.$http.post(url).then((response) => {
                console.log(response);
                if (response.data.success) { 
                    vm.getOrder();
                }
                vm.isLoading = false;
            });
        },
    },
    created() {
        this.orderId = this.$route.params.orderId; 
        this.getOrder();
        console.log(this.orderId);
    },
};
</script>