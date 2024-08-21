document.addEventListener("DOMContentLoaded", (event) => {
    loadContent;
  });

function loadContent() {
    var screenWidth = window.screen.width;

    if (screenWidth <= 1000) {
        var elementAll = document.getElementById('rowHeaderAll');
        var elementTemplates = document.getElementById('isTemplates');
        var elementBanners = document.getElementById('isBanners');
        var elementSettings = document.getElementById('isSettings');
        var elementBannerHeader = document.getElementById('isBannerHeader');
        var elementBannerSub = document.getElementById('isBannerSub');

        console.log(elementBannerHeader);
        console.log(elementBannerSub);

        elementAll.classList.remove('row');
        elementTemplates.classList.remove('col-2');
        elementTemplates.style.display = 'none';
        elementBanners.classList.remove('col-7', 'vh-100');
        elementSettings.classList.remove('col-3');

        elementBannerHeader.style.fontSize = 'medium';
        elementBannerSub.style.fontSize = 'small';

    } else {
        var elementAll = document.getElementById('rowHeaderAll');
        var elementTemplates = document.getElementById('isTemplates');
        var elementBanners = document.getElementById('isBanners');
        var elementSettings = document.getElementById('isSettings');
        var elementBannerHeader = document.getElementById('isBannerHeader');
        var elementBannerSub = document.getElementById('isBannerSub');
        // element.classList.add('new-class');
        elementAll.classList.add('row');
        elementTemplates.classList.add('col-2');
        elementTemplates.style.display = 'block';
        elementBanners.classList.add('col-7', 'vh-100');
        elementSettings.classList.add('col-3'); 

        elementBannerHeader.style.fontSize = 'xxx-large';
        elementBannerSub.style.fontSize = 'large';
    }
}

window.onresize = loadContent;