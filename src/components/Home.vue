<template>
    <div>
        
        <Navbar></Navbar>
    
        <router-view></router-view>

    </div>
</template>


<script>

import Navbar from './Navbar';


export default {
    components: {
        Navbar,

    },
    created() {
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)sweetToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.$http.defaults.headers.common.Authorization = myCookie;
    }
};
</script>