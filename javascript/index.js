typerWriter();
adaptHeightViewport();
getYear('#valueAno');

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