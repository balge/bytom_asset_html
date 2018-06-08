$(function(){
	var T = {
		init: function(){
			var self = this;
			self.userName = self.getCookie('username');
			self.pageSize =10;
			self.loginStatus();
			// self.renderAsset();
			self.renderSurveyBlock();
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
		// renderAsset: function(pageNum,isReRender){
		// 	var self = this;
		// 	//ajax请求可购买资产返回data
		// 	// $.ajax({
		// 	// 	url: window.url + '/api/personal_assets',
		// 	// 	type: 'GET',
		// 	// 	dataType: 'json',
		// 	// 	data: {
		// 	// 		pageNum: pageNum || 1,
		// 	// 		pageSize: self.pageSize,
		// 	// 		email: 
		// 	// 	}
		// 	// 	success: function(){

		// 	// 	},
		// 	// 	error: function(){

		// 	// 	}
		// 	// })
		// 	var data = {
		// 		"code": 200,
		// 		"msg": '请求成功',
		// 		"pageNum": 1,
		// 		"pageSize": 10,
		// 		data: [{
		// 			"name": "btm",
		// 			"owner": "bytom",
		// 			"time": "2018/06/03",
		// 			"price": 1000,
		// 			"detailUrl": "http://www.baidu.com",//详情地址
		// 			"orderUrl": "http://www.google.com",//购买地址
		// 			"id": 100//产品id
		// 		},{
		// 			"name": "btm2",
		// 			"owner": "bytom",
		// 			"time": "2018/06/03",
		// 			"price": 1000,
		// 			"detailUrl": "http://www.baidu.com",//详情地址
		// 			"orderUrl": "http://www.google.com",//购买地址
		// 			"id": 100//产品id
		// 		},{
		// 			"name": "btm3",
		// 			"owner": "bytom",
		// 			"time": "2018/06/03",
		// 			"price": 1000,
		// 			"detailUrl": "http://www.baidu.com",//详情地址
		// 			"orderUrl": "http://www.google.com",//购买地址
		// 			"id": 100//产品id
		// 		},{
		// 			"name": "btm4",
		// 			"owner": "bytom",
		// 			"time": "2018/06/03",
		// 			"price": 1000,
		// 			"detailUrl": "http://www.baidu.com",//详情地址
		// 			"orderUrl": "http://www.google.com",//购买地址
		// 			"id": 100//产品id
		// 		},{
		// 			"name": "btm5",
		// 			"owner": "bytom",
		// 			"time": "2018/06/03",
		// 			"price": 1000,
		// 			"detailUrl": "http://www.baidu.com",//详情地址
		// 			"orderUrl": "http://www.google.com",//购买地址
		// 			"id": 100//产品id
		// 		}]
		// 	};

		// 	var assetHtml = template($('#assetTpl').html(), {
		// 		items: data.data
		//     });
		//     $('.asset-table').html(assetHtml);
		//     if(!isReRender || isReRender != true){
		// 		self.paginator(data.data.length,1);
		// 	}
		// },
		renderSurveyBlock: function(){
			var self = this;
			//ajax请求可购买资产返回data
			$.ajax({
				url: window.url + '/api/asset_overview',
				type: 'GET',
				dataType: 'json',
				data: {
					email: self.getCookie('email')
				},
				success: function(res){
					if(res.code == 200 && res.data) {
						var data = JSON.parse(res.data);
						var surveyHtml = template($('#surveyTpl').html(), {
							items: data
					    });
					    $('.survey-list').html(surveyHtml);
					}else{
						$('.survey-list').html('<h4>数据异常，请稍后再试～～</h4>')
					}
				},
				error: function(){
					$('.survey-list').html('<h4>数据异常，请稍后再试～～</h4>');
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