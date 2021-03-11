<template>
    <div class="swiper-container">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide>
          <img src="../assets/images/slide_1.jpg" alt="slide1" />
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/slide_2.jpg" alt="slide2" />
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/slide_3.jpg" alt="slide3" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';

  export default {
    name: 'swiper-example-pagination-dynamic',
    title: 'Pagination / Dynamic bullets',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          speed: 2400,
          loop: true,
          autoplay: {
            delay: 2000,
          },
          pagination : '.swiper-pagination',
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        }
      }
    }
  }
</script>

