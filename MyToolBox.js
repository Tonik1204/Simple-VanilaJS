//0)----------------------------------------------вывод данных в консоль
 function l() {
		if (window.console.log){
            return window.console.log.apply(console, arguments);
			}
    }
		
//1)----------------------------------------------проверка на массив и на объект
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

//2)----------------------------------------------фильтрует массив переданной ф-цией, которая должна возвращать true или false
function filter(arr, func) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

//3)----------------------------------------------использовать только с filter	
function inArray(arr) {
            return function compare(elem) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === elem) {
                        return true;
                    }
                }
            };
}
//Пример работы 2-ой и 3-ей ф-ций вместе. Результат: все элементы первого массива, которые встречаются во втором(одинаковые элементы первого массива оставляет)			
// var arr = [1, 2, 3, 4, 2, 5, 6, 7];
// console.log(filter(arr, inArray([1, 2, 10]))); // [1,2,2]

//4)----------------------------------------------ф-ция оставляет только полное совпадение элементов из двух массивов(кол-во одинаковых эл-тов учитывается)
        function intersection(arr1, arr2) {
            var newArr1 = [].concat(arr1);
            var newArr2 = [].concat(arr2);
            var resArr = [];
            for (var i = 0; i < newArr2.length; ) {
                if (newArr1.indexOf(newArr2[i]) !== -1) {
                    resArr.push(newArr2[i]);
                    newArr1.splice(newArr1.indexOf(newArr2[i]), 1);
                    newArr2.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            return resArr;
        }

//5)----------------------------------------------ф-ция убирает из первого массива все элементы второго(одинаковые элементы не убираются, убирается ровно столько сколько во втором массиве)	
function clearFromArr(arr1, arr2) {
            var newArr1 = [].concat(arr1);
            var newArr2 = [].concat(arr2);
            for (var i = 0; i < newArr2.length; ) { 
                if (newArr1.indexOf(newArr2[i]) !== -1) {
                    newArr1.splice(newArr1.indexOf(newArr2[i]), 1);
                    newArr2.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            return newArr1;
        }	
//  console.log(clearFromArr([1,2,3,4,5,4], [4,1])); // выдаст [2,3,5,4]
		
//6)----------------------------------------------ф-ция убирает повторяющиеся элементы из массива(все елементы-уникальные)
    function dublicatKiller(arr) {
        var j, newArr = [].concat(arr); // копирование массива
        for (var i = 0; i < newArr.length; i++) {
            while (j = newArr.indexOf(newArr[i], i + 1), j !== -1) {
                newArr.splice(j, 1);
            }
        }
        return newArr;
    }

//7)----------------------------------------------соседний элемент переданного узла(node) без " ", и коментов в DOM
var next = (function () {
var TEXT_NODE_TYPE = 3;
var COMMENT_NODE_TYPE = 8;
 
return function (node) {
var nextSiblingNode = node.nextSibling;
while (!(nextSiblingNode && ((nextSiblingNode.nodeType !== TEXT_NODE_TYPE) && (nextSiblingNode.nodeType !== COMMENT_NODE_TYPE)))){
	nextSiblingNode=nextSiblingNode.nextSibling;
}
return nextSiblingNode;
}}());

//8)----------------------------------------------возвращает елементы arr1 не присутствующие в arr2(не включает одинаковых элементов)
function fitlerFromArr(arr1, arr2) { 
		var newArr = arr1.filter(function (value) {
            return arr2.indexOf(value) === -1;
		});
		return newArr;
		}
//  console.log(clearFromArr([1,2,3,4,5,4], [4,1])); // выдаст [2,3,5]

//9)----------------------------------------------Преобразует массиоподобный объект в массив
function toArray (obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        return obj;
    }
    var length = obj.length;
    var newArr = [];
    for (var i = 0; i < length; i += 1) {
        newArr.push(obj[i]);
    }
    return newArr;
}

//10)----------------------------------------------Получение координат элемента на станице, относительно документа
function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

        function getStyle(selector, styleProp) {
            var elem = document.querySelector(selector);
            if (elem.currentStyle)
                var value = elem.currentStyle[styleProp];
            else if (window.getComputedStyle)
                var value = document.defaultView.getComputedStyle(elem, null).getPropertyValue(styleProp);
            return value;
        }
//11)----------------------------------------------Связывание событий
  function bind(node, eventName, handler, ref) {
        function handlerCrossBrowser(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            return handler.call(ref, event);
        }
        if (node.addEventListener) {
            node.addEventListener(eventName, handlerCrossBrowser,
                    false);
        } else {
            node.attachEvent('on' + eventName,
                    handlerCrossBrowser);
        }
		return handlerCrossBrowser;
    }
	
	function unbind(obj, event_name, handler) {
            if (obj.removeEventListener) {
                obj.removeEventListener(event_name, handler, false);
            } else {
                obj.detachEvent('on' + event_name, handler);
            }
        }
	
	function addEvent(obj, event_name, handler) {
            if (obj.addEventListener) {
                obj.addEventListener(event_name, handler, false);
            } else if (obj.attachEvent) {
                obj.attachEvent('on' + event_name, handler);
            }
        }
		
		function removeEvent(obj, event_name, handler) {
				if (obj.removeEventListener) {
					obj.removeEventListener(event_name, handler, false);
				} else {
					obj.detachEvent('on' + event_name, handler);
				}
			}

//12)-----------------------------------------------функции для работы с классами и отмена действий браузера по умолчанию
	function hasClass(el, name) {
		return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
	}

	function addClass(el, name) {
		if (!hasClass(el, name)) {
			el.className += (el.className ? ' ' : '') + name;
		}
	}

	function removeClass(el, name) {
		if (hasClass(el, name)) {
			el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
		}
	}
	
	function prevDef(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
//12)-----------------------------------------------Функция для определения координат указателя мыши
    function cursorCoords(event) {
        var x = y = 0;
        if (document.attachEvent != null) { // Internet Explorer & Opera
            x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        } else if (!document.attachEvent && document.addEventListener) { 
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
        } else {
            // Do nothing
        }
        return { x: x, y: y };
    }

//13)---------------------------------------------паттерн для связи "один, ко многим"--------
// передача данных как параметр ф-ции в subscribe
    var Observer = (function () {
        function Observer() {
            this.subscribers = [];
        }

        Observer.prototype = {
            deliver: function (data) {
                for (var i in this.subscribers) {
                    var elem = this.subscribers[i];
                    elem.observer.call(elem.context, data);
                }
            },
            subscribe: function (observer, context) {
                var ctx = context || null;
                this.subscribers.push({ observer: observer, context: ctx });
            }
        };
        return Observer;
    } ());
// передача данных как свойство "result" объекта
	var Observer = (function () {
        function Observer() {
            this.subscribers = [];
        }

        Observer.prototype = {
            deliver: function (data) {
                    this.subscribers[0].result=data;                
            },
            subscribe: function (obj) {
                this.subscribers.push(obj);
            }
        };
        return Observer;
    } ());
	/* пример:
var resultObj = {}; 
var getDataByEvent = new Observer();
getDataByEvent.deliver(!!!->data);
getDataByEvent.subscribe(resultObj);*/

//14)--------------------------------------------Полуение рендомного цвета--------
        function get_random_color() {
          var letters = '0123456789ABCDEF'.split('');
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
          }
          return color;
        }	

//15)--------------------------------------------паттерн Singletone------------------------
		var Singletone=(function (){
			var instance;
			
			return function (){
				if (instance){
					return instance;
				} else {
					instance = this;
				  }
			};
		}());

//16)--------------------------------------------паттерн Decorate------------------------
    function decorate(original, mm_func) {

        return function() {
            var res;
            mm_func.apply(this, arguments);
            res = original.apply(this, arguments);

            return res;
        };
    }

    function new_func() {
        //...
    }
    
    old_func = decorate(old_func, new_func);

    //-------------||-----------------

    old_func = (function(fn) {
        return function () {
            new_func();
            return fn.apply(this, arguments);
        }               
    }(old_func))


//17)--------------------------------------------adding your styles------------------------
    function mm_style(css, id) {

        var head = document.head || document.getElementsByTagName('head')[0],
            stl = document.createElement('style');

            stl.type = 'text/css';
            stl.id = id;
            if (stl.styleSheet) {
                stl.styleSheet.cssText = css;
            } else {
                stl.appendChild(document.createTextNode(css));
            }
            head.appendChild(stl);
    }
    mm_style('body {position: relative; left:-10000px; visibility: hidden;}', 'mm_t22_hide'); 


//18)--------------------------------------------Browser detection 
/Firefox/.test(navigator.userAgent) // for FireFox

/Trident/.test(navigator.appVersion) // for IE
/Trident\/[5-7]\.0/.test(navigator.appVersion) // for IE 9|10|11

if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) { // for Safari
    var position = navigator.userAgent.search("Version") + 8;
    var end = navigator.userAgent.search(" Safari");
    var version = navigator.userAgent.substring(position,end);
    if (/6|7\.0/.test(version)) { // for Safari 6|7
        
    }
}

//19)----------------------------Немного о деффердах
var def = new $.Deferred;
var def2 = new $.Deferred;
var prom = def.promise();

prom.then(function () { // когда then для 1-го
  return def2.promise();// возвращает 2-ой объект дефферд
}).done(function () {
  console.log('Done'); // то done уже будет относиться ко 2-му, и выполниться только после
});

def.resolve();
setTimeout('def2.resolve()', 1500); // ресолва для 2-го

//20)----------------------------window onload
function ready() { 

}

if (window.addEventListener)
    window.addEventListener('load', ready, false);
else if (window.attachEvent)
    window.attachEvent('onload', ready);

//21)----------------------------all imgs loaded event
var loadedImgs = 0,
    itemsImgs = $('img');

function checkImgLoad() {
    if (++loadedImgs === itemsImgs.length) {
        //..do something
    }
}

itemsImgs.load(checkImgLoad).error(checkImgLoad);

//22) ---------------------------insert img
#$(ContentManager:IMG_name.png)!

//23) -----------------------------each AJAX complete
var oldAJAXOpen = XMLHttpRequest.prototype.open;

function onStateChange(event) {
    if (event.currentTarget && event.currentTarget.readyState === 4) {
        // ...&& event.currentTarget.responseURL(event.currentTarget.response) = 'url(text)'
    }
}

XMLHttpRequest.prototype.open = function() {

    if (window.addEventListener)
        this.addEventListener("readystatechange", onStateChange);
    else if (window.attachEvent)
        this.attachEvent("onreadystatechange", onStateChange);
    
    oldAJAXOpen.apply(this, arguments);
}

//24) ------------------------- trigger on each DOM change
$('body').bind("DOMSubtreeModified", function () {
    //..do something ””
});

//25) ------------------------- trigger on each 'elem' size change
$(elem).append('<iframe id="frame0" name="frame0" width=100% height=100% style="position:absolute;z-index:-1;top:0;"></iframe>');

frame0.onresize = function() {
    //..do something ””
}

//26) ------------------------- popup centered
'#overlay {' +
    'position: fixed;' +
    'top: 0px;' +
    'left: 0px;' +
    'height: 120%;' +
    'width: 100%;' +
    'opacity: 0.65;' +
    'background-color: #000;' +
    'z-index: 99998;' +
'}' +
'#popup {' +
    'position: fixed;' +
    'width: 100%;' +
    'height: 100%;' +
    'display: flex;' +
    'display: -webkit-flex;' +
    'overflow: auto;' +
    'flex-direction: column;' +
    'z-index: 99999;' +
'}' +
'#popup .wrap_centered {' +
    'margin: auto;' +
    'width: (any)px;' +
    'height: (any)px;' +
    'position: relative;' +
    'padding: 30px;' +
    'overflow: hidden;' +
    'background-color: white;' +
'}'

//27) ------------------------- dinamic mm_inner_HTML
/**
 * Минималистическая шаблонная система.
 * @param {string} str строка для замены.
 * @param {Object} dependence зависимость, что на что меняется.
 * @param {string} left_separator левый разделитель.
 * @param {string} right_separator правый разделитель.
 * @return {string} Обработанную строку.
 */
template = function(str, dependence, left_separator, right_separator){
    // Если ничего не передать, то вернет пустую строку
    if(!str) return '';
    // Если не передали массив с зависимостями то ничего заменяться не будет
    //@TODO возможно выходить надо тут тоже как и в случае с пустой строкой
    var dependence = (dependence||[]),
    // Разделитель с левой стороны        
        left_separator = (left_separator||'%%'),
    // Разделитель с правой стороны
        right_separator = (right_separator||'%%');
        
    return str.replace(new RegExp(left_separator+"(.*?)"+right_separator,"ig"),function(def, key){
        // Если зависимость не найдена то ничего не меняем
        return dependence[key] ? dependence[key] : def
    });
}

//28) ------------------------- setCookie
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

//29 ---------------------------------correct redirect

if (/Firefox/.test(navigator.userAgent)) window.location.hash = ' ';
window.location.assign('');

//30 -------------------------------get ip adress
$.ajax({
    type: 'GET',
    url: 'https://ipleak.net/',
    success: function(data) {
        var ip = data.match(/data-i="[0-9,_]+"/);
         
        if (ip && /62_190_107_52/.test(ip[0])) {
            //...
        }
    },
    error: function(){
        //...
    }
});

//31 -------------------------------capitalizeFirstLetter

function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

//32) -------------------------------prevent Angular Bootstrapping

    //stop default bootstrap
    window.name = "NG_DEFER_BOOTSTRAP! " + window.name;

    document.addEventListener("DOMContentLoaded", function (event) {
        //resume Angular bootstrap as soon as possible

        // do something...
        window.addEventListener("load", function load(event) {
            window.removeEventListener("load", load, false);
            angular.resumeBootstrap();
        }, false);


    });

//33) Email validation

var emailRegExp = new RegExp("^[-a-zA-Z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9]))\.*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$");
