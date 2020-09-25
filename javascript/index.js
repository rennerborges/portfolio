typerWriter();
adaptHeightViewport();
getYear('#valueAno');

getProjetos();

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

async function getProjetos(){

    await verifyProjetosLocalStorage();

    let projetos = localStorage.getItem('projetos');

    let swiper = document.querySelector('.swiper-wrapper');

    projetos = JSON.parse(projetos);


    for (let i = 0; i < projetos.length; i++) {
        const tags = await Ajax(projetos[i].languages_url);

        const contentTags =  prepareTags(tags.data)


        swiper.innerHTML +=
            ` <div class="swiper-slide">
                <div class="projetos-card">
                    <div class="title">
                        <h2>${projetos[i].name}<h2>
                    </div>
                    <div class="description">
                        <p>${projetos[i].description ? projetos[i].description : 'Projeto sem descrição'}</p>
                    </div>
                    <div class="tags">
                        ${contentTags}
                    </div>
                </div>
            </div>`
        
    }

    document.querySelector('.preloader').style.display = 'none';
    document.querySelector('.swiper-container').style.display = 'block';
    
    swiperProjetos();

}

async function Ajax(url){

    let ajax = window.ajaxPromise;
    let method = 'GET';

    return await ajax({ method, url });
}

function prepareTags(tags){
    let tag = '';

    Object.keys(tags).forEach(item => {
        tag += `
            <div class="tag">
                <span>${item}</span>
            </div>
        `
    })

    return tag;
}

function verifyProjetosLocalStorage(){
    return new Promise(async(resolve, reject)=>{
        try {
            if(!localStorage.getItem('projetos')){
                const projetos = await Ajax('https://api.github.com/users/rennerborges/repos');
                localStorage.setItem('projetos', JSON.stringify(projetos.data));
            }

            resolve(projetos);
        } catch (error) {
            reject(error);
        }
    })
}