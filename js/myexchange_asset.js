$(function(){
	var T = {
		init: function(){
			var self = this;
			self.userName = self.getCookie('username');
			self.exchangeItems = [];
			var localItems = self.getItem('exchangeItems');
			if(localItems){
				self.exchangeItems = self.exchangeItems.concat(JSON.parse(localItems));
			}
			self.handleRender();
			self.pageSize =10;
			self.loginStatus();
			self.logout();
		},
		loginStatus: function(){
			var self = this;
			//ajax请求登录返回loginStatus,保存cookie
			// self.setCookie('username', 'wuchengba', 1);//模拟登录
			if(self.userName){
				var loginStatus = true;
			}else{
				var loginStatus = false;
				window.location.href = 'login.html?redirect_uri=' + encodeURIComponent(window.location.href);
				return false;
			}
			var navBarHtml = template($('#navTpl').html(), {
		        loginStatus: loginStatus//已经登录
		    });
		    $('.navbar-collapse').html(navBarHtml);
		},
		handleRender: function(){
			var self = this;
			var assetHtml = template($('#assetTpl').html(), {
	        	items: self.exchangeItems
		    });
		    $('.asset-exchange .table').html(assetHtml);
		},
		logout: function(){
			var self = this;
			$('.logout').on('click', function(event) {
				event.preventDefault();
				self.setCookie('username', '', -1);
				self.setCookie('email', '', -1);
				self.setItem('items', JSON.stringify(new Array()));
				window.location.href = 'login.html?redirect_uri=' + encodeURIComponent(window.location.href);
			});
		},
		setCookie: function(cname, cvalue, exdays) {
			var self = this;
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+d.toUTCString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		},
		getCookie: function(cname) {
			var self = this;
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1);
		        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		    }
		    return "";
		},
		getItem: function (key) {
			var self = this;
			var value = localStorage.getItem(key);
			if (value) {
				return value;
			}else{
				return ""
			}
		},
		setItem: function (key, value) {
			var self = this;
			localStorage.setItem(key, value);
		}
	};
	T.init();
})