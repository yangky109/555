

// ************此文件是各种封装函数*******************
// ************直接引入调用函数即可*******************

// 封装一个对象
// 实现DOM 2级事件的添加和删除
// 传三个参数
// 1. 执行事件的元素
// 2. 执行事件的方法   不要加‘on’
// 3. 执行事件的函数名称
eventObj = {
	add:function(ele,type,handler){
        //如果支持addEventListener情况下
        if(ele.addEventListener){
           ele.addEventListener(type,handler,false);
        }else if(ele.attachEvent){
        	//如果支持ele.attachEvent情况下
            ele.attachEvent('on'+type,handler);
        }else{
        	//低版本IE
        	ele['on'+type] = handler;
        }
	},
	remove:function(ele,type,handler){
        //如果支持removeEventListener情况下
        if(ele.removeEventListener){
           ele.removeEventListener(type,handler);
        }else if(ele.detachEvent){
        	//如果支持ele.attachEvent情况下
            ele.detachEvent('on'+type,handler);
        }else{
        	//低版本IE
        	ele['on'+type] = null;
        }
	}
}

// function aaa() {
// 		alert(777777777);
// 	}

// 	eventObj.add(box,'click',aaa);

// eventObj.remove(box,'click',aaa);


// ************************分界线********************

// 封装一个方法
// 判断鼠标滚轮上下移动的方向
// 传俩个参数
// 1. 执行滚轮事件的元素
// 2. 执行事件的函数名称
function mouseWheelFun(ele,fun){

	// 滚轮事件需要兼容火狐浏览器和其他浏览器
	// 判断是否是火狐浏览器
	var ff = navigator.userAgent.indexOf('Firefox');

	if(ff != -1){
		// 不等于-1的时候  是火狐浏览器
		ele.addEventListener('DOMMouseScroll',wheelFun,false);
	}else{
		// 等于-1的时候   其他浏览器
		ele.onmousewheel = wheelFun;
	}

	// 滚轮滚动调用的函数
	// 判断向上向下滚动必须在滚动调用的函数中判断，用来判断的属性是
	// event对象下的属性
	function wheelFun(event){
		// event兼容
		var event = event || window.event;
		// 在火狐中判断使用event.detail属性
		// 其他浏览器中使用event.wheelDelta属性

		// 清除默认样式
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = true;
		}
		
		if(event.detail < 0 || event.wheelDelta > 0){
			// 向上滚动
			fun('up');
		}else{
			// 向下滚动
			fun('down');
		}
	}
}

	// 滚动事件调用的函数
	// function Wangdong(der){
	// 	if(der == 'down'){
	// 		// 向下滚动
	// 		console.log('down');
	// 	}else{
	// 		// 向上滚动
	// 		console.log('up');
	// 	}
	// }
	// mouseWheelFun(document,Wangdong);


// *******************分界线*****************************

 // 封装获取cookie函数
	  function getCookie(key){
	  	// 获取所有cookie
	  	var myCookie = document.cookie;
	  	// 使用'; ' 隔开  解析成数组
	  	var cookieArray = myCookie.split('; ');
	  	// for 循环遍历数组
	  	for (var i = 0; i < cookieArray.length; i++) {
	  		// 数组中的每一项都'key=value'形式的字符串
	  		// 在使用'='把每组字符串分割成数组
	  		var newArray = cookieArray[i].split('=');
	  		// 判断每一个数组的第一项，如果是，就把他的第二项取出来
	  		// 第二项就是我们要拿的value
	  		if(newArray[0] == key){
	  			return newArray[1];
	  		}
	  	}
	  }

	  // 设置cookie的函数
	  function setCookie(key,value,day){
	  	// 判断用户是否设置了过期时间
	  	if (day) {
	  		// 设置过期时间

	  		// 获取当前的时间对象
	  		var date = new Date();
	  		// 获取当前的时间
	  		var r = date.getDate();
	  		// 设置时间为过期时间
	  		date.setDate(r + day);

	  		document.cookie = key+'='+value+';expires='+date;
	  	} else {
	  		// 没有设置过期时间
	  		document.cookie = key+'='+value;
	  	}
	  }

	  // 删除cookie 函数
	  function delCookie(argument) {
	  	setCookie(key,'',-1);
	  }
// *********************分界线****************************

// 碰撞检测的方法

// 圆形碰撞检测
// 两个参数 直接传需要碰撞检测的两个元素
// 因为是园  半径都一样
function crashFun(x,y){
    var a = (x.offsetLeft+x.offsetWidth/2)-(y.offsetLeft+y.offsetWidth/2);
	var b = (x.offsetTop+x.offsetWidth/2)-(y.offsetTop+y.offsetWidth/2);
	var c = x.offsetWidth/2+y.offsetWidth/2;
	// 检测碰撞  圆心距 勾股定理
	if (a * a + b * b <= c * c) {
		// 撞上了
		return true;
	}else{
		// 没有撞上
		return false;
	}
}

// 矩形碰撞检测
// 两个参数 直接传需要碰撞检测的两个元素
function rectangleFun(x,y) {
	// x元素的四个边
	var xLeft = x.offsetLeft;
	var xRight = x.offsetWidth + xLeft;
	var xTop = x.offsetTop;
	var xBottom = x.offsetHeight + xTop;
	// y元素的四个边
	var yLeft = y.offsetLeft;
	var yRight = y.offsetWidth + yLeft;
	var yTop = y.offsetTop;
	var yBottom = y.offsetHeight + yTop;
	// 碰撞检测
	if (xRight>yLeft && xLeft<yRight && xBottom>yTop && xTop<yBottom) {
		// 撞上了
		return true;
	}else{
		// 没撞上
		return false;
	}
}
// ***************************分界线*********************

// 封装成一个函数  返回获取元素的样式
    // 1.元素 2.要获取的样式(填字符串)
    function getStyle(obj,style) {
    	var res = '';
	    if (obj.currentStyle) {
	    	// IE下
	    	res = obj.currentStyle[style];
	    }else{
	    	// 非IE下
	    	res = getComputedStyle(obj,null)[style];
	    }
	    return res;
    }

    // console.log(getStyle(box,'width'));
    // console.log(getStyle(box,'backgroundColor'));

// ***************************分界线*********************























