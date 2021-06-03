let util = {
	closest: (el, selector) => {
		var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
		while (el) {
			if (matchesSelector.call(el, selector)) {
				break;
			}
			el = el.parentElement;
		}
		return el;
	},
	hasClass: (elements, cName) => {
		return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
	},
	addClass: function(elements, cName) {
		if (!this.hasClass(elements, cName)) {
			elements.className += " " + cName;
		};
	},
	removeClass: function(elements, cName) {
		if (this.hasClass(elements, cName)) {
			elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
		};
	},
	sort: function(arr, key) {
		arr.sort((a, b) => {
			let aSort = this.isNum(a[key]) ? parseInt(a[key]) : 999;
			let bSort = this.isNum(b[key]) ? parseInt(b[key]) : 999;
			return aSort - bSort;
		});
		arr.forEach((item, index) => {
			if (item.children && item.children.length > 0) {
				this.sort(item.children, 'sort');
			}
		});
	},
	isNum(n) {
		if (n == undefined || n == null || n == '') {
			return false
		} else if (typeof(parseInt(n)) == 'number') {
			return true
		}
	},
	getType: (obj) => {
		//tostring会返回对应不同的标签的构造函数
		var toString = Object.prototype.toString;
		var map = {
			'[object Boolean]': 'boolean',
			'[object Number]': 'number',
			'[object String]': 'string',
			'[object Function]': 'function',
			'[object Array]': 'array',
			'[object Date]': 'date',
			'[object RegExp]': 'regExp',
			'[object Undefined]': 'undefined',
			'[object Null]': 'null',
			'[object Object]': 'object'
		};
		// if (obj instanceof Element) {
		// 	return 'element';
		// }
		return map[toString.call(obj)];
	},
	deepClone: function(data) {
		var type = this.getType(data);
		var obj;
		if (type === 'array') {
			obj = [];
		} else if (type === 'object') {
			obj = {};
		} else {
			//不再具有下一层次
			return data;
		}
		if (type === 'array') {
			for (let item of data) {
				obj.push(item);
			}
		} else if (type === 'object') {
			for (var key in data) {
				obj[key] = this.deepClone(data[key]);
			}
		}
		return obj;
	},
	isObjFunc: function(name) {
		let toString = Object.prototype.toString;
		return (...args) => toString.call(args[0]) === '[object ' + name + ']';
	},
	extend: function(...args) {
		let isObject = this.isObjFunc('Object'),
			isArray = this.isObjFunc('Array'),
			isBoolean = this.isObjFunc('Boolean');
		let index = 0,
			isDeep = false,
			obj,
			copy,
			destination,
			source,
			i;
		if (isBoolean(args[0])) {
			index = 1;
			isDeep = args[0];
		}
		for (i = args.length - 1; i > index; i--) {
			destination = args[i - 1];
			source = args[i];
			if (isObject(source) || isArray(source)) {
				for (var property in source) {
					obj = source[property];
					if (isDeep && (isObject(obj) || isArray(obj))) {
						if (property != 'component') {
							copy = isObject(obj) ? {} : [];
							let extended = this.extend(isDeep, copy, obj);
							destination[property] = extended;
						};
					} else {
						destination[property] = source[property];
					}
				}
			} else {
				destination = source;
			}
		}
		return destination;
	},
	getCode(appid) {
		let hashs = this.getUrlVars();
		let newHashs = [];
		for (let vars of hashs) {
			if (vars != 'code' && vars != 'state') {
				newHashs.push(`${vars}=${hashs[vars]}`);
			}
		};
		let path = `${window.location.origin}${window.location.pathname}${newHashs.length>0?'?':''}${newHashs.join('&')}`;
		let href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(path)}&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect`;
		window.location.href = href;
	},
	browser() {
		var u = navigator.userAgent;
		//	alert(navigator.userAgent);
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			petbnb: u.indexOf('Petbnb') > -1, //人人养宠App打开
			weixin: u.indexOf('MicroMessenger') > -1, //微信
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			wp: u.indexOf('Windows Phone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			Miui: u.indexOf('MiuiBrowser') > -1, //是否移动MIUI浏览器
			UC: u.indexOf('UCBrowser') > -1, //是否移动UC浏览器
			Chrome: u.indexOf('Chrome') > -1, //是否移动Chrome浏览器
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			safari: u.indexOf('Safari') > -1 && u.indexOf("Chrome") < 1 //是否safari浏览器
		};
	},
	getUrlVars() {
		var vars = [],
			hash,
			hasVar = window.location.href.indexOf('?');
		var hashes = window.location.href.slice(hasVar + 1).split('&');
		if (hasVar > -1) {
			for (let item of hashes) {
				hash = item.split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1].replace(/\//g, '').replace(/#/g, '');
			};
			return vars;
		} else {
			return [];
		}
	}
};
export default util;
