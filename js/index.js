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
			if(self.userName){
				var loginStatus = true;
			}else{
				var loginStatus = false;	
			}
			var navBarHtml = template($('#navTpl').html(), {
		        loginStatus: loginStatus//已经登录
		    });
		    $('.navbar-collapse').html(navBarHtml);

			var welcomeHtml = template($('#welTpl').html(), {
		        loginStatus: loginStatus,//已经登录
		        username: self.userName
		    });
		    $('.welcome-txt').html(welcomeHtml);
		},
		renderAsset: function(pageNum,isReRender){
			var self = this;
			//ajax请求可购买资产返回data
			$.ajax({
				url: 'http://192.168.199.62:5000/api/assets',
				type: 'GET',
				dataType: 'json',
				data: {
					pageNum: pageNum || 1,
					pageSize: self.pageSize
				},
				success: function(res){
					if(res.code == 200 && res.data && res.data.length > 0){
						var assetHtml = template($('#assetTpl').html(), {
							items: data.data
					    });
					    $('.asset-table').html(assetHtml);
					    if(!isReRender || isReRender != true){
							self.paginator(data.data.length,1);
						}
					}
				},
				error: function(){

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
		logout: function(){
			var self = this;
			$('.logout').on('click', function(event) {
				event.preventDefault();
				self.setCookie('username', '', -1);
				self.setCookie('email', '', -1);
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
		}
	};
	T.init();
	})