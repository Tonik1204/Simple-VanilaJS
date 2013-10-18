/* Детали реализации:
1) Код обновляет содержимое всех табов сайта http://www.paddypower.it/scommesse-calcio, без мигания старого контента
2) Содержимое табов обновляется по кнопкам "MOSTRA" и "AGGIORNA QUOTE"
3) Почитав рекомендации к предыдущей работе изменил округление ставок в меньшую сторону
4) Проверял в браузерах: хром, опера, мозила, ie
*/
      
(function() {
    'use strict';
//------------------------TOOLS------------------------------
    function decorate(original, before, after, context) {
        return function() {
            context = context || this;
            var res;
            if (typeof before === 'function') {
                before.apply(context, arguments);
            }
            res = original.apply(context, arguments);
            if (typeof after === 'function') {
                after.apply(context, arguments);
            }
            return res;
        };
    }
//------------------------MAIN PART------------------------------   
  
    function paddyPowerReDesign(url, obj) {
        var currTab = jQuery('#' + obj.id);
        tabReDesign(currTab.eq(0));
    } 
  
    function postAjaxModifing() {
        var visibleTab = jQuery('.tabCnt:visible');
        tabReDesign(visibleTab.eq(0));
    }
  
    function tabReDesign(currentTab) {
  
        function getBidGain(money, coefficient, className) {
            var text = 'gioca €' + money + ' vinci ' + '€' + Math.floor(money * parseFloat(coefficient).toFixed(2));
            return jQuery('<div class="'+className+'"><span>'+text+'</span></div>');
        }
  
        var tables  = currentTab.find('.footballcard');
        var links = currentTab.find('th.fbtbl a');
        for (var i = 1; i < links.length; i++){
            links.eq(i).hide();
        }
  
        tables.each(function() {
            var table = jQuery(this);
            var columns = table.find('col');
            columns.eq(3).css('width','15px');
            columns.eq(5).css('width','95px');
              
                table.find('tbody tr').each(function() {
                    var row = jQuery(this); 
                    var columnWithTitles = row.find('.fbhlt').eq(0);
                    var columnWithButtons = row.find('.fbhlt').eq(1);
                    var columnWithGain = row.find('.fbhlt').eq(2);
                    var buttonsWithBids = row.find('.fbhlt').children();
                    row.find('.time, .tv, .stats, .bets')
                        .css('vertical-align', 'top');
                    var middleButton = columnWithButtons.find('div');
  
                    if (middleButton.length === 1) {
                        buttonsWithBids.eq(1).before(buttonsWithBids.eq(0));
                        buttonsWithBids.eq(1).after(buttonsWithBids.eq(2));
                          
                        columnWithTitles.append('<div class="bid_title _home"><span>1</span></div>');
                        columnWithTitles.append('<div class="bid_title"><span>X</span></div>');
                        columnWithTitles.append('<div class="bid_title _visitor"><span>2</span></div>');
                    // создаем div с текстом выигрыша, добавляем ему класс и вставляем его в коллонку таблицы.
                        columnWithGain.append(getBidGain(20, buttonsWithBids.eq(0).find('.prc').text(), 'bid_gain _home')); 
                        columnWithGain.append(getBidGain(20, buttonsWithBids.eq(1).find('.prc').text(), 'bid_gain'));
                        columnWithGain.append(getBidGain(20, buttonsWithBids.eq(2).find('.prc').text(), 'bid_gain _visitor'));
                    }
                }); 
            });
          
        currentTab.find('.bid_title').css({
            'color' : '#197CAF',
            'font-size' : '10px'
        });
  
        currentTab.find('.bid_gain').css({
            'color' : '#197CAF',
            'font-size' : '12px',
            'font-weight' : 'normal'    
        });
  
        currentTab.find('._home').css({
            'margin-bottom' : '15px',
            'margin-top' : ''
        }); 
  
        currentTab.find('._visitor').css({
            'margin-bottom' : '',
            'margin-top' : '15px'
        }); 
    }
        // так как при открытии сайта, первый открытый таб заполняется сразу, то его нужно изменить
    var startVisibleTab = jQuery('.tabCnt:visible');
    if (startVisibleTab.children().length) { // проверка на наличие DOM-елементов в табе
        tabReDesign(startVisibleTab);
    }
    gotAjaxContent = decorate(gotAjaxContent, false, paddyPowerReDesign); //декорируем функции сайта подгружающие контент, изменяя его таким образом до вствки в DOM
    _lb_fb_cpn_got_ajax_content = decorate(_lb_fb_cpn_got_ajax_content, false, postAjaxModifing);
}());
