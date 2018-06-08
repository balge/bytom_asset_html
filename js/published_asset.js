$(function(){
	var T = {
		init: function(){
			var self = this;
			self.userName = self.getCookie('username');
			self.pageSize =10;
			self.loginStatus();
			self.renderAsset();
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
		renderAsset: function(pageNum,isReRender){
			var self = this;
			$.ajax({
				url: window.url + '/api/get_define_assets',
				type: 'GET',
				dataType: 'json',
				data: {
					email: self.getCookie('email'),
					status: 3
				},
				success: function(res){
					console.log(JSON.parse(res.data))
					if(res.code == 200 && res.data && JSON.parse(res.data).length > 0){
						var assetHtml = template($('#assetTpl').html(), {
							items: JSON.parse(res.data)
					    });
					    $('.asset-table').html(assetHtml);
					    self.watchDesc();
					}else{
						$('.asset-table').html('<h4>暂时无发布的资产～～</h4>')
					}
				},
				error: function(){
					$('.asset-table').html('<h4>暂时无发布的资产～～</h4>')
				}
			})
		},
		paginator: function(total,current){
			var self = this;
			$(".pagination-wrap .pagination").jqPaginator({
	            totalPages: total,
	            visiblePages: self.pageSize,
	            currentPage: current,
	            first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
	            prev: '<li class="prev"><a href="javascript:void(0);">前一页<\/a><\/li>',
	            next: '<li class="next"><a href="javascript:void(0);">下一页<\/a><\/li>',
	            last: '<li class="last"><a href="javascript:void(0);">尾页<\/a><\/li>',
	            page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
	            onPageChange: function (n) {
	            	self.renderAsset(n, true);//重新渲染，true避免pagation重新渲染
	            }
	        });
		},
		watchDesc: function(){
			var self = this;
			$('.btn-watchDesc').on('click', function(event) {
				event.preventDefault();
				var desc = $(this).attr('data-desc');
				$('#descModal .modal-body').html(desc);
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
