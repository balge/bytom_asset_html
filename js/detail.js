$(function(){
	var T = {
		init: function(){
			var self = this;
			self.userName = self.getCookie('username');
			self.loginStatus();
			self.handleLandR();
			self.tabSwitch();
			self.logout();
		},
		loginStatus: function() {
			var self = this;
			if (self.userName) {
				var loginStatus = true;
			} else {
				var loginStatus = false;
			}
			var barHtml = template($('#statusTpl').html(), {
				loginStatus: loginStatus, //已经登录
				username: self.userName
			});
			$('.header-right').html(barHtml);
		},
		handleLandR: function(){
			var self = this;
			$('.login').on('click', function(event) {
				event.preventDefault();
				window.location.href = 'login.html?redirect_uri=' + encodeURIComponent(window.location.href);
			});
			$('.register').on('click', function(event) {
				event.preventDefault();
				window.location.href = 'register.html?redirect_uri=' + encodeURIComponent(window.location.href);
			});
		},
		tabSwitch: function(){
			var self = this;
			$('.dpart-tabs li').on('click', function(event) {
				event.preventDefault();
				$(this).addClass('active').siblings('li').removeClass('active');
				$('.tab-pannel').hide();
				$('.tab-pannel').eq($(this).index()).show();
			});
		},
		logout: function() {
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
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + "; " + expires;
		},
		getCookie: function(cname) {
			var self = this;
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1);
				if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
			}
			return "";
		},
		getItem: function(key) {
			var self = this;
			var value = localStorage.getItem(key);
			if (value) {
				return value;
			} else {
				return ""
			}
		},
		setItem: function(key, value) {
			var self = this;
			localStorage.setItem(key, value);
		}
	};
	T.init();
})