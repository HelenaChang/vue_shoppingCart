<template>
    <div>

        <slideSwiper></slideSwiper>

        <div class="contact">
            <div class="container mt-5">
                <div class="row clearfix">
                    <div class="col-6 col-md-3 mb-5 bordered">
                        <router-link to="/home/products_list" class="text-accent">
                        <div class="contact-method">
                            <i class="fas fa-store fa-2x mb-2"></i>
                            <h4>來購物吧</h4>
                            <h6>商品瀏覽</h6>
                        </div>
                        </router-link>
                    </div>
                    <div class="col-6 col-md-3 mb-5 bordered">
                        <a href="https://line.me/zh-hant/" target="_blank" class="text-info"> 
                        <div class="contact-method ">
                            <i class="fab fa-line fa-2x mb-2"></i>
                            <h4>加入 Line 好友</h4>
                            <h6>專人客服專線</h6>
                        </div>
                        </a>
                    </div>
                    <div class="col-6 col-md-3 mb-5 bordered">
                        <a href="https://www.facebook.com/" target="_blank" class="text-info">
                        <div class="contact-method">
                        <i class="fab fa-facebook fa-2x mb-2"></i>
                            <h4>Facebook</h4>
                            <h6>即時商品訊息</h6>
                        </div>
                        </a>
                    </div>
                    <div class="col-6 col-md-3 bordered">
                        <a href="https://www.instagram.com/?hl=zh-tw" target="_blank" class="text-info">
                        <div class="contact-method">
                            <i class="fab fa-instagram fa-2x mb-2"></i>
                            <h4>關注 instagram</h4>
                            <h6>提供最新資訊</h6>
                        </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="event">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="title text-dark" data-aos="fade-right">30% Discount</h1>
                        <h3 class="subtitoe text-dark" data-aos="fade-right">for this winter only</h3>
                        <a href="#" class="button bordered text-white">COUPON</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="map">
            <div class="container mt-5">
                <div class="row">
                    <div class="col-12 col-md-6 mb-5 info" data-aos="fade-right">
                        <h3 class="text-primary">店舖位置</h3>
                        <ul>
                        <li><label>地址：</label>台北市中正區北平西路100號</li>
                        <li><label>電話：</label><a href="tel:0912-345-678">0912-345678</a></li>
                        <li><label>Email：</label><a href="mailto:testmail@yourdomain.com">testmail@yourdomain.com</a></li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="iframe-rwd" data-aos="fade-left">
                        <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.6028701990767!2d121.51411566498817!3d25.047547893902305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9727e339109%3A0xc34a31ce3a4abecb!2z6Ie65YyX6LuK56uZ!5e0!3m2!1szh-TW!2stw!4v1606381192492!5m2!1szh-TW!2stw"
                        width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
                        tabindex="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>  

        <footer class="bg-light text-muted py-5 mt-5">
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
import slideSwiper from '../slideSwiper';


export default {
    components: {
        slideSwiper,

    },
}

</script>
