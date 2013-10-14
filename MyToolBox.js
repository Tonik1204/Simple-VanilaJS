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
            var newArr =[].concat(arr); // копирование массива
            for (var i = 0; i < newArr.length; i++) {
                while (newArr.indexOf(newArr[i], i + 1) !== -1) {
                    newArr.splice(newArr.indexOf(newArr[i], i + 1), 1);
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
