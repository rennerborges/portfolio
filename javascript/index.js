typerWriter();
adaptHeightViewport();
getYear('#valueAno');
swiperProjetos();

function adaptHeightViewport(){
    actionAdapt();
    window.addEventListener('resize', () => {
        actionAdapt();
    });

    function actionAdapt(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

}

function getYear(selector){
    let data = new Date;

    document.querySelector(selector).innerHTML = data.getFullYear();
}

window.addEventListener('resize', ()=>{
    swiperProjetos();
})

function swiperProjetos(){
    let slidesPerView = window.innerWidth > 750 ? 2 : 1;

    if(window.innerWidth > 1100){
        slidesPerView = 3;
    }

    if(window.swiper){

        window.swiper.params.slidesPerView = slidesPerView;

        window.swiper.update();

    } else {

         window.swiper = new Swiper('.swiper-container', {
            slidesPerView,
            // normalizeSlideIndex: false,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
}