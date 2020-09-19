typerWriter();
adaptHeightViewport();


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