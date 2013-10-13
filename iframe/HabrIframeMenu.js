/* Детали реализации:
Работает в браузерах: хром, мозила;
При загрузке и обновлении iframe, появляется информирующая строка, для пользователя (почему сразу не отображется контент) 
Запоминал активный таб, до перезагрузки всей страницы, в куку (период хранения: сессия)
Работает только на главной странице: http://habrahabr.ru/
*/
$(function() {
    'use strict';
    var habrTabs = $('.main_menu a');
    var habrMenuContent = $('.content_left');
    var iframeLoadingInfo = $('<span> Please, wait! Iframe is loading.. </span>');
      
    function iframeMenuCreator(menuTabs, menuContent) {
        menuTabs.each(function() { 
            var ifr = $(document.createElement('iframe'));
            ifr.attr('src', this.href);
            ifr.addClass('_menuIframes');
            ifr.attr('scrolling','no');
            ifr.css({'display' : 'none'});
            ifr.appendTo(menuContent);
        });
    }
          
    function newMenuIfrBehaviour(menuTabs, menuIframes) {
        menuTabs.on('click', function(event) {
            event.preventDefault();
            document.cookie = 'activeTab=' + this.href;
            var clickedTab = $(this);
              
            if (!clickedTab.hasClass('active')){
                menuTabs.removeClass('active');
                clickedTab.addClass('active');
                menuIframes.each(function() {
                    var currFrame = $(this);
                    if (currFrame.attr('src') === clickedTab.attr('href')) {
                        currFrame.show();
                    } else {
                        currFrame.hide();
                    }
                });
            } else { // перезагружаем контент при повторном нажатии таба
                menuIframes.hide();
                iframeLoadingInfo.show();
                menuIframes.each(function() {
                    var currFrame = $(this);
                    if (currFrame.attr('src') === clickedTab.attr('href')) {
                        currFrame.attr('src', clickedTab.attr('href'));
                    }
                });
            }
        });
    }
      
    function iframeContentAction(menuIframes) {
        menuIframes.each(function() {
            var currIframe = $(this);
            currIframe.contents().find('body')
            .on('click', function(event) {
                event = event || window.event;
                var target = event.target || event.srcElement;
                if ($(target).closest('a').length !== 0 || target === 'button') {
                    setTimeout(function(){
                        currIframe.hide();
                        iframeLoadingInfo.show();
                    }, 1);
                }
            });
        });
    }
      
    function iframeContentReDesign(currIframe, menuContent) {
        var newIfrHeight;
        var newIfrWidth = menuContent.width();
        var currIframeContent = currIframe.contents().find('.content_left');
        currIframeContent.width(newIfrWidth + 'px');
          
        if (currIframe.css('display') === 'none') {
            currIframe.show();
            newIfrHeight = currIframeContent.height();
            currIframe.hide();
        } else newIfrHeight = currIframeContent.height(); 
          
        currIframe.height(newIfrHeight + 'px');
        currIframe.width(newIfrWidth + 'px');
        currIframeContent.siblings()
        .each (function() {
                $(this).hide();
        });
        currIframeContent.parent().css({'padding': '0px'});
    }
      
    function getLastHrefFromCookie(menuTabs) {
        var resultHref;
        resultHref = document.cookie.match(/(?:activeTab)(.+?)(?=;|$)/g);
        if (resultHref) {
            resultHref = resultHref[0].replace(/activeTab\=/g, '');
        } else {
            menuTabs.each(function() {
                if ($(this).hasClass('active')) {
                    resultHref = this.href;
                }
            });
        }
        return resultHref;
    } 
      
    habrMenuContent.empty(); // отчищаем контент меню 
    iframeMenuCreator(habrTabs, habrMenuContent); // заполняем контент iframe-елементами, с src из табов
      
    var createdIframes = $('._menuIframes');
    newMenuIfrBehaviour(habrTabs, createdIframes); // подстраиваем поведение меню с табами под созданные iframe
    habrMenuContent.prepend(iframeLoadingInfo); // показываем инфу загрузки фрейма
    createdIframes.load(function() {
        iframeContentAction(createdIframes); // настраиваем поведение iframe во время работы с пользователем (клики по ссылкам, кнопкам)
        iframeContentReDesign($(this), habrMenuContent); // настраиваем вид iframe и его содержимого, под размеры контента меню
        var lastHref = getLastHrefFromCookie(habrTabs); // с помощью куки получаем последний активный таб
        if (this.src === lastHref) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
        iframeLoadingInfo.hide();
        habrTabs.each(function() {
            $(this).removeClass('active');
            if (this.href === lastHref) {
                $(this).addClass('active');
            }
        });
    }); 
});
