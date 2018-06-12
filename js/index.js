$(function() {
	var T = {
		init: function() {
			var self = this;
			self.userName = self.getCookie('username');
			self.exchangeItems = [];
			var localItems = self.getItem('exchangeItems');
			if(localItems){
				self.exchangeItems = self.exchangeItems.concat(JSON.parse(localItems));
			}
			self.pageSize = 10;
			self.loginStatus();
			self.renderAsset();
			self.buyAsset();
			self.exchangeAsset();
			self.watchDesc();
			self.logout();
		},
		loginStatus: function() {
			var self = this;
			if (self.userName) {
				var loginStatus = true;
			} else {
				var loginStatus = false;
				window.location.href = 'login.html?redirect_uri=' + encodeURIComponent(window.location.href);
				return false;
			}
			var navBarHtml = template($('#navTpl').html(), {
				loginStatus: loginStatus //已经登录
			});
			$('.navbar-collapse').html(navBarHtml);

			var welcomeHtml = template($('#welTpl').html(), {
				loginStatus: loginStatus, //已经登录
				username: self.userName
			});
			$('.welcome-txt').html(welcomeHtml);
		},
		renderAsset: function(pageNum, isReRender) {
			var self = this;
			//ajax请求可购买资产返回data
			$.ajax({
				url: window.url + '/api/assets',
				type: 'GET',
				dataType: 'json',
				data: {
					// pageNum: pageNum || 1,
					// pageSize: self.pageSize
				},
				success: function(res) {
					// console.log(JSON.parse(res.data))
					if (res.code == 200 && res.data && JSON.parse(res.data).length > 0) {
						var assetHtml = template($('#assetTpl').html(), {
							items: JSON.parse(res.data)
						});
						$('.asset-table').html(assetHtml);
						//    if(!isReRender || isReRender != true){
						// 	self.paginator(res.data.length,1);
						// }
					} else {
						$('.asset-table').html('<h4>暂时无可购买资产～～</h4>')
					}
				},
				error: function() {
					$('.asset-table').html('<h4>暂时无可购买资产～～</h4>')
				}
			})
		},
		buyAsset: function() {
			var self = this;
			var index = 0;
			$('body').on('click', '.btn-buyAsset', function(event) {
				event.preventDefault();
				index = $(this).parents('tr.item').attr('data-index');
				var modalHtml = template($('#buyModalTpl').html(), {
		        	type: 'buy'
		    	});
				$('.buyModal').html(modalHtml);
				$('#buyModal').modal();
			});
			$('body').on('click', '.btn-sureBuy', function(event) {
				event.preventDefault();
				$('.dialog-box').removeClass('show'); //立即清除弹窗
				$('.alert.alert-dismissible').alert('close'); //立即清除弹窗
				var params = {
					"assets_id": $('tr.item').eq(index).find('.owner').attr('data-data'),
					"assets_name": $('tr.item').eq(index).find('.name').attr('data-data'),
					"assets_num": 1,
					"id": $('tr.item').eq(index).attr('data-itemid'),
					"email": self.getCookie('email')
				}
				$.ajax({
					url: window.url + '/api/assets_purchase',
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(params),
					// crossDomain: true,
					// xhrFields: {
					// 	withCredentials: true
					// },
					success: function(res) {
						// console.log(res)
						if (res.code == 200) {
							self.renderAsset();
							self.alertDialog('购买成功', 'success');
						} else {
							self.alertDialog(res.msg, 'danger');
						}
					},
					error: function() {
						//失败情况处理
						self.alertDialog('购买失败', 'danger');
					}
				});
				$('#buyModal').modal('hide');
				$('#buyModal').on('hidden.bs.modal', function() {
					$('.buyModal').html('');
				})
			});
		},
		//本地mock
		exchangeAsset: function() {
			var self = this;
			var index = 0;
			$('body').on('click', '.btn-exchangeAsset', function(event) {
				event.preventDefault();
				index = $(this).parents('tr.item').attr('data-index');
				var modalHtml = template($('#buyModalTpl').html(), {
		        	type: 'exchange'
		    	});
				$('.buyModal').html(modalHtml);
				$('#buyModal').modal();
			});
			$('body').on('click', '.btn-sureExchange', function(event) {
				event.preventDefault();
				var params = {
					"assets_id": $('tr.item').eq(index).find('.owner').attr('data-data'),
					"assets_name": $('tr.item').eq(index).find('.name').attr('data-data'),
					"assets_price": $('tr.item').eq(index).find('.price').attr('data-data'),
					"assets_desc": $('tr.item').eq(index).find('.btn-watchDesc').attr('data-desc'),
					"id": $('tr.item').eq(index).attr('data-itemid'),
					"email": self.getCookie('email')
				};
				var res = {
					code: 200,
					msg: ''
				};
				if (res.code == 200) {
					self.alertDialog('兑换申请提交', 'success');
				} else {
					self.alertDialog(res.msg, 'danger');
				}
				$('#buyModal').modal('hide');
				$('#buyModal').on('hidden.bs.modal', function() {
					$('.buyModal').html('');
				})
				var value = {
					"assets_id": params.assets_id,
					"id": params.id,
			    	"name": params.assets_name,
			    	"price": params.assets_price,
			    	"desc": params.assets_desc,
			    	"email": self.getCookie('email')
			    };
			    if(!JSON.stringify(self.exchangeItems).includes(JSON.stringify(value))){
			    	self.exchangeItems.push(value);
			    	self.setItem('exchangeItems', JSON.stringify(self.exchangeItems));
			    }
			});

		},

		watchDesc: function() {
			var self = this;
			$('body').on('click', '.btn-watchDesc', function(event) {
				event.preventDefault();
				var desc = $(this).attr('data-desc');
				$('#descModal .modal-body').html(desc);
			});
		},

		alertDialog: function(text, type) {
			var self = this;
			var alertHtml = template($('#alertTpl').html(), {
				text: text,
				type: type
			});
			$('.dialog-box').html(alertHtml).addClass('show');
			$('.alert.alert-dismissible').alert();
			setTimeout(function() {
				$('.dialog-box').removeClass('show');
			}, 2000);
			setTimeout(function() {
				$('.alert.alert-dismissible').alert('close');
			}, 2300);
		},

		paginator: function(total, current) {
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
				onPageChange: function(n) {
					self.renderAsset(n, true); //重新渲染，true避免pagation重新渲染
				}
			});
		},
		logout: function() {
			var self = this;
			$('.logout').on('click', function(event) {
				event.preventDefault();
				self.setCookie('username', '', -1);
				self.setCookie('email', '', -1);
				self.setItem('items', JSON.stringify(new Array()));
				self.setItem('exchangeItems', JSON.stringify(new Array()));
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